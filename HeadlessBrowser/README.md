# Headless Browser

This project provides a **Headless Browser** implementation designed primarily in **Java**, with an accompanying wrapper or port for **Node.js** usage.

A headless browser operates without a graphical user interface (GUI). It's instrumental for tasks like **automated testing**, **server-side rendering**, and **web scraping**.

This tool's core functionality is to navigate to a specified web resource (URL or local file) and extract key information:

- The `html` source code of the page.
- The `text` (the visible, rendered text content) of the page or a specific element.

---

## **Arguments**

| Argument                     | Description                                                                                                                                                              | Example Value                                            |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **`<locale>`**               | The preferred language for the request.                                                                                                                                  | `en-US`                                                  |
| **`<user_agent>`**           | The User-Agent string.                                                                                                                                                   | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0` |
| **`<url_or_file>`**          | A URL or a local file path.                                                                                                                                              | `https://www.example.com`                                |
| **`<selectors_or_actions>`** | **(Optional)** An array of CSS selectors and action instructions to interact with elements on the page, such as clicking specific elements or performing typing actions. | `["#textbox1", "type:hello world"]`                      |

### Using Java:

```
java -jar HeadlessBrowser.jar "en-US" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0" "test.html" "#container1,#container2,#textbox1,type:hello world"
```

### Using Node.js:

```
node HeadlessBrowser.js "en-US" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0" "test.html" '["#container1", "#container2", "#textbox1", "type:hello world"]'
```

## Building the JAR file:

The JAR file is already included in this repository, but if you like to build your own JAR, below are the instructions.

1. Install [Node.js](https://nodejs.org/en/download)
2. Install [Java Development Kit](https://www.oracle.com/java/technologies/downloads/)
3. Run `node build.js`
