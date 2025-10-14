import { execSync } from "child_process"
import process from "process"

const browseTo = (userLanguage, userAgent, url, selector) => {
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
    return JSON.parse(result)
  } catch (err) {
    //
  }

  return { html: "", innerText: "" }
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
const englishTest = browseTo(langEN, userAgent, url).innerText
if (!englishTest.includes("projects")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log(langEN + ' - The "projects" word was not found.')
}

// TEST 2 - CHECKING WORDS IN SPANISH
const spanishTest = browseTo(langES, userAgent, url).innerText
if (!spanishTest.includes("desarrollos")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log(langES + ' - The "desarrollos" word was not found.')
}

// TEST 4 - CHECKING THE EMAIL ICON
const emailTest = browseTo(langEN, userAgent, url).html
if (!emailTest.includes("mailto:info@lrusso.com")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log("The Email link is not working.")
}

// TEST 5 - CLICKING ON THE LINKEDIN ICON
const linkedInTest = browseTo(langEN, userAgent, url, linkLinkedIn).innerText
if (!linkedInTest.includes("Mobile, Web and AI developer")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log("The LinkedIn link is not working.")
}

// TEST 6 - CLICKING ON THE PLAY STORE ICON
const playStoreTest = browseTo(langEN, userAgent, url, linkPlayStore).innerText
if (!playStoreTest.includes("3D Object Viewer")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log("The Play Store link is not working.")
}

// TEST 7 - CLICKING ON THE GITHUB ICON
const githubTest = browseTo(langEN, userAgent, url, linkGitHub).innerText
if (!githubTest.includes("Popular repositories")) {
  errorsFound = true
  // eslint-disable-next-line no-console
  console.log("The GitHub link is not working.")
}

if (errorsFound) {
  process.exit(1)
}
