const settings = {
  W3C_CHECK: ["https://www.lrusso.com", "https://www.lrusso.com/privacy.html"],
  URLS_CHECK: [
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
  ],
  DATES_CHECK: [
    { "11-2025": "BRAND LRUSSO NAME is about to expire." },
    { "11-2027": "BRAND LRUSSO LOGO is about to expire." },
    { "04-2033": "BRAND EMULATRIX NAME (CLASS 9) is about to expire." },
    { "04-2033": "BRAND EMULATRIX NAME (CLASS 38) is about to expire." },
    { "10-2033": "BRAND PIXELGYM NAME (CLASS 9) is about to expire." },
  ],
  INCOME_URL: "https://www.google.com.ar/search?q={AMOUNT}+usd+to+ars",
  INCOME_TEXT_GROSS: "Your gross monthly income is $",
  INCOME_TEXT_NET: "Your net monthly income is   $",
  USER_LANG: "Accept-Language: es-AR,es;q=0.9,en;q=0.1",
  USER_AGENTS: [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  ],
}

/* eslint-disable @typescript-eslint/no-var-requires */
const execSync = require("child_process").execSync

const cmd = (command) => execSync(command).toString()

let userAgent = null

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

const curl = (url) =>
  cmd(
    'curl -H "' +
      settings.USER_LANG +
      '" -A "' +
      getUserAgent() +
      '" -s -get "' +
      url +
      '"'
  )

// TASK 1 - CHECKING IF THE WEBSITES ARE MEETING THE W3C STANDARD
const task1 = (urlsArray) => {
  let taskResult = ""

  // LOOPING EVERY URL
  urlsArray?.forEach((url) => {
    try {
      const w3cURL =
        "https://validator.w3.org/nu/?doc=" + encodeURIComponent(url) + "&out=json"

      const result = curl(w3cURL)

      const reportW3C = JSON.parse(result)

      if (reportW3C.messages.length > 0) {
        taskResult = taskResult + "W3C report obtained at " + w3cURL + "\n\n"
      }
    } catch (err) {
      taskResult =
        taskResult + "Error when trying to get the W3C report (" + err + ").\n\n"
    }
  })

  return taskResult
}

// TASK 2 - CHECKING IF THE URLS ARE SHOWING A DIFFERENT CONTENT
const task2 = (urlsArray) => {
  let taskResult = ""

  // LOOPING EVERY URL
  urlsArray?.forEach((url) => {
    try {
      // LOOPING EVERY OBJECT
      for (const [key, value] of Object.entries(url)) {
        // BROWSING TO THE URL AND GETTING THE WEB CONTENT
        const result = curl(key)

        // IF VALUE IS A STRING, IT WILL TRY TO FIND THAT STRING IN THE WEB CONTENT
        if (typeof value === "string") {
          if (result.indexOf(value) === -1) {
            taskResult =
              taskResult + "Website content has changed at " + key + "\n\n"
          }
        }

        // IF VALUE IS A NUMBER, IT WILL CHECK THE WEB CONTENT LENGTH
        else if (typeof value === "number") {
          if (result.length !== value) {
            taskResult =
              taskResult +
              "Website content length has changed, now it has " +
              result.length +
              " bytes at " +
              key +
              "\n\n"
          }
        }
      }
    } catch (err) {
      taskResult = taskResult + "Error when trying to check URL (" + err + ").\n\n"
    }
  })

  return taskResult
}

// TASK 3 - CHECKING IF IMPORTANT DATES ARE CLOSE
const task3 = (datesArray, currentDate) => {
  let taskResult = ""

  const currentMonth =
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  // LOOPING EVERY DATE
  datesArray?.forEach((event) => {
    try {
      // LOOPING EVERY EVENT
      for (const [key, value] of Object.entries(event)) {
        // CHECKING IF THE EVENT IS HAPPENING DURING THE CURRENT MONTH AND YEAR
        if (currentMonth + "-" + currentYear === key) {
          // ADDING THE EVENT AS SOMETHING TO REPORT
          taskResult = taskResult + value + "\n\n"
        }
      }
    } catch (err) {
      taskResult = taskResult + "Error when trying to check date (" + err + ").\n\n"
    }
  })

  return taskResult
}

// TASK 4 - CHECKING THE MONTHLY INCOME
const task4 = (amount, taxes, url, grossIncomeText, netIncomeText) => {
  let taskResult = ""

  if (!amount) {
    return taskResult
  }

  try {
    url = url.replace("{AMOUNT}", amount)

    grossIncomeText = grossIncomeText.trim()
    netIncomeText = netIncomeText.trim()

    const data = curl(url)

    const amountRegex = /data-precision=.*?>(.*?)<\/span>/gm

    const matches = amountRegex.exec(data)

    const grossValue = parseInt(matches[1].replaceAll(",", ""))
    const taxPercentage = (100 - taxes) / 100
    const netValue = parseInt(grossValue * taxPercentage)

    taskResult =
      grossIncomeText +
      " " +
      grossValue +
      "\n" +
      netIncomeText +
      " " +
      netValue +
      "\n"

    // eslint-disable-next-line no-console
    console.log(taskResult)
  } catch (err) {
    //
  }

  return taskResult
}

const runTasks = () => {
  const result1 = task1(settings.W3C_CHECK)
  const result2 = task2(settings.URLS_CHECK)
  const result3 = task3(settings.DATES_CHECK, new Date())
  const result4 = task4(
    process.argv[2] || 0,
    process.argv[3] || 0,
    settings.INCOME_URL,
    settings.INCOME_TEXT_GROSS,
    settings.INCOME_TEXT_NET
  )
    ? ""
    : ""

  const report = result1 + result2 + result3 + result4

  if (report === "") {
    // eslint-disable-next-line no-console
    console.log("Nothing to report.\n")
  } else {
    // eslint-disable-next-line no-console
    console.log(report)

    // EXITING THE PROCESS WITH AN ERROR
    process.exit(1)
  }
}

runTasks()
