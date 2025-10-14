import { execSync } from "child_process"
import process from "process"

const browseToWebsite = (userLanguage, userAgent, url) => {
  try {
    const result = execSync(
      'java -jar e2e.jar "' + userLanguage + '" "' + userAgent + '" "' + url + '"'
    )
      .toString()
      .trim()
    return result
  } catch (err) {
    //
  }

  return ""
}

const findWord = (language, userAgent, url, word) => {
  try {
    const localWebsite = JSON.parse(
      browseToWebsite(language, userAgent, url)
    ).innerText
    if (localWebsite.includes(word)) {
      return true
    }
  } catch (err) {
    //
  }

  // eslint-disable-next-line no-console
  console.log(language + " - " + url + ' not showing the "' + word + '" word.')
  return false
}

const checkWebsite = (url) => {
  for (const lang in languages) {
    try {
      const toFind = languages[lang]
      const result = findWord(lang, userAgent, url, toFind)
      if (!result) {
        errorsFound = true
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      errorsFound = true
    }
  }
}

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0"
const languages = {
  "es-AR": "desarrollos",
  "en-US": "projects",
}

let errorsFound = false

checkWebsite("https://www.lrusso.com")
checkWebsite("index.html")

if (errorsFound) {
  process.exit(1)
}
