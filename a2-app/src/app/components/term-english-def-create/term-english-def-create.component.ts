import { Component, OnInit } from '@angular/core';
import { TermsEnglish, Definition } from 'src/app/data-classes';
import { DataManagerService } from 'src/app/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-term-english-def-create',
  templateUrl: './term-english-def-create.component.html',
  styleUrls: ['./term-english-def-create.component.css']
})
export class TermEnglishDefCreateComponent implements OnInit {

  termsEng: TermsEnglish;
  def: Definition;
  id = this.route.snapshot.params["id"];

  constructor(private _DataManagerService: DataManagerService, private router: Router, private route: ActivatedRoute) {
    this.termsEng = new TermsEnglish();
    this.def = new Definition();
  }

  ngOnInit(): void {
    this._DataManagerService.getEnglishTermById(this.id).subscribe(response => this.termsEng = response);
  }

  saveNewDef(): void {
    this.def.dateCreated = new Date();
    this._DataManagerService.addNewEngDef(this.id, this.def).subscribe(response => this.termsEng = response);
    this.router.navigate([`/termsEnglish/detail/${this.termsEng._id}`]);
  }

  incrementLikeDefinition(defId: string): void {
    this._DataManagerService.incrementLikeDef(defId, this.termsEng).subscribe(response => this.termsEng = response);
  }

}
