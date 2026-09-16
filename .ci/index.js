import { execSync } from "child_process"
import { statSync } from "fs"
import { dirname, join, resolve } from "path"

const steps = [
  { key: "eslint", name: "Running ESLint" },
  { key: "prettier", name: "Running Prettier" },
  { key: "unit", name: "Running Unit Tests" },
  { key: "e2e", name: "Running End-to-End Tests" },
  { key: "w3c", name: "Running the W3C Validator" },
  { key: "babel", name: "Running the ECMAScript 5 Validator" },
]

function getCiDir() {
  const scriptPath = resolve(process.argv[1])

  try {
    if (statSync(scriptPath).isDirectory()) {
      return scriptPath
    }
  } catch (err) {
    //
  }

  return dirname(scriptPath)
}

function findStep(key) {
  return steps.filter(function (step) {
    return step.key === key
  })[0]
}

function getAvailableKeys() {
  return steps
    .map(function (step) {
      return step.key
    })
    .join(", ")
}

function getSelectedSteps() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    return steps
  }

  if (args.length > 1) {
    // eslint-disable-next-line
    console.log("\x1b[31m%s\x1b[0m", "Only one step is allowed")
    // eslint-disable-next-line
    console.log("Available steps: " + getAvailableKeys())
    process.exit(1)
  }

  const step = findStep(args[0])

  if (!step) {
    // eslint-disable-next-line
    console.log("\x1b[31m%s\x1b[0m", "Unknown step: " + args[0])
    // eslint-disable-next-line
    console.log("Available steps: " + getAvailableKeys())
    process.exit(1)
  }

  return [step]
}

process.chdir(resolve(join(getCiDir(), "..")))

const selectedSteps = getSelectedSteps()

for (const step of selectedSteps) {
  // eslint-disable-next-line
  console.log("\x1b[1m%s\x1b[0m", step.name)

  try {
    execSync("node .ci/steps/" + step.key + ".js", { stdio: "inherit" })
  } catch (err) {
    process.exit(1)
  }
}

// ----------------------------------------------------------------------------
// how to use this implementation?
// ----------------------------------------------------------------------------
//
// node .ci
// node .ci/index.js
//
// node .ci eslint
// node .ci prettier
// node .ci unit
// node .ci e2e
// node .ci w3c
// node .ci babel
//
