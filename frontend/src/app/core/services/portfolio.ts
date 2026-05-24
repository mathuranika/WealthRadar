import { Injectable,signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PortfolioService{

  private portfolioSubject=new BehaviorSubject<any>(null);
  portfolio$=this.portfolioSubject.asObservable();
  private data=signal<any>(null);

  setPortfolio(data:any){
    this.data.set(data);
    this.portfolioSubject.next(data);
  }

  hasPortfolio(){return !!this.data();}
  loading(){return false;}
  loadPortfolio(){}

  holdings():any[]{return this.data()?.holdings||[];}

  pipeline():any[]{
    if(!this.data())return[];
    return [{
      label:'Excel Parsed',
      detail:`${this.holdings().length} holdings loaded`,
      count:'OK',
      status:'success'
    }];
  }

  healthSummary():string{
    if(!this.data())return'';
    const s=this.data().summary;
    return `Invested ₹${s?.invested} | Current ₹${s?.current_value} | PnL ₹${s?.pnl}`;
  }

  concerns():any[]{
    if(!this.data())return[];
    return [{
      title:'Portfolio Snapshot',
      detail:`XIRR ${this.data()?.summary?.xirr}`,
      severity:'medium'
    }];
  }

  chat():any[]{return[];}
  askPortfolio(question:string){}

  macroImpact():string{return'';}
  loadMacroImpact(){}

  exposures():any[]{return[];}

  benchmarks():any[]{
    return [];
  }

  sips():any[]{
    return [];
  }

  simulationSummary():string{return'';}
  error():string{return'';}

}