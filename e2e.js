import { execSync } from "child_process"
import process from "process"

const browseToWebsite = (userLanguage, userAgent, url, selector) => {
  try {
    const result = execSync(
      'java -jar e2e.jar "' +
        userLanguage +
        '" "' +
        userAgent +
        '" "' +
        url +
        '" "' +
        selector +
        '"'
    )
      .toString()
      .trim()
    return JSON.parse(result).innerText
  } catch (err) {
    //
  }

  return ""
}

const url = "index.html"
const langEN = "en-US"
const langES = "es-AR"
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0"
const linkLinkedIn = "#home > div:nth-child(12) > div:nth-child(2) > div > div > a"
const linkPlayStore = "#home > div:nth-child(12) > div:nth-child(3) > div > div > a"
const linkGitHub = "#home > div:nth-child(12) > div:nth-child(4) > div > div > a"

let errorsFound = false

// TEST 1 - CHECKING WORDS IN ENGLISH
const englishTest = browseToWebsite(langEN, userAgent, url)
if (!englishTest.includes("projects")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log(langEN + ' - The "projects" word was not found.')
}

// TEST 2 - CHECKING WORDS IN SPANISH
const spanishTest = browseToWebsite(langES, userAgent, url)
if (!spanishTest.includes("desarrollos")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log(langES + ' - The "desarrollos" word was not found.')
}

// TEST 3 - CLICKING ON THE LINKEDIN ICON
const linkedInTest = browseToWebsite(langEN, userAgent, url, linkLinkedIn)
if (!linkedInTest.includes("Mobile, Web and AI developer")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log("The LinkedIn link is not working.")
}

// TEST 4 - CLICKING ON THE PLAY STORE ICON
const playStoreTest = browseToWebsite(langEN, userAgent, url, linkPlayStore)
if (!playStoreTest.includes("3D Object Viewer")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log("The Play Store link is not working.")
}

// TEST 5 - CLICKING ON THE GITHUB ICON
const githubTest = browseToWebsite(langEN, userAgent, url, linkGitHub)
if (!githubTest.includes("Popular repositories")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log("The GitHub link is not working.")
}

if (errorsFound) {
  process.exit(1)
}
