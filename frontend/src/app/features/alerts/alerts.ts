import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
})
export class Alerts implements OnInit {
  constructor(public portfolio: PortfolioService) {}

  ngOnInit(): void {
    if (!this.portfolio.hasPortfolio()) {
      this.portfolio.loadPortfolio();
    }
  }
}
