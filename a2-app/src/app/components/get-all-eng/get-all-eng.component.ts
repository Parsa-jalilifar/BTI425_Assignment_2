import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../../data-manager.service';
import { TermsEnglish } from '../../data-classes';

@Component({
  selector: 'app-get-all-eng',
  templateUrl: './get-all-eng.component.html',
  styleUrls: ['./get-all-eng.component.css']
})
export class GetAllEngComponent implements OnInit {

  constructor(private _DataManagerService: DataManagerService) { }

  // Properties for the class
  termsEng: TermsEnglish[];
  word: string = "";

  ngOnInit(): void {
    this._DataManagerService.getEnglishTerms().subscribe(response => this.termsEng = response);
  }

  // it is responsible to search for English term
  public searchEngTerm() {
    if (this.word.length <= 2)
      this.ngOnInit();
    else
      this._DataManagerService.getEnglishTermByWord(this.word).subscribe(response => this.termsEng = response);
  }

}
