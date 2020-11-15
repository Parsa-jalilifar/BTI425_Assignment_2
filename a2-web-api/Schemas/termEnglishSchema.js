// Setup
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definitionSchema = require("./definitionSchema");

// English Term Schema
var termEnglishSchema = new Schema({
  wordEnglish: { type: String, required: true, unique: true },
  wordNonEnglish: String,
  wordExpanded: { type: String, default: "" },
  languageCode: { type: String, required: true },
  image: { type: String, default: "" },
  imageType: { type: String, default: "" },
  audio: { type: String, default: "" },
  audioType: { type: String, default: "" },
  linkAuthoritative: { type: String, default: "" },
  linkWikipedia: { type: String, default: "" },
  linkYouTube: { type: String, default: "" },
  authorName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateRevised: { type: Date, default: Date.now },
  fieldOfStudy: { type: String, default: "" },
  helpYes: { type: Number, default: 0 },
  helpNo: { type: Number, default: 0 },
  definitions: [definitionSchema],
});

// Make schema available to the application
module.exports = termEnglishSchema;
