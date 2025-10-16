import { execSync } from "child_process"
import process from "process"

const browseTo = (userLanguage, userAgent, url, selector) => {
  try {
    if (selector) {
      selector = JSON.parse(selector)
    }

    const result = execSync(
      'java -jar HeadlessBrowser.jar "' +
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

  return { html: "", text: "" }
}

const userLanguage = process.argv[2]
const userAgent = process.argv[3]
const url = process.argv[4]
const selector = process.argv[5]

const response = browseTo(userLanguage, userAgent, url, selector)
// eslint-disable-next-line
console.log(response)
