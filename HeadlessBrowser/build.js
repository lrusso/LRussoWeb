import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

const run = (cmd) => {
  try {
    execSync(cmd, { stdio: "inherit" })
  } catch (err) {
    if (err.stderr) {
      // eslint-disable-next-line no-console
      console.log(err.stderr.toString())
    }
    process.exit(1)
  }
}

// 1. Deleting any previous temporary folder
if (fs.existsSync("classes")) {
  fs.rmSync("classes", { recursive: true, force: true })
}
if (fs.existsSync("jar-temp")) {
  fs.rmSync("jar-temp", { recursive: true, force: true })
}

// 2. Create output directories
fs.mkdirSync("classes")
fs.mkdirSync("jar-temp")

// 3. Deleting the initial HeadlessBrowser.jar file
if (fs.existsSync("HeadlessBrowser.jar")) {
  fs.unlinkSync("HeadlessBrowser.jar")
}

// 4. Compile the Java source file
run(
  'javac --release 9 -cp "htmlunit-4.17.0/htmlunit-4.17.0.jar:htmlunit-4.17.0/lib/*" HeadlessBrowser.java -d classes'
)

// 5. Unpack the main JAR and its dependencies
process.chdir("jar-temp")
run("jar xf ../htmlunit-4.17.0/htmlunit-4.17.0.jar")
run("sh -c 'for f in ../htmlunit-4.17.0/lib/*.jar; do jar xf \"$f\"; done'")

// 6. Copy compiled class file into the temp jar folder
fs.copyFileSync(
  path.join("..", "classes", "HeadlessBrowser.class"),
  path.join("HeadlessBrowser.class")
)

// 7. Clean META-INF except MANIFEST.MF
if (fs.existsSync("META-INF")) {
  const metaFiles = fs.readdirSync("META-INF")
  for (const file of metaFiles) {
    if (file !== "MANIFEST.MF") {
      fs.rmSync(path.join("META-INF", file), { recursive: true, force: true })
    }
  }
}

// 8. Create custom MANIFEST.MF
fs.writeFileSync("MANIFEST.MF", "Main-Class: HeadlessBrowser\n")

// 9. Repack everything into a runnable JAR
run("jar cfm ../HeadlessBrowser.jar MANIFEST.MF .")

// 10. Going back to the original folder
process.chdir("..")

// 11. Deleting the temporary folders
if (fs.existsSync("classes")) {
  fs.rmSync("classes", { recursive: true, force: true })
}
if (fs.existsSync("jar-temp")) {
  fs.rmSync("jar-temp", { recursive: true, force: true })
}

// 12. Checking if the jar was created
if (fs.existsSync("HeadlessBrowser.jar")) {
  // eslint-disable-next-line no-console
  console.log("A new HeadlessBrowser.jar file was generated")
}
