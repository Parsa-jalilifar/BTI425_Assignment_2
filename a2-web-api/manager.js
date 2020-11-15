// Data service operations setup
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Loading the schema
const termEnglishSchema = require("./Schemas/termEnglishSchema");
const termNonEnglishSchema = require("./Schemas/termNonEnglishSchema");
const { resolve } = require("path");

// Collection properties, which get their values upon connecting to the database
let termEng;
let termNon;

// ################################################################################
// Define the functions that can be called by server.js

module.exports = {
  /******************************************************************************
   * Initializes Connection to Database                                         *
   ******************************************************************************/
  initialize: function () {
    return new Promise((resolve, reject) => {
      //Set up default mongoose connection
      mongoose.connect(
        "mongodb+srv://pjalilifar:pass1234@assignment6-opghg.mongodb.net/test?retrywrites=true&w=majority",
        {
          dbName: "db-a2",
          connectTimeoutMS: 5000,
          useUnifiedTopology: true,
        }
      );
      //Get the default connection
      var db = mongoose.connection;
      //Bind connection to error event (to get notification of connection errors)
      db.on("error", (error) =>
        console.log("Connection error: ", error.message)
      );
      // Create models from schemas above.
      db.once("open", () => {
        termEng = mongoose.model(
          "TermsEnglish",
          termEnglishSchema,
          "TermsEnglish"
        );
        termNon = mongoose.model(
          "TermsOther",
          termNonEnglishSchema,
          "TermsOther"
        );
        resolve("Connection to the database was successful");
      });
    });
  },

  //##########################################################################################################//
  //##################################### English term requests METHODS ######################################//
  //##########################################################################################################//

  /******************************************************************************
   * Retrieves list of all English terms from the Database                      *
   ******************************************************************************/
  termEngGetAll: function () {
    return new Promise((resolve, reject) => {
      termEng
        .find()
        .sort({ wordEnglish: "asc" })
        .exec((error, items) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(items);
        });
    });
  },

  /******************************************************************************
   * Search the English terms from the Database                                 *
   ******************************************************************************/
  termEngSearch: function (searchKey) {
    return new Promise((resolve, reject) => {
      termEng
        .find({ wordEnglish: new RegExp("^" + searchKey, "i") })
        .sort({ wordEnglish: "asc" })
        .exec((error, items) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(items);
        });
    });
  },

  /******************************************************************************
   * Retrieves individual English Term by ID from the Database                  *
   ******************************************************************************/
  termEngGetById: function (id) {
    return new Promise((resolve, reject) => {
      termEng.findById(id, (error, data) => {
        if (error) {
          return reject(error.message);
        }

        if (data) {
          return resolve(data);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * Retrieves individual English Term by word from the Database                *
   ******************************************************************************/
  termEngGetByWord: function (word) {
    return new Promise((resolve, reject) => {
      termEng.findOne({ wordEnglish: word }, (error, item) => {
        if (error) {
          return reject(error.message);
        }

        if (item) {
          return resolve(item);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * add a new English term to the database                                     *
   ******************************************************************************/
  termEngAdd: function (newItem) {
    return new Promise((resolve, reject) => {
      termEng.create(newItem, (error, item) => {
        if (error) {
          return reject(error.message);
        }

        if (item) {
          return resolve(item);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * Edit and add a definition to an existing English Term from the Database    *
   ******************************************************************************/
  termEngEditAddDef: function (termEngId, definition) {
    return new Promise((resolve, reject) => {
      termEng.updateOne(
        { _id: termEngId },
        { $push: { definitions: definition } },
        (error, item) => {
          if (error) {
            return reject(error.message);
          }

          if (item) {
            return resolve(item);
          } else {
            return reject("Not found");
          }
        }
      );
    });
  },

  /******************************************************************************
   * Increment a term’s “helpYes” counter                                       *
   ******************************************************************************/
  termEngHelpYes: function (Item) {
    return new Promise((resolve, reject) => {
      termEng.findByIdAndUpdate(
        Item._id,
        { helpYes: Item.helpYes + 1 },
        { new: true },
        (error, item) => {
          if (error) {
            return reject(error.message);
          }

          if (item) {
            return resolve(item);
          } else {
            return reject("Not found");
          }
        }
      );
    });
  },

  /******************************************************************************
   * Increment a term’s “helpNo” counter                                        *
   ******************************************************************************/
  termEngHelpNo: function (Item) {
    return new Promise((resolve, reject) => {
      termEng.findByIdAndUpdate(
        Item._id,
        { helpNo: Item.helpNo + 1 },
        { new: true },
        (error, item) => {
          if (error) {
            return reject(error.message);
          }

          if (item) {
            return resolve(item);
          } else {
            return reject("Not found");
          }
        }
      );
    });
  },

  /******************************************************************************
   * Increase the 'Like' counter for a definition                                *
   ******************************************************************************/
  termEngLikes: function (definitionId, Item) {
    return new Promise(function (resolve, reject) {
      termEng.findById(Item._id, (error, item) => {
        if (error) return reject(error.message);

        if (item) {
          for (i = 0; i < item.definitions.length; i++)
            if (item.definitions[i]._id == definitionId)
              item.definitions[i].likes += 1;

          item.save((err) => {
            if (err) return reject("Error Saving");
            else return resolve(item);
          });
        } else {
          return reject("Not found");
        }
      });
    });
  },

  //##########################################################################################################//
  //##################################### Non-English term requests METHODS ##################################//
  //##########################################################################################################//

  /******************************************************************************
   * Retrieves list of all Non-English terms from the Database                  *
   ******************************************************************************/
  termNonGetAll: function () {
    return new Promise((resolve, reject) => {
      termNon
        .find()
        .sort({ wordEnglish: "asc" })
        .exec((error, items) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(items);
        });
    });
  },

  /******************************************************************************
   * Returns all Non_English term with specific termEnglishId from database     *
   ******************************************************************************/
  termNonGetAllByEngId: function (termEngId) {
    return new Promise((resolve, reject) => {
      termNon.find({ termEnglishId: termEngId }).exec((error, items) => {
        if (error) {
          return reject(error.message);
        }
        return resolve(items);
      });
    });
  },

  /******************************************************************************
   * Retrieves individual Non-English Term by ID from the Database              *
   ******************************************************************************/
  termNonGetById: function (id) {
    return new Promise((resolve, reject) => {
      termNon.findById(id, (error, data) => {
        if (error) {
          return reject(error.message);
        }

        if (data) {
          return resolve(data);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * Retrieves individual Non-English Term by word from the Database            *
   ******************************************************************************/
  termNonGetByWord: function (word) {
    return new Promise((resolve, reject) => {
      termNon.findOne({ wordNonEnglish: word }, (error, item) => {
        if (error) {
          return reject(error.message);
        }

        if (item) {
          return resolve(item);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * Add Non-English Term to the Database                                       *
   ******************************************************************************/
  termNonAdd: function (newItem) {
    return new Promise((resolve, reject) => {
      termNon.create(newItem, (error, item) => {
        if (error) {
          return reject(error.message);
        }

        if (item) {
          return resolve(item);
        } else {
          return reject("Not found");
        }
      });
    });
  },

  /******************************************************************************
   * Edit and add a definition to an existing Non-English Term from the Database*
   ******************************************************************************/
  termNonEditAddDef: function (termNonId, definition) {
    return new Promise((resolve, reject) => {
      termNon.updateOne(
        { _id: termNonId },
        { $push: { definitions: definition } },
        (error, item) => {
          if (error) {
            return reject(error.message);
          }

          if (item) {
            return resolve(item);
          } else {
            return reject("Not found");
          }
        }
      );
    });
  },

  /******************************************************************************
   * Increment a term’s “helpYes” counter                                       *
   ******************************************************************************/
  termNonHelpYes: function (Item) {
    return new Promise((resolve, reject) => {
      termNon.findByIdAndUpdate(
        Item._id,
        { helpYes: Item.helpYes + 1 },
        { new: true },
        (error, item) => {
          if (error) {
            return reject(error.message);
          }

          if (item) {
            return resolve(item);
          } else {
            return reject("Not found");
          }
        }
      );
    });
  },

  /******************************************************************************
   * Increment a term’s “helpNo” counter                                        *
   ******************************************************************************/
  termNonHelpNo: function (Item) {
    return new Promise((resolve, reject) => {
      termNon.findByIdAndUpdate(
        Item._id,
        { helpNo: Item.helpNo + 1 },
        { new: true },
        (error, item) => {
          if (error) {
            return reject(error.message);
          }

          if (item) {
            return resolve(item);
          } else {
            return reject("Not found");
          }
        }
      );
    });
  },

  /******************************************************************************
   * Increase the 'Like' counter for a definition                                *
   ******************************************************************************/
  termNonLikes: function (definitionId, Item) {
    return new Promise(function (resolve, reject) {
      termNon.findById(Item._id, (error, item) => {
        if (error) return reject(error.message);

        if (item) {
          for (i = 0; i < item.definitions.length; i++)
            if (item.definitions[i]._id == definitionId)
              item.definitions[i].likes += 1;

          item.save((err) => {
            if (err) return reject("Error Saving");
            else return resolve(item);
          });
        } else {
          return reject("Not found");
        }
      });
    });
  },
}; // end of module.exports
