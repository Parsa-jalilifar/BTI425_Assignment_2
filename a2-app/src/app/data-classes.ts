
export class Definition {

  _id?: String;
  authorName: string;
  dateCreated: Date;
  definition: string;
  quality: number;
  likes: number;

}

export class TermsEnglish {

  _id?: string;
  wordEnglish: string;
  wordNonEnglish: string;
  wordExpanded: string;
  languageCode: string;
  image: string;
  ImageType: string;
  audio: string;
  audioType: string;
  linkAuthoritative: string;
  linkWikipedia: string;
  linkYouTube: string;
  authorName: string;
  dateCreated: Date;
  dateRevised: Date;
  fieldOfStudy: string;
  helpYes: number;
  helpNo: number;
  definitions: Definition[];

  constructor() {
    this.wordEnglish = '';
    this.wordNonEnglish = '';
    this.wordExpanded = '';
    this.languageCode = 'en';
    this.image = '';
    this.ImageType = '';
    this.audio = '';
    this.audioType = '';
    this.linkAuthoritative = '';
    this.linkWikipedia = '';
    this.linkYouTube = '';
    this.authorName = '';
    this.dateCreated = new Date();
    this.dateRevised = new Date();
    this.fieldOfStudy = '';
    this.helpYes = 0;
    this.helpNo = 0;
    this.definitions = [];
  };
}

export class TermsNonEnglish {

  _id?: string;
  wordEnglish: string;
  wordNonEnglish: string;
  wordExpanded: string;
  languageCode: string;
  image: string;
  ImageType: string;
  audio: string;
  audioType: string;
  linkAuthoritative: string;
  linkWikipedia: string;
  linkYouTube: string;
  authorName: string;
  dateCreated: Date;
  dateRevised: Date;
  fieldOfStudy: string;
  helpYes: number;
  helpNo: number;
  definitions: Definition[];
  termEnglishId: string;

  constructor() {
    this.wordEnglish = '';
    this.wordNonEnglish = '';
    this.wordExpanded = '';
    this.languageCode = '';
    this.image = '';
    this.ImageType = '';
    this.audio = '';
    this.audioType = '';
    this.linkAuthoritative = '';
    this.linkWikipedia = '';
    this.linkYouTube = '';
    this.authorName = '';
    this.dateCreated = new Date();
    this.dateRevised = new Date();
    this.fieldOfStudy = '';
    this.helpYes = 0;
    this.helpNo = 0;
    this.definitions = [];
    this.termEnglishId = '';
  };
}
