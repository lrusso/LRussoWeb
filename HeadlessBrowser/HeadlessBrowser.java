import org.htmlunit.*;
import org.htmlunit.html.*;
import org.htmlunit.javascript.SilentJavaScriptErrorListener;
import java.nio.file.Paths;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;

public class HeadlessBrowser {
    public static void main(String[] args) {
        if (args.length < 3) {
            System.err.println("Usage: java -jar headless-browser.jar <language> <userAgent> <URL | file path | HTML string> [optionalQuerySelector1,optionalQuerySelector2,...]");
            System.exit(1);
        }

        String userLanguage = args[0];
        String userAgent = args[1];
        String input = args[2];
        String[] optionalSelectors = (args.length >= 4) ? args[3].split(",") : new String[0];

        Logger.getLogger("org.htmlunit").setLevel(Level.OFF);
        Logger.getLogger("com.gargoylesoftware.htmlunit").setLevel(Level.OFF);
        Logger.getLogger("net.sourceforge.htmlunit").setLevel(Level.OFF);
        Logger.getLogger("").setLevel(Level.OFF);

        // Create a custom BrowserVersion with the user-specified User-Agent
        BrowserVersion customBrowser = new BrowserVersion.BrowserVersionBuilder(BrowserVersion.CHROME)
                .setUserAgent(userAgent)
                .build();

        try (final WebClient webClient = new WebClient(customBrowser)) {
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setJavaScriptEnabled(true);
            webClient.getOptions().setThrowExceptionOnScriptError(false);
            webClient.getOptions().setRedirectEnabled(true);
            webClient.getOptions().setTimeout(15000);
            webClient.setJavaScriptErrorListener(new SilentJavaScriptErrorListener());

            // Also silence HtmlUnit's "console.log" outputs from inside the page
            webClient.getOptions().setPrintContentOnFailingStatusCode(false);
            webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);

            // Set language header
            webClient.addRequestHeader("Accept-Language", userLanguage);

            // Inject a script BEFORE any page scripts execute
            webClient.setScriptPreProcessor((page, scriptSource, scriptName, lineNumber, htmlElement) -> {
                String overrideScript =
                    "try{"+
                    "Object.defineProperty(window.navigator, 'language', {get: function(){return '" + userLanguage + "';}});" +
                    "Object.defineProperty(window.navigator, 'languages', {get: function(){return ['" + userLanguage + "'];}});" +
                    "}catch(e){}";
                return overrideScript + "\n" + scriptSource;
            });

            HtmlPage page;

            if (input.startsWith("http://") || input.startsWith("https://")) {
                // Case 1: Remote URL
                page = webClient.getPage(input);
            } else {
                // Case 2: Local file
                URL fileUrl = Paths.get(input).toUri().toURL();
                page = webClient.getPage(fileUrl);
            }

            HtmlElement lastElement = null;

            // Execute each optional selector sequentially with a 5-second delay
            for (String selector : optionalSelectors) {
                String trimmed = selector.trim();
                if (trimmed.isEmpty()) continue;

                if (trimmed.startsWith("type:")) {
                    // Typing into the last found element
                    if (lastElement != null && lastElement instanceof HtmlInput) {
                        String textToType = trimmed.substring("type:".length()).trim();
                        ((HtmlInput) lastElement).setValueAttribute(textToType);
                    } else if (lastElement != null && lastElement instanceof HtmlTextArea) {
                        String textToType = trimmed.substring("type:".length()).trim();
                        ((HtmlTextArea) lastElement).setText(textToType);
                    }
                } else {
                    // Normal selector: find and click
                    DomElement element = page.querySelector(trimmed);
                    if (element != null) {
                        lastElement = (HtmlElement) element;
                        page = lastElement.click();
                        webClient.waitForBackgroundJavaScriptStartingBefore(15000);
                        try {
                            Thread.sleep(5000); // 5 seconds delay between selectors
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                        }
                    }
                }
            }

            // Extract HTML and visible text
            String html = page.asXml();
            String innerText = page.getBody().asNormalizedText();

            // Escape special characters for valid JSON string values
            html = html.replace("\\", "\\\\")
                       .replace("\"", "\\\"")
                       .replace("\n", "\\n")
                       .replace("\r", "");

            innerText = innerText.replace("\\", "\\\\")
                                 .replace("\"", "\\\"")
                                 .replace("\n", "\\n")
                                 .replace("\r", "");

            // Build JSON as a single string
            String jsonResult = "{"
                    + "\"html\":\"" + html + "\","
                    + "\"text\":\"" + innerText + "\""
                    + "}";

            System.out.println(jsonResult);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            System.exit(1);
        }
    }
}
