import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio';

@Component({
  selector: 'app-simulation',
  imports: [CommonModule],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation implements OnInit {
  constructor(public portfolio: PortfolioService) {}

  ngOnInit(): void {
    if (!this.portfolio.hasPortfolio()) {
      this.portfolio.loadPortfolio();
    }
  }
}
