import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio';
import { UploadComponent } from '../upload/upload';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, UploadComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  constructor(public portfolio: PortfolioService) {}

  ngOnInit(): void {
    this.portfolio.loadPortfolio();
  }
}
