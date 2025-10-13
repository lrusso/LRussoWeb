import { dirname, join, extname, resolve } from "path"
import { statSync, readdirSync } from "fs"
import { execSync } from "child_process"
import { fileURLToPath } from "url"
import process from "process"

// https://app.unpkg.com/vnu-jar@23.4.11

function findAllFilesRecursive(dir) {
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
    } catch (error) {}
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

console.log("Nu Html Checker version: " + getVersion())

const allFiles = findAllFilesRecursive(startDir).sort(alphaNumericSort)
const targetExts = [".html", ".htm"]
const filesToFormat = allFiles.filter((file) => targetExts.includes(extname(file)))

for (const filePath of filesToFormat) {
  console.log(
    "Checking... " + filePath.substring(startDir.length + 1, filePath.length)
  )
  try {
    const nvuReport = execSync(
      "java -jar w3c.jar --exit-zero-always --stdout --html " + filePath
    )
    const reportText = nvuReport
      .toString()
      .replace(/"file:[^"]*\/([^\/"]+\.[^":]+)":/g, "")
      .trim()
    if (reportText) {
      console.log(reportText)
      errorsFound = true
    }
  } catch (error) {
    console.log(error)
    errorsFound = true
  }
}

if (errorsFound) {
  // EXITING THE PROCESS WITH AN ERROR IN ORDER TO TRIGGER A GITHUB NOTIFICATION
  process.exit(1)
}
