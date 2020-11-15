import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/data-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TermsNonEnglish, Definition } from 'src/app/data-classes';

@Component({
  selector: 'app-term-other-defn-create',
  templateUrl: './term-other-defn-create.component.html',
  styleUrls: ['./term-other-defn-create.component.css']
})
export class TermOtherDefnCreateComponent implements OnInit {

  termNon: TermsNonEnglish;
  def: Definition;
  id = this.route.snapshot.params["id"];

  constructor(private _DataManagerService: DataManagerService, private router: Router, private route: ActivatedRoute) {
    this.termNon = new TermsNonEnglish();
    this.def = new Definition();
  }

  ngOnInit(): void {
    this._DataManagerService.getOneNonEngById(this.id).subscribe(response => this.termNon = response);
  }

  saveNewDef(): void {
    this.def.dateCreated = new Date();
    this._DataManagerService.addNewNonDef(this.id, this.def).subscribe(response => this.termNon = response);
    this.router.navigate([`/termsOther/detail/${this.termNon._id}`]);
  }

  incrementLikeDefinition(defId: string): void {
    this._DataManagerService.incrementLikeDefNon(defId, this.termNon).subscribe(response => this.termNon = response);
  }

}
