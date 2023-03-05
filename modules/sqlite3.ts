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
  getPinList: (id: number, callback: any) => {
    if (!id || id <= 10) {
      db.all("SELECT * FROM pins LIMIT 101", (err: any, res: any) => {
          callback(res);
        });
      }
    else {
      id-=10;
      db.all("SELECT * FROM pins WHERE id>=? LIMIT 101", [id], (err: any, res: any) => {
        callback(res);
      });
    }
  },

  editPinById: (id: number, hasBeenTried: number, callback: any) => {
    db.run("UPDATE pins SET hasBeenTried=? WHERE id=?",
    [ hasBeenTried, id ], () => {
      callback();
    });
  },

  editPinByValue: (value: string, hasBeenTried: number, callback: any) => {
    db.run("UPDATE pins SET hasBeenTried=? WHERE value=?",
    [ hasBeenTried, value ], () => {
      callback();
    });
  },
}