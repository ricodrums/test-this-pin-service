/**
 * SQLite module.
 * @module sqlite3
 */

import { PIN_LIST } from "../data/pinList";

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./data/database.db");

db.run('CREATE TABLE IF NOT EXISTS pins (id INTEGER PRIMARY KEY AUTOINCREMENT, value CHAR, hasBeenTried INT);');

// * Run only for reset the data
// for (const pin of PIN_LIST) {
//   db.run('INSERT INTO pins(value, hasBeenTried) VALUES (?, ?);', [pin.value, pin.hasBeenTried]);
// }

module.exports = {
  getPinList: (callback: any) => {
    db.all("SELECT * FROM pins", (err: any, res: any) => {
      callback(res);
    });
  },

  editPin: (id: number, hasBeenTried: string, callback: any) => {
    db.run("UPDATE pins SET hasBeenTried = $hasBeenTried WHERE id = $id", {
      $hasBeenTried: hasBeenTried,
      $id: id,
    }, () => {
      callback();
    });
  },
}