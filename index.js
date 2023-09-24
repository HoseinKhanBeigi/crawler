const express = require("express");
const fs = require("fs");

const app = express();
const port = 3001;

app.get("/read", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
    } else {
      res.send(data);
    }
  });
});

app.post("/wirte", (req, res) => {
  console.log(req);
  //   const jsonString = JSON.stringify(formattedData, null, 2);
  //   const filePath = "data.json";
  //   try {
  //     fs.writeFileSync(filePath, jsonString, "utf8");
  //   } catch (err) {
  //   }
  res.send("Got a POST request");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
