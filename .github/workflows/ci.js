import { dirname, join, extname, resolve } from "path"
import { statSync, readdirSync } from "fs"
import { execSync } from "child_process"
import { fileURLToPath } from "url"
import process from "process"

function findFilesRecursiveSync(dir, ext) {
  const files = []

  try {
    const stats = statSync(dir)
    if (!stats.isDirectory()) {
      return files
    }
  } catch (e) {
    return files
  }

  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = join(dir, entry)

    try {
      const stats = statSync(fullPath)

      if (stats.isDirectory()) {
        files.push(...findFilesRecursiveSync(fullPath, ext))
      } else if (stats.isFile() && extname(entry) === ext) {
        files.push(fullPath)
      }
    } catch (e) {}
  }

  return files
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const startDir = resolve(__dirname, "../../")
const htmlFiles = findFilesRecursiveSync(startDir, ".html")

let errorsFound = false

const getVersion = () => {
  try {
    const nvuVersion = execSync("java -jar vnu.jar --version").toString().trim()
    return nvuVersion
  } catch (err) {
    return ""
  }
}

console.log("Nu Html Checker version: " + getVersion())

for (const filePath of htmlFiles) {
  console.log("Checking... " + filePath.substring(startDir.length, filePath.length))
  try {
    const nvuReport = execSync(
      "java -jar vnu.jar --exit-zero-always --stdout --html " + filePath
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
