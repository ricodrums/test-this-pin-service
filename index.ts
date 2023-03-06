// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var sqlite = require("./modules/sqlite3");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Declaring pin and completed arrays.
type pin = {
  id?: number,
  value: string,
  hasBeenTried: number
};

var pinList: pin[];
pinList = [];

app.post("/:id", cors(corsOptions), (req: any, res: any) => {
  var id = req.params.id;
  sqlite.editPinById(id, 1, () => {
    res.send("Success");
  });
});

app.post("/value/:value", cors(corsOptions), (req: any, res: any) => {
  var value = req.params.value;
  sqlite.editPinByValue(value, 1, () => {
    res.send("Success");
  });
});

// Render the ejs and display added pin, completed pin
app.get("/:id", cors(corsOptions), (req: any, res: any) => {
  var id = req.params.id;
  sqlite.getPinList(id, (pinList: pin[]) => {
    res.send(pinList);
  });
});

// Set app to listen on port 3000
app.listen(3000, () => { console.log("server is running on port 3000"); });