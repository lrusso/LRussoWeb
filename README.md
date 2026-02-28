# LRusso.com Website

This project integrates several distinct features, each designed to highlight specific web development skills and provide practical solutions.

---

## Table of Contents

- [Features](#features)
  - [Lightweight Responsive Portfolio](#lightweight-responsive-portfolio)
  - [404 Error Redirection Workaround](#404-error-redirection-workaround)
  - [Automated Daily Bot (Cron Job)](#automated-daily-bot-cron-job)
  - [Intelligent Web Scraping Bot](#intelligent-web-scraping-bot)
  - [Intranet Virtual Desktop](#intranet-virtual-desktop)
  - [Media Player](#media-player)
  - [Llama](#llama)
  - [MP3 Converter](#mp3-converter)
  - [MP3 Tag Editor](#mp3-tag-editor)
  - [PDF Converter](#pdf-converter)
  - [ATS Resume Checker](#ats-resume-checker)
  - [Code Editor](#code-editor)
  - [WYSIWYG Editor](#wysiwyg-editor)
  - [Image Editor](#image-editor)
  - [JavaScript Minifier](#javascript-minifier)
  - [CSS Minifier](#css-minifier)
  - [Webcam Recorder](#webcam-recorder)
  - [WebZip](#webzip)
  - [Resources](#resources)
  - [Spider Solitaire Game](#spider-solitaire-game)
  - [Taipei Game](#taipei-game)
  - [Tarot Game](#tarot-game)
  - [Tetris Game](#tetris-game)
- [Usage](#usage)
  - [404 Error Redirections](#404-error-redirections)
  - [Automated Daily Bot](#automated-daily-bot)
  - [How to generate your BOT_SETTINGS variable?](#how-to-generate-your-bot_settings-variable)
  - [How to generate your GOOGLE_API_KEY secret?](#how-to-generate-your-google_api_key-secret)
  - [Intranet Virtual Desktop Settings](#intranet-virtual-desktop-settings)
- [License](#license)

---

## Features

### Lightweight Responsive Portfolio

The project features a lightweight and highly responsive web portfolio. Designed with performance and aesthetics in mind, it utilizes modern CSS and HTML practices to ensure fast loading times and a beautiful display on any device. This portfolio section serves as an excellent template for developers or creatives to present their projects and skills effectively.

### 404 Error Redirection Workaround

This project implements a clever workaround for 404 (Not Found) errors, ensuring a smoother user experience. Instead of simply displaying a generic error page, the system attempts to intelligently redirect users to relevant content or a well-designed custom error page, minimizing user frustration and improving navigation.

### Automated Daily Bot (Cron Job)

A powerful cron job is set up to automate a crucial task: running a dedicated bot every day at 11:00 AM UTC. This demonstrates the ability to schedule and execute server-side processes reliably, which is fundamental for many web applications requiring automated maintenance, data processing, or reporting.

### Intelligent Web Scraping Bot

At the heart of the automation is an advanced web scraping bot. This bot is engineered to be robust and versatile:

- **User-Agent Cycling:** It utilizes different User-Agents to mimic various browsers and devices, reducing the likelihood of being blocked by websites.
- **Content Verification:** The bot verifies the content of scraped pages, ensuring data integrity and relevance.
- **Date Checking:** It intelligently checks dates on content, allowing for the retrieval of fresh information or the tracking of changes over time.
- **Email Reporting:** Upon completion, the bot sends comprehensive reports via email, providing timely updates on its findings and any issues encountered. This is invaluable for monitoring dynamic web content.

### Intranet Virtual Desktop

It's a customizable web template designed to provide a virtual desktop experience directly in your browser. It offers a familiar desktop interface complete with shortcuts, a personalized screensaver, and an integrated calendar, making it an ideal solution for internal portals, personal dashboards, or interactive web applications.

### Media Player

A custom-built media player is integrated into the project. This player goes beyond basic video playback by offering full support for embedded or external subtitles (in SRT format) and also provides support for MP3 files. It provides a clean, user-friendly interface with standard playback controls, making it ideal for presenting video content with accessibility in mind.

### Llama

A cutting-edge, browser-based Llama Web App is integrated into the project, enabling users to run and interact with large language models locally without any server-side processing. This tool provides full support for GGUF models, allowing users to load their own AI models directly into the browser to ask questions, summarize text, or engage in natural dialogue.

### MP3 Converter

A high-performance MP3 Converter is integrated into the project, designed for fast and reliable audio extraction and transcoding. It allows users to convert various video and audio formats into high-quality MP3 files with customizable bitrate options to balance file size and sound fidelity. The converter features a streamlined, ensuring a stable and controlled conversion process. With its focus on speed and efficiency, it provides a seamless way to transform media files into a universal audio format compatible with any device.

### MP3 Tag Editor

A powerful MP3 Tag Editor is integrated into the project, allowing users to organize and manage their music library with precision. It enables the modification of essential metadata, including artist names, album titles, genres, and track numbers, ensuring that audio files are correctly indexed and searchable. The editor also features support for embedding custom album art and managing ID3 tags, providing a complete solution for maintaining a professional and well-structured media collection.

### PDF Converter

A high-performance PDF to JPG Converter is integrated into the project, providing a seamless way to transform static documents into high-quality image files. It allows users to extract individual pages or entire documents with clarity, ensuring that text, graphics, and layouts remain crisp and professional. The converter is optimized for speed and precision, making it an essential tool for creating social media assets, presentations, or web-ready previews from PDF sources.

### ATS Resume Checker

A dedicated ATS Resume Checker is also part of the project, designed to streamline your job application process. It supports both PDF and DOCX file types, offering a versatile solution for reviewing resumes. The checker is fully responsive, ensuring seamless functionality across desktop and mobile devices, so you can optimize your resume. With a straightforward interface, it provides instant, actionable feedback to help you tailor your resume for modern applicant tracking systems.

### Code Editor

A powerful, lightweight code editor is integrated into the project, offering a streamlined environment for writing and managing code directly within the application. It supports syntax highlighting for a wide array of popular programming languages. The editor includes essential features like auto-indentation and bracket matching to enhance the coding experience. With its clean interface, it's designed to be an accessible and efficient tool for quick edits, code review and even light development tasks.

### WYSIWYG Editor

A clean and minimalist WYSIWYG (What You See Is What You Get) text editor built entirely with HTML5. It enables users to format and style text effortlessly using a straightforward toolbar, offering common options such as bold, italic, underline, lists, links, and text alignment. Designed for simplicity and focus, the editor ensures that users can create and edit rich text content directly in the browser without distractions. Its responsive layout and intuitive interface make it suitable for writing notes, documentation, or any text-based content with ease.

### Image Editor

A versatile and intuitive image editor designed to handle essential photo and graphic adjustments directly within the browser. It allows users to crop, rotate, resize, merge, and convert images between multiple formats such as JPG, PNG, and WEBP. The editor provides a smooth and responsive interface for precise control over each operation, supporting both simple edits and more complex image compositions. Built for accessibility and performance, it enables quick transformations without the need for external software, making it ideal for everyday editing tasks, web content preparation, and creative projects alike.

### JavaScript Minifier

A powerful yet lightweight JavaScript minifier that optimizes code for production directly in the browser. It automatically removes unnecessary whitespace, comments, and redundant characters, while safely shortening variable and function names to reduce file size without altering behavior. Designed for modern workflows, it supports both inline snippets and full project files, making it easy to paste, edit, and compress code in one place. Ideal for improving load times and performance, the minifier helps developers deliver faster, more efficient web applications with minimal effort and no external dependencies.

### CSS Minifier

A fast and efficient CSS minifier that streamlines stylesheets for production directly in the browser. It automatically removes unnecessary whitespace, comments, and redundant code, while safely merging rules, shortening values, and optimizing shorthand properties to reduce file size without affecting visual appearance. Supporting both small snippets and full stylesheets, it provides an instant preview and easy copy-back workflow for integration into any project. Ideal for improving load times and overall performance, the minifier helps developers deliver lean, optimized styles with zero setup and no external build tools.

### Webcam Recorder

Provides a webcam recorder capable of capturing high-quality video and audio directly from a user's device. Built with cross-platform compatibility in mind, it supports recording in both 720p and 1080p resolutions, allowing users to select their preferred quality. It's a versatile tool for various applications, from simple video messages to more professional content creation, all within the browser.

### WebZip

A fast and secure tool for creating and extracting compressed archives directly in your browser. Easily select and bundle multiple files into organized zip folders for streamlined sharing. Quickly check or modify existing archives without the need for any external desktop software. All processing happens locally on your device, ensuring your data remains private and protected.

### Resources

A comprehensive Resources page is available, featuring a complete collection of all icons used throughout the website. Each icon can be previewed, searched, and downloaded in both SVG and PNG formats, ensuring maximum flexibility for designers and developers alike. The page is designed for ease of navigation, allowing quick access to specific icon sets or themes. Whether you need scalable vector assets for high-resolution displays or lightweight raster versions for web optimization, the Resources section provides everything neatly organized and ready to use.

### Spider Solitaire Game

For card game enthusiasts, a fully responsive Spider Solitaire game has been added. Designed to be played effortlessly on a desktop computer, a smartphone, or a tablet, it adapts its layout and controls to provide an intuitive experience across all screen sizes.

### Taipei Game

Another beloved classic, the Taipei (Mahjong Solitaire) game, is also part of this project. It's built with responsive design principles, ensuring an optimal and enjoyable experience on desktops, phones and tablets. The intuitive touch controls and adaptive layout make it a pleasure to play on any device.

### Tarot Game

Also for card game enthusiasts, a Tarot card game is part of this project, that was reimagined for the modern age. It provides an immersive experience on desktop and mobile devices. The layout adjusts to fit your screen, and the user interface is optimized for both mouse and touch controls, allowing you to easily draw and play cards no matter where you are.

### Tetris Game

In addition to these games, this project includes a fully functional Tetris game meticulously designed for cross-platform compatibility. Whether you're on a desktop computer, a smartphone, or a tablet, the game adapts seamlessly to your screen size and input method, offering an engaging and responsive gaming experience across all devices.

---

## Usage

### 404 Error Redirections

The `404.html` file acts as a client-side redirector. If someone tries to access a page on the site that no longer exists or if the web server is not case insensitive (a 404 error), this file checks if that address is in the list. If it is, the user gets sent to the correct page. If the address isn't in the list, the user is redirected to the homepage. Below you will find examples of how to use it.

```javascript
var redirects = {
  "/example1": "/Example1",
  "/example2": "https://www.otherdomain.com",
  "/example3": "https://www.otherdomain.com/Example3",
}
```

### Automated Daily Bot

This GitHub Actions workflow, located in the [cronjob.yml](https://github.com/lrusso/LRussoWeb/blob/main/.github/workflows/cronjob.yml) file, runs a Node.js script on schedule. It requires the [BOT_SETTINGS](#how-to-generate-your-bot_settings-variable) GitHub variable and uses an optional [GOOGLE_API_KEY](#how-to-generate-your-google_api_key-secret) GitHub secret. If the script finds a reportable event and `GOOGLE_API_KEY` is set, it sends an email. Besides that, the process will fail, triggering a GitHub notification.

### How to generate your BOT_SETTINGS variable?

`BOT_SETTINGS` it's a variable (an object) required by the bot and that you need to create in your repository settings. Here is an example of it:

```json
{
  "checks": {
    "urls": [
      { "https://www.example.com/products": "Out of Stock" },
      { "https://www.anothersite.org/news": ["Breaking News", "Urgent Update"] }
    ],
    "dates": [
      { "2025-12-25": "Christmas Day" },
      { "2026-01-01": "New Year's Day Celebration" }
    ],
    "domains": [
      { "2025-11-15": "mydomain.com" },
      { "2026-03-01": "anotherdomain.net" }
    ],
    "newspapers": [
      {
        "tech": [
          "https://www.nytimes.com/section/technology",
          "https://www.wsj.com/tech"
        ]
      },
      {
        "business": [
          "https://www.bloomberg.com/markets",
          "https://www.reuters.com/business"
        ]
      }
    ]
  },
  "userLanguage": "en-US,en;q=0.9,es;q=0.1",
  "emailSubjects": {
    "systemReport": "System report",
    "newspaperHeadlines": "Newspaper headlines"
  }
}
```

- **urls**: A list of URLs to check for the presence or absence of specific strings. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string representing the URL to check.
  - The value can be either:
    - A string: The system will report if this string is not found on the page.
    - An array of strings: The system will report if any of these strings are found on the page.

- **dates**: A list of dates associated with specific events. This can be used for reminders or to track upcoming events. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string in `YYYY-MM-DD` format representing the date.
  - The value is a string representing the name of the event.

- **domains**: A list of domains to be checked on specific dates. This could be for monitoring domain expiration, SSL certificate validity, or other date-sensitive domain-related tasks. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string in `YYYY-MM-DD` format representing the date.
  - The value is a string representing the domain name (e.g., example.com).

- **newspapers**: A configuration for getting the headlines from sections of newspapers. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string representing the name of the section (e.g., "TECH", "SPORTS").
  - The value is an array of strings, where each string is a URL to a specific newspaper section.

- **userLanguage**: Specifies the preferred user language(s) in a comma-separated format, similar to the Accept-Language HTTP header. It's a String. A string containing language tags and optional quality values (q-factor).

- **systemReport**: The localized string to be used as the subject in the email that is sent to the user when the bot detects something that must be reported. It's a String. Any string.

- **newspaperHeadlines**: The localized string to be used as the subject in the email that is sent to the user with the list of newspaper headlines. It's a String. Any string.

Once you create your `BOT_SETTINGS` object, you will need to:

- Go to your GitHub repository.
- Click on `Settings`.
- Click on `Secrets and variables`.
- Click on `Actions`.
- Click on `Variables`.
- Click on `New repository variable`.
- There you can create the `BOT_SETTINGS` variable with your `BOT_SETTINGS` object.

### How to generate your GOOGLE_API_KEY secret?

- Browse to https://script.google.com
- Click on `New project`.
- Paste the following code:

```javascript
function doPost(e) {
  const emailAddress = "YOUR_EMAIL_ADDRESS_HERE"
  const subject = e.parameter.subject
  const message = e.parameter.message

  try {
    // move to trash all emails that match the subject (optional)
    var searchQuery = 'subject:"' + subject + '"'
    var threads = GmailApp.search(searchQuery)
    if (threads.length > 0) {
      GmailApp.moveThreadsToTrash(threads)
    }

    // send the email
    MailApp.sendEmail({
      to: emailAddress,
      subject: subject,
      htmlBody: message,
    })
    return ContentService.createTextOutput(true)
  } catch (error) {
    return ContentService.createTextOutput(error.message)
  }
}
```

- Click on `Deploy`.
- Click on `New deployment`.
- Where it says `Select type`, select `Web app`.
- Where it says `Who has access`, select `Anyone`.
- Click on `Deploy`.
- If it's the first time you deploy the App:
  - Click on `Authorize Access`.
  - Select your Google Account.
  - Your App is not verified, so click on `Advanced`.
  - Click on `Go to <your_app_name>(unsafe)`.
  - Click on `Allow`.
- Finally, there you will get your `Deployment ID` that it will be your `GOOGLE_API_KEY`.
- Go to your GitHub repository.
- Click on `Settings`.
- Click on `Secrets and variables`.
- Click on `Actions`.
- Click on `New repository secret`.
- There you can create the `GOOGLE_API_KEY` variable with your `Deployment ID` value.

**Optional - To trash all emails that match the subject:**

- Add the following code to the top of the file: `GmailApp.search("test");`
- Save the project.
- Click the `Run` icon.
- Grant access permissions.
- **Note:** If you don't need this feature, you **MUST** remove lines 7 to 12 from the code above.

### Intranet Virtual Desktop Settings

To set up your Intranet virtual desktop, you'll primarily configure the `DESKTOP_FILES` array for desktop shortcuts and the Screensaver options for your screensaver.

The `DESKTOP_FILES` array allows you to define the shortcuts that appear on your virtual desktop. Each object within this array represents a single shortcut and has the following properties:

- `filename`: The text that appears below the icon on the desktop.

- `icon`: The path to the icon image.

- `content`: The content to display when the shortcut is clicked. This can be raw HTML, an **iframe** embedding another page, or any other valid HTML structure.

Example configuration:

```javascript
var DESKTOP_FILES = [
  {
    filename: "Spider", // Name displayed on desktop
    icon: "Spider.png", // Path to an image file for the icon
    content: "<iframe src='Spider.htm'></iframe>", // Embeds an external HTML page
  },
  {
    filename: "Taipei",
    icon: "Taipei.png",
    content: "<iframe src='Taipei.htm'></iframe>",
  },
  {
    filename: "Hello World",
    icon: "HelloWorld.png",
    content: "<div>Hello World</div>", // Simple HTML content displayed directly
  },
]
```

On the other hand, the screensaver component allows you to configure the behavior and appearance of your virtual desktop's screensaver. You instantiate it with an object containing the following properties:

- `secondsInactive`: The number of seconds of inactivity before the screensaver activates.

- `speed`: Controls the animation speed of the screensaver (e.g., 1 for normal speed).

- `logo`: The path to an image file to display as a logo on the screensaver.

- `disabledWhenUsingIframes`: A boolean value. If true, the screensaver will not activate when an **iframe** is actively being used.

Example configuration:

```javascript
createScreensaver({
  secondsInactive: 30, // Screensaver activates after 30 seconds of inactivity
  logo: "Logo.png", // Displays "Logo.png" on the screensaver
  disabledWhenUsingIframes: true, // Screensaver won't activate if an iframe is in use
})
```

---

## License

Distributed under the GPL-3.0 License. See `license.txt` for more information.
