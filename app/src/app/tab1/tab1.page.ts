import { Component } from '@angular/core';
import { CandidateService } from '../services/bulbs.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public status:number;
  public title:string;

  constructor(
    private candidateService:CandidateService
  ) {}

  ionViewWillEnter(){
    this.candidateService.info().subscribe(res =>{
      this.status = res.light_state.on_off;
      this.title = res.alias;
      console.log(res)
    });
  }

  clickBulb(status){
    this.status = status;
    this.candidateService.index(this.status).subscribe(res =>{
      console.log(res)
    })
  }
}
