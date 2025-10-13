import process from "process"

let settings = {
  checks: {
    urls: [],
    dates: [],
    domains: [],
    newspapers: [],
  },
  userLanguage: "en-US,en;q=0.9,es;q=0.1",
  emailSubjects: {
    systemReport: "System report",
    newspaperHeadlines: "Newspaper headlines",
  },
}

if (process.env.BOT_SETTINGS) {
  settings = JSON.parse(process.env.BOT_SETTINGS)
}

const USER_AGENTS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/115.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:56.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.234 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
]

let report = []

let currentUserAgentIndex = -1

function getUserAgent() {
  currentUserAgentIndex = currentUserAgentIndex + 1

  if (currentUserAgentIndex >= USER_AGENTS.length) {
    currentUserAgentIndex = 0
  }

  return USER_AGENTS[currentUserAgentIndex]
}

async function sendEmail(subject, body) {
  if (process.env.GOOGLE_API_KEY) {
    try {
      const url =
        "https://script.google.com/macros/s/" + process.env.GOOGLE_API_KEY + "/exec"
      const postData =
        "subject=" +
        encodeURIComponent(subject) +
        "&message=" +
        encodeURIComponent(body)

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData,
      })
    } catch (err) {
      //
    }
  }
}

async function customFetch(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Accept-Language": settings.userLanguage,
        "User-Agent": getUserAgent(),
      },
    })

    if (!response.ok) {
      return ""
    }

    return await response.text()
  } catch (error) {
    return ""
  }
}

// TASK 1 - CHECKING IF THE URLS ARE SHOWING A DIFFERENT CONTENT
async function task1(urlsArray) {
  let taskURL = ""

  // GETTING EVERY URL
  for (const url of urlsArray) {
    try {
      // GETTING EVERY OBJECT
      for (const [key, value] of Object.entries(url)) {
        // SETTING THE CURRENT TASK URL
        taskURL = key

        // BROWSING TO THE URL AND GETTING THE WEB CONTENT
        const result = await customFetch(key)

        // IF VALUE IS A STRING, IT WILL CHECK IF THE STRING IS NOT FOUND IN THE WEB CONTENT
        if (typeof value === "string") {
          if (result.indexOf(value) === -1) {
            report.push("Website content has changed at " + key)
          }
        }

        // IF VALUE IS AN ARRAY, IT WILL CHECK IF AT LEAST ONE STRING IS FOUND IN THE WEB CONTENT
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const toFind = value[i]
            if (result.indexOf(toFind) > -1) {
              report.push("Website content has changed at " + key)
            }
          }
        }

        // IF VALUE IS A NUMBER, IT WILL CHECK THE WEB CONTENT LENGTH
        else if (typeof value === "number") {
          if (result.length !== value) {
            report.push("Website content has changed at " + key)
          }
        }
      }
    } catch (err) {
      report.push("Error when trying to check the URL " + taskURL)
    }
  }
}

// TASK 2 - CHECKING IF IMPORTANT DATES ARE CLOSE
function task2(datesArray, currentDate) {
  let taskDate = ""

  // GETTING EVERY DATE
  if (Array.isArray(datesArray)) {
    for (let i = 0; i < datesArray.length; i++) {
      const event = datesArray[i]
      try {
        // GETTING EVERY EVENT
        for (const [key, value] of Object.entries(event)) {
          // GETTING THE DIFFERENCE BETWEEN THE TWO DATES
          taskDate = key.split("-")
          const eventDate = new Date(
            taskDate[0] + "-" + taskDate[1] + "-" + taskDate[2]
          )
          const diffTime = currentDate - eventDate
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

          // CHECKING IF THE DIFFERENCE IS LESS THAN 1 MONTH
          if (diffDays >= -31) {
            // ADDING THE EVENT AS SOMETHING TO REPORT
            report.push(value)
          }
        }
      } catch (err) {
        report.push("Error when trying to check the date " + taskDate + ".")
      }
    }
  }
}

// TASK 3 - CHECKING IF REGISTERED DOMAINS CAN BE RENEWED
function task3(domainsArray, currentDate) {
  let taskDomain = ""

  // GETTING EVERY DOMAIN
  if (Array.isArray(domainsArray)) {
    for (let i = 0; i < domainsArray.length; i++) {
      const event = domainsArray[i]
      try {
        // GETTING EVERY ENTRY
        for (const [key, value] of Object.entries(event)) {
          // GETTING THE DOMAIN TO CHECK
          taskDomain = value.toLowerCase().trim()

          // GETTING THE DATES
          const expirationDate = key.split("-")
          const expirationDay = expirationDate[2]
          const expirationMonth = expirationDate[1]
          const expirationYear = expirationDate[0]
          const currentYear = currentDate.getFullYear()
          const currentMonth = currentDate.getMonth()
          const currentDay = currentDate.getDate()

          // GETTING THE DIFFERENCE BETWEEN THE TWO DATES
          let diffYears = currentYear - expirationYear
          if (currentMonth < expirationMonth - 1) {
            diffYears = diffYears - 1
          }
          if (expirationMonth - 1 === currentMonth && currentDay < expirationDay) {
            diffYears = diffYears - 1
          }
          diffYears = Math.abs(diffYears)

          // CHECKING IF THE DIFFERENCE IS LESS THAN 10 YEARS (SO THE DOMAIN CAN BE RENEWED)
          if (diffYears < 10) {
            report.push(taskDomain + " can be renewed.")
          }
        }
      } catch (err) {
        report.push("Error when trying to check the domain " + taskDomain + ".")
      }
    }
  }
}

// TASK 4 - READING NEWSPAPERS AND SENDING AN EMAIL
async function task4(newspapers) {
  let result = ""

  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gim
  const tagRegex =
    /<h2[^>]*>|<\/h2>|<div[^>]*>|<\/div>|<span[^>]*>|<\/span>|<a[^>]*>|<\/a>|<b[^>]*>|<\/b>|<u[^>]*>|<\/u>|<i[^>]*>|<\/i>/gim

  for (const section of newspapers) {
    try {
      for (const [sectionTitle, sections] of Object.entries(section)) {
        if (result !== "") {
          result = result + "<br>"
        }

        result = result + "<b>" + sectionTitle + "</b><br><br>"

        for (const sectionURL of sections) {
          const htmlString = await customFetch(sectionURL)
          const sectionName = sectionURL.substring(sectionURL.lastIndexOf("/") + 1)

          let match
          let counter = 0
          const maxHeadlines = 4

          while ((match = h2Regex.exec(htmlString))) {
            const text = match[1]
              .replace(tagRegex, "")
              .replace(/\u201C/gim, '"') // “
              .replace(/\u2018/gim, '"') // ‘
              .replace(/\u2019/gim, '"') // ’
              .replace(/\u201D/gim, '"') // ”
              .replace(/\&\#x27\;/gim, '"') // '
              .replace(/\&quot\;/gim, '"') // "
              .replace(/ {2,}/gim, " ")
              .trim()

            const hasMinimumWords = text.split(/\s+/).filter(Boolean).length > 4
            const differentSection = match[1].indexOf("href") > -1 && match[1].indexOf(sectionName) === -1
            const exceedsLimit = counter > maxHeadlines
            const mustBeIncluded = hasMinimumWords && !exceedsLimit && !differentSection

            if (mustBeIncluded) {
              result =
                result + "&#8226; " + (text.endsWith(".") ? text : text) + ".<br>"
              counter = counter + 1
            }
          }
        }
      }
    } catch (err) {
      //
    }
  }

  result = '<span style="font-size:16px;line-height:1.8">' + result.trim() + "</b>"

  // SENDING AN EMAIL WITH THE NEWSPAPER HEADLINES
  await sendEmail(settings.emailSubjects.newspaperHeadlines, result)
}

async function runTasks() {
  await task1(settings.checks.urls)
  task2(settings.checks.dates, new Date())
  task3(settings.checks.domains, new Date())
  await task4(settings.checks.newspapers)

  if (report.length === 0) {
    console.log("Nothing to report.")
  } else {
    console.log(report.join("\n").toString())

    for (let i = 0; i < report.length; i++) {
      report[i] = report[i].replace(/(\r?\n)/g, "<br>")
    }

    // SENDING AN EMAIL WITH THE SYSTEM REPORT
    await sendEmail(settings.emailSubjects.systemReport, report.join("<br><br>").toString())

    // EXITING THE PROCESS WITH AN ERROR IN ORDER TO TRIGGER A GITHUB NOTIFICATION
    process.exit(1)
  }
}

runTasks()
