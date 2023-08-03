const http = require("http");
const file = require("fs");
const server = http.createServer((req, res) => {
  const data = {
    firstname: "pratiksha",
    lastname: "patil",
  };

  const name = "pratiksha";
  res.writeHead(200, { "Content-Type": "text/html" });
  //   res.end("Hello pratiksha. I'm web server!!"); ---------> simple text
  //   res.end(JSON.stringify(data)); ---------> send JSON data

  /* const fileRead = file.readFileSync("./index.html", "utf-8");
  res.end(fileRead);
   readfileSync - read entir file at once and thats why it keep memory reserved for that. so chaining/pipes has introduced. see below
  */

  // const html = file.createReadStream("./index.html").pipe(res);

  // pass dynamic

  let fileRead = file.readFileSync("./index.html", "utf-8");
  fileRead = fileRead.replace("{{name}}", name);
  res.end(fileRead);
});

server.listen(3000, () => {
  console.log("I'm Listening..");
});
