import { dirname, join, extname, resolve } from "path"
import { statSync, readdirSync } from "fs"
import { execSync } from "child_process"
import { fileURLToPath } from "url"
import process from "process"

// https://app.unpkg.com/vnu-jar@23.4.11

const findAllFilesRecursive = (dir) => {
  const files = []

  try {
    const stats = statSync(dir)
    if (!stats.isDirectory()) {
      return files
    }
  } catch (error) {
    return files
  }

  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)

    try {
      const stats = statSync(fullPath)

      if (stats.isDirectory()) {
        files.push(...findAllFilesRecursive(fullPath))
      } else if (stats.isFile()) {
        files.push(fullPath)
      }
    } catch (error) {
      //
    }
  }

  return files
}

const alphaNumericSort = (a, b) => {
  const nameA = a.toLowerCase()
  const nameB = b.toLowerCase()

  const isDigitA = /^\d/.test(nameA)
  const isDigitB = /^\d/.test(nameB)

  if (isDigitA && !isDigitB) return -1
  if (!isDigitA && isDigitB) return 1

  return nameA.localeCompare(nameB)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const startDir = resolve(__dirname, ".")

let errorsFound = false

const getVersion = () => {
  try {
    const nvuVersion = execSync("java -jar w3c.jar --version").toString().trim()
    return nvuVersion
  } catch (err) {
    return ""
  }
}

// eslint-disable-next-line no-console
console.log("Nu Html Checker version: " + getVersion())

const allFiles = findAllFilesRecursive(startDir).sort(alphaNumericSort)
const targetExts = [".html", ".htm"]
const filesToFormat = allFiles.filter((file) => targetExts.includes(extname(file)))

for (const filePath of filesToFormat) {
  try {
    const nvuReport = execSync(
      "java -jar w3c.jar --exit-zero-always --stdout --html " + filePath
    )
    const reportText = nvuReport
      .toString()
      .replace(/"file:[^"]*\/([^\/"]+\.[^":]+)":/gm, "")
      .replace(/(\d+\.\d+)-\d+\.\d+/gm, "$1")
      .replace(/^(.*?)(\berror:)/gm, "$2 $1")
      .replace(/^(.*?)(\binfo:)/gm, "$2 $1")
      .replace(/^(.*?)(\binfo warning:)/gm, "$2 $1")
      .replace(/\berror:/gm, "\x1b[41m\x1b[38;2;255;255;255m ERROR \x1b[0m")
      .replace(/\binfo:/gm, "\x1b[42m\x1b[38;2;255;255;255m INFO \x1b[0m")
      .replace(/\binfo warning:/gm, "\x1b[42m\x1b[38;2;255;255;255m INFO \x1b[0m")
      .replace(/:  /gm, " ")
      .trim()
    if (reportText) {
      // eslint-disable-next-line no-console
      console.log(filePath.substring(startDir.length + 1))

      // eslint-disable-next-line no-console
      console.log(reportText)
      errorsFound = true
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    errorsFound = true
  }
}

if (errorsFound) {
  // EXITING THE PROCESS WITH AN ERROR IN ORDER TO TRIGGER A GITHUB NOTIFICATION
  process.exit(1)
}





