import {Injectable,signal,inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api';

@Injectable({providedIn:'root'})
export class PortfolioService{

  private api=inject(ApiService);
  private messages=signal<any[]>([]);
  private portfolioSubject=new BehaviorSubject<any>(null);

  portfolio$=this.portfolioSubject.asObservable();

  private data=signal<any>(null);
  private concernsSignal=signal<any[]>([]);

  setPortfolio(response:any){

    this.data.set(response);

    this.concernsSignal.set(
      response.concerns||[]
    );

    this.portfolioSubject.next(response);

  }

  hasPortfolio(){
    return !!this.data();
  }

  loading(){
    return false;
  }

  loadPortfolio(){}

  holdings():any[]{
    return this.data()?.holdings||[];
  }

  pipeline():any[]{

    if(!this.data())return[];

    return[{
      label:'Excel Parsed',
      detail:`${this.holdings().length} holdings loaded`,
      count:'OK',
      status:'success'
    }];

  }

  healthSummary():string{

    if(!this.data())return'';

    const s=this.data()?.summary;

    return `Invested ₹${s?.invested} | Current ₹${s?.current_value} | PnL ₹${s?.pnl}`;

  }

  concerns():any[]{
    return this.concernsSignal();
  }

  chat():any[]{
    return this.messages();
  }

  askPortfolio(question:string){

    if(!question.trim())return;

    this.messages.update(m=>[
      ...m,
      {role:'user',text:question}
    ]);

    const payload={
      question:question,
      holdings:Array.isArray(this.holdings())?this.holdings():[],
      summary:this.data()?.summary||{}
    };

    this.api.chat(payload).subscribe({

      next:(response:any)=>{

        this.messages.update(m=>[
          ...m,
          {
            role:'assistant',
            text:response.answer
          }
        ]);

      },

      error:(err)=>{

        console.error('CHAT ERROR',err);

        this.messages.update(m=>[
          ...m,
          {
            role:'assistant',
            text:'Unable to analyse portfolio right now.'
          }
        ]);

      }

    });

  }

  macroImpact():string{
    return'';
  }

  loadMacroImpact(){}

  exposures():any[]{
    return[];
  }

  benchmarks():any[]{
    return[];
  }

  getData(){
    return this.data();
  }

  sips():any[]{
    return[];
  }

  simulationSummary():string{
    return'';
  }

  error():string{
    return'';
  }

}