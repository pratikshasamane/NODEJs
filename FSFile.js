const file = require("fs");

const readFilesy = file.readFileSync("file.txt", "utf-8");
console.log(readFilesy);

file.readFile("file.txt", (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

file.writeFileSync("greet.txt", "Good Afternoon Pratiksha!");
file.writeFile("greet.txt", " hello new content!", { flag: "a" }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Content written");
  }
});

// transfer data from one file to another file

const readable = file.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 3, // transfer in 3 bits ( check cmd )
});

const writable = file.createWriteStream("./greet.txt");

readable.on("data", (transferData) => {
  console.log(transferData);
  writable.write(transferData);
});
