import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/data-manager.service';
import { ActivatedRoute } from '@angular/router';
import { TermsNonEnglish } from 'src/app/data-classes';

@Component({
  selector: 'app-term-other-detail',
  templateUrl: './term-other-detail.component.html',
  styleUrls: ['./term-other-detail.component.css']
})
export class TermOtherDetailComponent implements OnInit {

  termNon: TermsNonEnglish;
  id = this.route.snapshot.params['id'];

  constructor(private _DataManagerService: DataManagerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._DataManagerService.getOneNonEngById(this.id).subscribe(response => this.termNon = response);
  }

  incrementLikeDefinition(defId: string) {
    this._DataManagerService.incrementLikeDefNon(defId, this.termNon).subscribe(response => this.termNon = response);
  }

  incrementHelpYes() {
    this._DataManagerService.incrementYesNon(this.termNon).subscribe(response => this.termNon = response);
  }

  incrementHelpNo() {
    this._DataManagerService.incrementNoNon(this.termNon).subscribe(response => this.termNon = response);
  }

}
