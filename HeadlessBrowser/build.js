import { execSync } from "child_process"
import * as fs from "fs"

function run(cmd) {
  try {
    execSync(cmd, { stdio: "inherit" })
  } catch (err) {
    if (err.stderr) {
      // eslint-disable-next-line
      console.log(err.stderr.toString())
    }
    process.exit(1)
  }
}

// 1. deleting any previous temporary folder
if (fs.existsSync("classes")) {
  fs.rmSync("classes", { recursive: true, force: true })
}
if (fs.existsSync("jar-temp")) {
  fs.rmSync("jar-temp", { recursive: true, force: true })
}

// 2. create output directories
fs.mkdirSync("classes")
fs.mkdirSync("jar-temp")

// 3. deleting the initial headlessbrowser.jar file
if (fs.existsSync("HeadlessBrowser.jar")) {
  fs.unlinkSync("HeadlessBrowser.jar")
}

// 4. compile the java source file
run(
  'javac --release 9 -cp "htmlunit-4.17.0/htmlunit-4.17.0.jar:htmlunit-4.17.0/lib/*" HeadlessBrowser.java -d classes'
)

// 5. unpack the main jar and its dependencies
process.chdir("jar-temp")
run("jar xf ../htmlunit-4.17.0/htmlunit-4.17.0.jar")
run("sh -c 'for f in ../htmlunit-4.17.0/lib/*.jar; do jar xf \"$f\"; done'")

// 6. copy compiled class file into the temp jar folder
fs.copyFileSync("../classes/HeadlessBrowser.class", "HeadlessBrowser.class")

// 7. clean meta-inf except manifest.mf
if (fs.existsSync("META-INF")) {
  const metaFiles = fs.readdirSync("META-INF")
  for (const file of metaFiles) {
    if (file !== "MANIFEST.MF") {
      fs.rmSync("META-INF/" + file, { recursive: true, force: true })
    }
  }
}

// 8. create custom manifest.mf
fs.writeFileSync("MANIFEST.MF", "Main-Class: HeadlessBrowser\n")

// 9. repack everything into a runnable jar
run("jar cfm ../HeadlessBrowser.jar MANIFEST.MF .")

// 10. going back to the original folder
process.chdir("..")

// 11. deleting the temporary folders
if (fs.existsSync("classes")) {
  fs.rmSync("classes", { recursive: true, force: true })
}
if (fs.existsSync("jar-temp")) {
  fs.rmSync("jar-temp", { recursive: true, force: true })
}

// 12. checking if the jar was created
if (fs.existsSync("HeadlessBrowser.jar")) {
  // eslint-disable-next-line
  console.log("A new HeadlessBrowser.jar file was generated")
}
