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
  - [ATS Resume Checker](#ats-resume-checker)
  - [Code Editor](#code-editor)
  - [Webcam Recorder](#webcam-recorder)
  - [Spider Solitaire Game](#spider-solitaire-game)
  - [Taipei Game](#taipei-game)
  - [Tarot Game](#tarot-game)
  - [Pool Game](#pool-game)
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

### ATS Resume Checker

A dedicated ATS Resume Checker is also part of the project, designed to streamline your job application process. It supports both PDF and DOCX file types, offering a versatile solution for reviewing resumes. The checker is fully responsive, ensuring seamless functionality across desktop and mobile devices, so you can optimize your resume. With a straightforward interface, it provides instant, actionable feedback to help you tailor your resume for modern applicant tracking systems.

### Code Editor

A powerful, lightweight code editor is integrated into the project, offering a streamlined environment for writing and managing code directly within the application. It supports syntax highlighting for a wide array of popular programming languages. The editor includes essential features like auto-indentation and bracket matching to enhance the coding experience. With its clean interface, it's designed to be an accessible and efficient tool for quick edits, code review and even light development tasks.

### Webcam Recorder

Provides a webcam recorder capable of capturing high-quality video and audio directly from a user's device. Built with cross-platform compatibility in mind, it supports recording in both 720p and 1080p resolutions, allowing users to select their preferred quality. It's a versatile tool for various applications, from simple video messages to more professional content creation, all within the browser.

### Spider Solitaire Game

For card game enthusiasts, a fully responsive Spider Solitaire game has been added. Designed to be played effortlessly on a desktop computer, a smartphone, or a tablet, it adapts its layout and controls to provide an intuitive experience across all screen sizes.

### Taipei Game

Another beloved classic, the Taipei (Mahjong Solitaire) game, is also part of this project. It's built with responsive design principles, ensuring an optimal and enjoyable experience on desktops, phones and tablets. The intuitive touch controls and adaptive layout make it a pleasure to play on any device.

### Tarot Game

Also for card game enthusiasts, a Tarot card game is part of this project, that was reimagined for the modern age. It provides an immersive experience on desktop and mobile devices. The layout adjusts to fit your screen, and the user interface is optimized for both mouse and touch controls, allowing you to easily draw and play cards no matter where you are.

### Pool Game

For a different pace, a fully responsive Pool game has been added to the collection. Built with meticulous attention to detail, it provides a smooth and engaging experience on any device. The game automatically adjusts its layout and controls, ensuring that the intuitive touch or mouse controls allow for precise shots whether you are playing on mobile or desktop devices.

### Tetris Game

Lastly, this project includes a fully functional Tetris game meticulously designed for cross-platform compatibility. Whether you're on a desktop computer, a smartphone, or a tablet, the game adapts seamlessly to your screen size and input method, offering an engaging and responsive gaming experience across all devices.

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
  "W3C_CHECK": [
    "https://www.example.com/",
    "https://www.anothersite.org/contact.html"
  ],
  "URLS_CHECK": [
    { "https://www.example.com/products": "Out of Stock" },
    { "https://www.anothersite.org/news": ["Breaking News", "Urgent Update"] }
  ],
  "DATES_CHECK": [
    { "2025-12-25": "Christmas Day" },
    { "2026-01-01": "New Year's Day Celebration" }
  ],
  "DOMAINS_CHECK": [
    { "2025-11-15": "mydomain.com" },
    { "2026-03-01": "anotherdomain.net" }
  ],
  "NEWSPAPERS_CHECK": [
    {
      "TECH_SECTION": [
        "https://www.nytimes.com/section/technology",
        "https://www.wsj.com/tech"
      ]
    },
    {
      "BUSINESS_SECTION": [
        "https://www.bloomberg.com/markets",
        "https://www.reuters.com/business"
      ]
    }
  ],
  "USER_LANG": "en-US,en;q=0.9,es;q=0.1",
  "STRING_SYSTEM_REPORT": "System report",
  "STRING_NEWSPAPER_HEADLINES": "Newspaper headlines"
}
```

- **W3C_CHECK**: A list of URLs to be checked against W3C validation rules. It's an array of strings. Each element in the array should be a string representing a valid URL.

* **URLS_CHECK**: A list of URLs to check for the presence or absence of specific strings. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string representing the URL to check.
  - The value can be either:
    - A string: The system will report if this string is not found on the page.
    - An array of strings: The system will report if any of these strings are found on the page.

* **DATES_CHECK**: A list of dates associated with specific events. This can be used for reminders or to track upcoming events. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string in `YYYY-MM-DD` format representing the date.
  - The value is a string representing the name of the event.

* **DOMAINS_CHECK**: A list of domains to be checked on specific dates. This could be for monitoring domain expiration, SSL certificate validity, or other date-sensitive domain-related tasks. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string in `YYYY-MM-DD` format representing the date.
  - The value is a string representing the domain name (e.g., example.com).

* **NEWSPAPERS_CHECK**: A configuration for getting the headlines from sections of newspapers. It's an array of objects. Each object in the array should have a single key-value pair where:

  - The key is a string representing the name of the section (e.g., "TECH", "SPORTS").
  - The value is an array of strings, where each string is a URL to a specific newspaper section.

* **USER_LANG**: Specifies the preferred user language(s) in a comma-separated format, similar to the Accept-Language HTTP header. It's a String. A string containing language tags and optional quality values (q-factor).

* **STRING_SYSTEM_REPORT**: The localized string to be used as the subject in the email that is sent to the user when the bot detects something that must be reported. It's a String. Any string.

* **STRING_NEWSPAPER_HEADLINES**: The localized string to be used as the subject in the email that is sent to the user with the list of newspaper headlines. It's a String. Any string.

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
new Screensaver({
  secondsInactive: 30, // Screensaver activates after 30 seconds of inactivity
  speed: 1, // Normal animation speed
  logo: "Logo.png", // Displays "Logo.png" on the screensaver
  disabledWhenUsingIframes: true, // Screensaver won't activate if an iframe is in use
})
```

---

## License

Distributed under the GPL-3.0 License. See `license.txt` for more information.
