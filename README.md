# LRusso.com Website

This project integrates several distinct features, each designed to highlight specific web development skills and provide practical solutions.

---

## Table of Contents

* [Features](#features)
    * [Lightweight Responsive Portfolio](#lightweight-responsive-portfolio)
    * [404 Error Redirection Workaround](#404-error-redirection-workaround)
    * [Automated Daily Bot (Cron Job)](#automated-daily-bot-cron-job)
    * [Intelligent Web Scraping Bot](#intelligent-web-scraping-bot)
    * [MP4 Video Player with Subtitles](#mp4-video-player-with-subtitles)
    * [Cross-Platform Tetris Game](#cross-platform-tetris-game)
    * [Cross-Platform Taipei Game](#cross-platform-taipei-game)
    * [Cross-Platform Spider Solitaire Game](#cross-platform-spider-solitaire-game)
* [Usage](#usage)
    * [Automated Daily Bot](#automated-daily-bot)
* [License](#license)

---

## Features

### Lightweight Responsive Portfolio

The project features a **lightweight and highly responsive web portfolio**. Designed with performance and aesthetics in mind, it utilizes modern CSS and HTML practices to ensure fast loading times and a beautiful display on any device. This portfolio section serves as an excellent template for developers or creatives to present their projects and skills effectively.

### 404 Error Redirection Workaround

This project implements a clever **workaround for 404 (Not Found) errors**, ensuring a smoother user experience. Instead of simply displaying a generic error page, the system attempts to intelligently redirect users to relevant content or a well-designed custom error page, minimizing user frustration and improving navigation. This is achieved through a combination of server-side configurations and client-side scripting to detect 404 conditions and initiate appropriate redirection logic.

### Automated Daily Bot (Cron Job)

A powerful **cron job** is set up to automate a crucial task: running a dedicated bot **every day at 11:00 AM UTC**. This demonstrates the ability to schedule and execute server-side processes reliably, which is fundamental for many web applications requiring automated maintenance, data processing, or reporting.

### Intelligent Web Scraping Bot

At the heart of the automation is an **advanced web scraping bot**. This bot is engineered to be robust and versatile:

* **User-Agent Cycling:** It utilizes **different User-Agents** to mimic various browsers and devices, reducing the likelihood of being blocked by websites.
* **Content Verification:** The bot **verifies the content** of scraped pages, ensuring data integrity and relevance.
* **Date Checking:** It intelligently **checks dates** on content, allowing for the retrieval of fresh information or the tracking of changes over time.
* **Email Reporting:** Upon completion, the bot **sends comprehensive reports via email**, providing timely updates on its findings and any issues encountered. This is invaluable for monitoring dynamic web content.

### MP4 Video Player with Subtitles

A custom-built **MP4 video player** is integrated into the project. This player goes beyond basic video playback by offering **full support for embedded or external subtitles** (in SRT format). It provides a clean, user-friendly interface with standard playback controls, making it ideal for presenting video content with accessibility in mind.

### Cross-Platform Tetris Game

This project includes a fully functional **Tetris game** meticulously designed for **cross-platform compatibility**. Whether you're on a desktop computer, a smartphone, or a tablet, the game adapts seamlessly to your screen size and input method, offering an engaging and responsive gaming experience across all devices.

### Cross-Platform Taipei Game

Another beloved classic, the **Taipei (Mahjong Solitaire) game**, is also part of this project. Like Tetris, it's built with **responsive design principles**, ensuring an optimal and enjoyable experience on **desktops, phones and tablets**. The intuitive touch controls and adaptive layout make it a pleasure to play on any device.

### Cross-Platform Spider Solitaire Game

For card game enthusiasts, a **fully responsive Spider Solitaire game** has been added. Designed to be played effortlessly on a desktop computer, a smartphone, or a tablet, it adapts its layout and controls to provide an intuitive experience across all screen sizes.

---

## Usage

### Automated Daily Bot

This is a GitHub Actions workflow designed to run a scheduled job. Is set up to automatically execute a Node.js script on a schedule. The script uses an optional Google API Key for sending emails, ensure you have configured a **GitHub secret** named `GOOGLE_API_KEY` in your repository settings. Currently, the job runs **every day at 11:00 AM UTC**. You can change the time or frequency by modifying the `on:` line in the `.github/workflows/cronjob.yml` file.

* To run every hour:

```
on:
  schedule:
    - cron: "*/60 * * * *"
```

* To run manually (you can running it directly from your repository's **Actions** tab.):

```
on: workflow_dispatch
```

---

## License

Distributed under the GPL 3.0 License. See `license.txt` for more information.

---
