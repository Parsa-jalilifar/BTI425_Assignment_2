import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/data-manager.service';
import { TermsEnglish, Definition } from 'src/app/data-classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-english-create',
  templateUrl: './term-english-create.component.html',
  styleUrls: ['./term-english-create.component.css']
})
export class TermEnglishCreateComponent implements OnInit {

  constructor(private _DataManagerService: DataManagerService, private router: Router) { }

  term: TermsEnglish;
  def: Definition;

  ngOnInit(): void {
    this.term = new TermsEnglish();
    this.def = new Definition();
  }

  saveTerm(): void {
    this.term.dateCreated = new Date();
    this.term.dateRevised = new Date();
    this.def.dateCreated = new Date();
    this.def.authorName = this.term.authorName;
    this.term.definitions.push(this.def);

    this._DataManagerService.addNewEnglishTerm(this.term).subscribe(response => this.term = response);
    this.router.navigate(['/termsEnglish']);
  }

}
