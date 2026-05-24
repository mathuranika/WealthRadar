import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio';
import {DomSanitizer,SafeHtml} from '@angular/platform-browser';
import {marked} from 'marked';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-insights',
  imports: [CommonModule, FormsModule],
  templateUrl: './insights.html',
  styleUrl: './insights.scss',
})
export class Insights implements OnInit {
  readonly question = signal('');

  constructor(public portfolio: PortfolioService, private sanitizer:DomSanitizer ) {}

  ngOnInit(): void {
    if (!this.portfolio.hasPortfolio()) {
      this.portfolio.loadPortfolio();
    }
  }

  renderMarkdown(text:string):SafeHtml{

    const html=marked.parse(text) as string;

    return this.sanitizer.bypassSecurityTrustHtml(
      DOMPurify.sanitize(html)
    );

  }

  ask(): void {
    this.portfolio.askPortfolio(this.question());
    this.question.set('');
  }
}
