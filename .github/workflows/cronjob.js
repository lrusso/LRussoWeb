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

// task 1 - checking if the urls are showing a different content
async function task1(urlsArray) {
  let taskURL = ""

  // getting every url
  for (const url of urlsArray) {
    try {
      // getting every object
      for (const [key, value] of Object.entries(url)) {
        // setting the current task url
        taskURL = key

        // browsing to the url and getting the web content
        const result = await customFetch(key)

        // if value is a string, it will check if the string is not found in the web content
        if (typeof value === "string") {
          if (result.indexOf(value) === -1) {
            report.push("Website content has changed at " + key)
          }
        }

        // if value is an array, it will check if at least one string is found in the web content
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const toFind = value[i]
            if (result.indexOf(toFind) > -1) {
              report.push("Website content has changed at " + key)
            }
          }
        }

        // if value is a number, it will check the web content length
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

// task 2 - checking if important dates are close
function task2(datesArray, currentDate) {
  let taskDate = ""

  // getting every date
  if (Array.isArray(datesArray)) {
    for (let i = 0; i < datesArray.length; i++) {
      const event = datesArray[i]
      try {
        // getting every event
        for (const [key, value] of Object.entries(event)) {
          // getting the difference between the two dates
          taskDate = key.split("-")
          const eventDate = new Date(
            taskDate[0] + "-" + taskDate[1] + "-" + taskDate[2]
          )
          const diffTime = currentDate - eventDate
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

          // checking if the difference is less than 1 month
          if (diffDays >= -31) {
            // adding the event as something to report
            report.push(value)
          }
        }
      } catch (err) {
        report.push("Error when trying to check the date " + taskDate + ".")
      }
    }
  }
}

// task 3 - checking if registered domains can be renewed
function task3(domainsArray, currentDate) {
  let taskDomain = ""

  // getting every domain
  if (Array.isArray(domainsArray)) {
    for (let i = 0; i < domainsArray.length; i++) {
      const event = domainsArray[i]
      try {
        // getting every entry
        for (const [key, value] of Object.entries(event)) {
          // getting the domain to check
          taskDomain = value.toLowerCase().trim()

          // getting the dates
          const expirationDate = key.split("-")
          const expirationDay = expirationDate[2]
          const expirationMonth = expirationDate[1]
          const expirationYear = expirationDate[0]
          const currentYear = currentDate.getFullYear()
          const currentMonth = currentDate.getMonth()
          const currentDay = currentDate.getDate()

          // getting the difference between the two dates
          let diffYears = currentYear - expirationYear
          if (currentMonth < expirationMonth - 1) {
            diffYears = diffYears - 1
          }
          if (expirationMonth - 1 === currentMonth && currentDay < expirationDay) {
            diffYears = diffYears - 1
          }
          diffYears = Math.abs(diffYears)

          // checking if the difference is less than 10 years (so the domain can be renewed)
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

// task 4 - reading newspapers and sending an email
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
            const differentSection =
              match[1].indexOf("href") > -1 && match[1].indexOf(sectionName) === -1
            const exceedsLimit = counter > maxHeadlines
            const mustBeIncluded =
              hasMinimumWords && !exceedsLimit && !differentSection

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

  result =
    '<span style\u003D"font-size:16px;line-height:1.8">' + result.trim() + "</b>"

  // sending an email with the newspaper headlines
  await sendEmail(settings.emailSubjects.newspaperHeadlines, result)
}

async function runTasks() {
  await task1(settings.checks.urls)
  task2(settings.checks.dates, new Date())
  task3(settings.checks.domains, new Date())
  await task4(settings.checks.newspapers)

  if (report.length === 0) {
    // eslint-disable-next-line
    console.log("Nothing to report.")
  } else {
    // eslint-disable-next-line
    console.log(report.join("\n").toString())

    for (let i = 0; i < report.length; i++) {
      report[i] = report[i].replace(/(\r?\n)/g, "<br>")
    }

    // sending an email with the system report
    await sendEmail(
      settings.emailSubjects.systemReport,
      report.join("<br><br>").toString()
    )

    // exiting the process with an error in order to trigger a github notification
    process.exit(1)
  }
}

runTasks()
