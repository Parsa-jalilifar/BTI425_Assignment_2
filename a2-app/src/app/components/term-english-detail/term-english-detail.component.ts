import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/data-manager.service';
import { ActivatedRoute } from '@angular/router';
import { TermsEnglish, Definition, TermsNonEnglish } from 'src/app/data-classes';

@Component({
  selector: 'app-term-english-detail',
  templateUrl: './term-english-detail.component.html',
  styleUrls: ['./term-english-detail.component.css']
})
export class TermEnglishDetailComponent implements OnInit {

  constructor(private _DataManagerService: DataManagerService, private route: ActivatedRoute) {
    this.termsEng = new TermsEnglish();
  }

  termsEng: TermsEnglish;
  translations: TermsNonEnglish[];
  id = this.route.snapshot.params["id"];


  ngOnInit(): void {
    this._DataManagerService.getEnglishTermById(this.id).subscribe(response => this.termsEng = response);
    this._DataManagerService.getAllNonEngByEngId(this.id).subscribe(response => this.translations = response);
  }

  incrementLikeDefinition(defId: string) {
    this._DataManagerService.incrementLikeDef(defId, this.termsEng).subscribe(response => this.termsEng = response);
  }

  incrementHelpYes() {
    this._DataManagerService.incrementYesEng(this.termsEng).subscribe(response => this.termsEng = response);
  }

  incrementHelpNo() {
    this._DataManagerService.incrementNoEng(this.termsEng).subscribe(response => this.termsEng = response);
  }

}
