// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var sqlite = require("./modules/sqlite3");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// Render CSS Files
app.use(express.static("public"));

// Declaring pin and completed arrays.
type pin = {
  id?: number,
  value: string,
  hasBeenTried: number
};

var pinList: pin[];
pinList = [];

// Adding a new pin.
app.post("/:id", (req: any, res: any) => {
  var { hasBeenTried}: pin = req.body;
  var id = req.params.id;
  sqlite.editPin(id, hasBeenTried, () => {
    res.send("Success");
  });
});

// Render the ejs and display added pin, completed pin
app.get("/", (req: any, res: any) => {
  sqlite.getPinList((pinList: pin[]) => {
    res.send(pinList);
  });
});

// Set app to listen on port 3000
app.listen(3000, () => { console.log("server is running on port 3000"); });