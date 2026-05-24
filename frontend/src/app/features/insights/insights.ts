import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio';

@Component({
  selector: 'app-insights',
  imports: [CommonModule, FormsModule],
  templateUrl: './insights.html',
  styleUrl: './insights.scss',
})
export class Insights implements OnInit {
  readonly question = signal('');

  constructor(public portfolio: PortfolioService) {}

  ngOnInit(): void {
    if (!this.portfolio.hasPortfolio()) {
      this.portfolio.loadPortfolio();
    }
  }

  ask(): void {
    this.portfolio.askPortfolio(this.question());
    this.question.set('');
  }
}
