import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {PortfolioService} from '../../core/services/portfolio';

@Component({
  selector:'app-alerts',
  imports:[CommonModule],
  templateUrl:'./alerts.html',
  styleUrl:'./alerts.scss'
})
export class Alerts{

  constructor(public portfolio:PortfolioService){}

  downloadSummary(){

    const data=this.portfolio.getData();

    if(!data)return;

    const blob=new Blob(
      [JSON.stringify(data,null,2)],
      {type:'application/json'}
    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement('a');

    a.href=url;
    a.download='wealthradar-session.json';

    a.click();

    URL.revokeObjectURL(url);

  }

}