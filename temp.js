import fs from "fs"
const file = fs.readFileSync("names.txt", "utf8")
const lines = file.split("\n")
const firstNames = []
lines.forEach((line) => {
    firstNames.push(line.toString().trim())
})
fs.writeFileSync("temp.txt", JSON.stringify(firstNames))