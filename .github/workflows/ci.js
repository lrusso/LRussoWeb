import { execSync } from "child_process"
import process from "process"
import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function findFilesRecursiveSync(dir, ext) {
  const files = []

  try {
    const stats = fs.statSync(dir)
    if (!stats.isDirectory()) {
      return files
    }
  } catch (e) {
    return files
  }

  const entries = fs.readdirSync(dir)

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)

    try {
      const stats = fs.statSync(fullPath)

      if (stats.isDirectory()) {
        files.push(...findFilesRecursiveSync(fullPath, ext))
      } else if (stats.isFile() && path.extname(entry) === ext) {
        files.push(fullPath)
      }
    } catch (e) {}
  }

  return files
}

const startDir = path.resolve(__dirname, "../../")
const fileExtension = ".html"

const htmlFiles = findFilesRecursiveSync(startDir, fileExtension)

let errorsFound = false

for (const filePath of htmlFiles) {
  console.log("Checking... " + filePath.substring(startDir.length, filePath.length))
  try {
    const nvuReport = execSync(
      "java -jar vnu.jar --exit-zero-always --stdout --html " + filePath
    )
    const reportText = nvuReport.toString().trim()
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
