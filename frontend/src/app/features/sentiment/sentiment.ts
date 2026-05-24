import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio';

@Component({
  selector: 'app-sentiment',
  imports: [CommonModule],
  templateUrl: './sentiment.html',
  styleUrl: './sentiment.scss',
})
export class Sentiment implements OnInit {
  constructor(public portfolio: PortfolioService) {}

  ngOnInit(): void {
    if (!this.portfolio.hasPortfolio()) {
      this.portfolio.loadPortfolio();
    }
  }

  analyseMacro(): void {
    this.portfolio.loadMacroImpact();
  }
}
