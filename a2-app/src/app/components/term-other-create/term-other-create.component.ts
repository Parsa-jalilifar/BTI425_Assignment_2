import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/data-manager.service';
import { TermsEnglish, TermsNonEnglish, Definition } from 'src/app/data-classes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-term-other-create',
  templateUrl: './term-other-create.component.html',
  styleUrls: ['./term-other-create.component.css']
})
export class TermOtherCreateComponent implements OnInit {

  termEng: TermsEnglish;
  termNon: TermsNonEnglish;
  def: Definition;
  id = this.route.snapshot.params["id"];

  constructor(private _DataManagerService: DataManagerService, private route: ActivatedRoute, private router: Router) {
    this.termEng = new TermsEnglish();
    this.termNon = new TermsNonEnglish();
    this.def = new Definition();
  }

  ngOnInit(): void {
    this._DataManagerService.getEnglishTermById(this.id).subscribe(response => this.termEng = response);
  }

  saveTerm(): void {
    this.termNon.dateCreated = new Date();
    this.termNon.dateRevised = new Date();
    this.def.dateCreated = new Date();
    this.termNon.termEnglishId = this.id;
    this.termNon.wordEnglish = this.termEng.wordEnglish;
    this.def.authorName = this.termNon.authorName;
    this.termNon.definitions.push(this.def);

    this._DataManagerService.addNewNonEnglish(this.termNon).subscribe(response => this.termNon = response);
    this.router.navigate([`/termsEnglish/detail/${this.termEng._id}`]);
  }

}
