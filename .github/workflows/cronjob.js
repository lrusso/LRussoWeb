const settings = {
  W3C_CHECK: ["https://www.lrusso.com", "https://www.lrusso.com/privacy.html"],
  URLS_CHECK: [
    // { URL_TO_CHECK: "REPORT IF THIS STRING IS NOT FOUND" }
    // { URL_TO_CHECK: ["REPORT IF THIS STRING IS FOUND", "OR IF THIS STRING IS FOUND"] }
    {
      "https://www.google.com.ar/search?q=%22leonardo+javier+russo%22+-+top+-+android+-+apk&tbs=qdr%3Ad&tbm=nws":
        "No se han encontrado",
    },
    {
      "https://www.google.com.ar/search?q=leonardo+russo+github&tbs=qdr%3Ad&tbm=nws":
        "No se han encontrado",
    },
    {
      "https://www.google.com.ar/search?q=%22leonardo+russo%22+software+-scimag.news&tbs=qdr%3Ad&tbm=nws":
        "No se han encontrado",
    },
    {
      "https://www.google.com.ar/search?q=%22leonardo+russo%22+programador&tbs=qdr%3Ad&tbm=nws":
        "No se han encontrado",
    },
    {
      "https://shop.samsung.com/ar/85-pulgadas": [" Crystal"],
    },
  ],
  DATES_CHECK: [
    // { YYYY-MM-DD: EVENT_NAME }
    { "2025-12-30": "BRAND - LRUSSO NAME is about to expire." },
    { "2027-12-07": "BRAND - LRUSSO LOGO is about to expire." },
    { "2033-05-31": "BRAND - EMULATRIX NAME CLASS 9 is about to expire." },
    { "2033-05-23": "BRAND - EMULATRIX NAME CLASS 38 is about to expire." },
    { "2033-11-10": "BRAND - PIXELGYM NAME CLASS 9 is about to expire." },
  ],
  DOMAINS_CHECK: [
    // { YYYY-MM-DD: DOMAIN_NAME }
    { "2034-11-25": "LRUSSO.COM" },
    { "2035-07-11": "EMULATRIX.COM" },
    { "2034-12-25": "EMULATRIX.NET" },
    { "2034-12-28": "EMULATRIX.ORG" },
  ],
  NEWSPAPERS_CHECK: [
    {
      TECNOLOGÍA: [
        "https://www.clarin.com/tecnologia",
        "https://www.infobae.com/tecno",
        "https://www.lanacion.com.ar/tecnologia",
      ],
    },
    {
      ECONOMÍA: [
        "https://www.clarin.com/economia",
        "https://www.infobae.com/economia",
        "https://www.lanacion.com.ar/economia",
      ],
    },
    {
      POLÍTICA: [
        "https://www.clarin.com/politica",
        "https://www.infobae.com/politica",
        "https://www.lanacion.com.ar/politica",
      ],
    },
    {
      SOCIEDAD: [
        "https://www.clarin.com/sociedad",
        "https://www.infobae.com/sociedad",
        "https://www.lanacion.com.ar/sociedad",
      ],
    },
  ],
  USER_LANG: "es-AR,es;q=0.9,en;q=0.1",
  USER_AGENTS: [
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
  ],
  STRING_SYSTEM_REPORT: "Reporte del sistema",
  STRING_NEWSPAPER_HEADLINES: "Listado de titulares",
}

let userAgent = null
let report = []

const getUserAgent = () => {
  let newUserAgent = settings.USER_AGENTS ? settings.USER_AGENTS[0] : ""

  settings.USER_AGENTS?.forEach((storedUserAgent, index) => {
    if (userAgent === storedUserAgent && index < settings.USER_AGENTS.length - 1) {
      newUserAgent = settings.USER_AGENTS[index + 1]
    }
  })

  userAgent = newUserAgent

  return userAgent
}

const sendEmail = async (subject, body) => {
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

const customFetch = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Accept-Language": settings.USER_LANG,
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

// TASK 1 - CHECKING IF THE WEBSITES ARE MEETING THE W3C STANDARD
const task1 = async (urlsArray) => {
  let taskURL = ""

  // LOOPING EVERY URL
  for (const url of urlsArray) {
    try {
      // GENERATING THE URL FOR USING THE W3C VALIDATOR
      const w3cURL =
        "https://validator.w3.org/nu/?doc=" + encodeURIComponent(url) + "&out=json"

      // SETTING THE CURRENT TASK URL
      taskURL = w3cURL

      // BROWSING TO THE URL AND GETTING THE WEB CONTENT
      const result = await customFetch(w3cURL)

      // GETTING THE W3C REPORT
      const reportW3C = JSON.parse(result)

      // CHECKING IF THERE ARE ANY OBSERVATIONS
      if (reportW3C.messages.length > 0) {
        report.push("W3C report obtained at " + w3cURL)
      }
    } catch (err) {
      report.push("Error when trying to get the W3C report " + taskURL)
    }
  }
}

// TASK 2 - CHECKING IF THE URLS ARE SHOWING A DIFFERENT CONTENT
const task2 = async (urlsArray) => {
  let taskURL = ""

  // LOOPING EVERY URL
  for (const url of urlsArray) {
    try {
      // LOOPING EVERY OBJECT
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
          value.forEach((toFind) => {
            if (result.indexOf(toFind) > -1) {
              report.push("Website content has changed at " + key)
            }
          })
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

// TASK 3 - CHECKING IF IMPORTANT DATES ARE CLOSE
const task3 = (datesArray, currentDate) => {
  let taskDate = ""

  // LOOPING EVERY DATE
  datesArray?.forEach((event) => {
    try {
      // LOOPING EVERY EVENT
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
  })
}

// TASK 4 - CHECKING IF REGISTERED DOMAINS CAN BE RENEWED
const task4 = (domainsArray, currentDate) => {
  let taskDomain = ""

  // LOOPING EVERY DOMAIN
  domainsArray?.forEach((event) => {
    try {
      // LOOPING EVERY ENTRY
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
        if (expirationMonth - 1 == currentMonth && currentDay < expirationDay) {
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
  })
}

// TASK 5 - READING NEWSPAPERS AND SENDING AN EMAIL
const task5 = async (newspapers) => {
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
  await sendEmail(settings.STRING_NEWSPAPER_HEADLINES, result)
}

const runTasks = async () => {
  await task1(settings.W3C_CHECK)
  await task2(settings.URLS_CHECK)
  task3(settings.DATES_CHECK, new Date())
  task4(settings.DOMAINS_CHECK, new Date())
  await task5(settings.NEWSPAPERS_CHECK)

  if (report.length === 0) {
    console.log("Nothing to report.")
  } else {
    console.log(report.join("\n").toString())

    // SENDING AN EMAIL WITH THE SYSTEM REPORT
    await sendEmail(settings.STRING_SYSTEM_REPORT, report.join("\n").toString())

    // EXITING THE PROCESS WITH AN ERROR IN ORDER TO TRIGGER A GITHUB NOTIFICATION
    process.exit(1)
  }
}

runTasks()

/*

-----------------------------------------------------------------------------
HOW TO GENERATE THE ENVIRONMENT VARIABLE GOOGLE_API_KEY
-----------------------------------------------------------------------------

1) Browse to https://script.google.com
2) Click on "New project".
3) Paste the following code:

function doPost(e) {
    const emailAddress = "YOUR_EMAIL_ADDRESS_HERE";
    const subject = e.parameter.subject;
    const message = e.parameter.message;

    try {
        MailApp.sendEmail({
            to: emailAddress,
            subject: subject,
            htmlBody: message
        });
        return ContentService.createTextOutput(true);
    } catch (error) {
        return ContentService.createTextOutput(error.message);
    };
};

4) Click on "Deploy".
5) Click on "New deployment".
6) Where it says "Select type", select "Web app".
7) Where it says "Who has access", select "Anyone".
8) Click on "Deploy".
9) If it's the first time you deploy the App:
  1) Click on "Authorize Access".
  2) Select your Google Account.
  3) Your App is not verified, so click on "Advanced".
  4) Click on "Go to <your_app_name>(unsafe)".
  5) Click on "Allow".
10) Finally, there you will get your Deployment ID that it will be your GOOGLE_API_KEY.

-----------------------------------------------------------------------------
HOW TO SET THE ENVIRONMENT VARIABLE GOOGLE_API_KEY IN YOUR REPOSITORY
-----------------------------------------------------------------------------

1) Go to your GitHub repository.
2) Click on "Settings".
3) Click on "Secrets and variables".
4) Click on "Actions".
5) Click on "New repository secret".
6) There you can create the GOOGLE_API_KEY variable with your Deployment ID value.

*/
