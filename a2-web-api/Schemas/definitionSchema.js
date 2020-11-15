// Setup
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definition Schema
var definitionSchema = new Schema({
  authorName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  definition: { type: String, required: true },
  quality: { type: Number, default: -1 },
  likes: { type: Number, default: 0 },
  termId: {
    type: Schema.Types.ObjectId,
    ref: "TermsEnglish",
  },
});

// Make schema available to the application
module.exports = definitionSchema;
