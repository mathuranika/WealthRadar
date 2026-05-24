import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio';
import { UploadComponent } from '../upload/upload';

@Component({
  selector:'app-dashboard',
  standalone:true,
  imports:[
    CommonModule,
    UploadComponent
  ],
  templateUrl:'./dashboard.html',
  styleUrl:'./dashboard.scss'
})
export class DashboardComponent implements OnInit{

  portfolioData:any=null;

  constructor(
    public portfolio:PortfolioService
  ){}

  ngOnInit(){

    this.portfolio
      .portfolio$
      .subscribe(data=>{

        if(!data)return;

        this.portfolioData=data;

      });

  }

}