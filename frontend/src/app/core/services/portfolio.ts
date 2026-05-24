import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';

export interface PipelineStep {
  label: string;
  status: 'complete' | 'warning';
  detail: string;
  count: string;
}

export interface Exposure {
  symbol: string;
  company: string;
  directPct: number;
  mfPct: number;
  totalPct: number;
  note: string;
}

export interface Holding {
  symbol: string;
  name: string;
  sector: string;
  value: number;
  pnlPct: number;
  dayChangePct: number;
}

export interface Concern {
  title: string;
  detail: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface Benchmark {
  name: string;
  finalValue: number;
  returnPct: number;
  cagr: number;
}

export interface SipVerdict {
  fund: string;
  monthlyAmount: number;
  actualXirr: number;
  niftyXirr: number;
  verdict: string;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly apiRoot = '/api';

  readonly loading = signal(false);
  readonly error = signal('');
  readonly pipeline = signal<PipelineStep[]>([]);
  readonly holdings = signal<Holding[]>([]);
  readonly exposures = signal<Exposure[]>([]);
  readonly concerns = signal<Concern[]>([]);
  readonly chat = signal<ChatMessage[]>([]);
  readonly benchmarks = signal<Benchmark[]>([]);
  readonly sips = signal<SipVerdict[]>([]);
  readonly healthSummary = signal('');
  readonly macroImpact = signal('');
  readonly simulationSummary = signal('');
  readonly hasPortfolio = computed(() => this.pipeline().length > 0 || this.holdings().length > 0);

  constructor(private http: HttpClient) {}

  loadPortfolio(): void {
    this.loading.set(true);
    this.error.set('');

    this.http.get<{
      pipeline?: PipelineStep[];
      holdings?: Holding[];
      exposures?: Exposure[];
      concerns?: Concern[];
      benchmarks?: Benchmark[];
      sips?: SipVerdict[];
      healthSummary?: string;
      simulationSummary?: string;
    }>(`${this.apiRoot}/portfolio`).subscribe({
      next: (portfolio) => {
        this.pipeline.set(portfolio.pipeline ?? []);
        this.holdings.set(portfolio.holdings ?? []);
        this.exposures.set(portfolio.exposures ?? []);
        this.concerns.set(portfolio.concerns ?? []);
        this.benchmarks.set(portfolio.benchmarks ?? []);
        this.sips.set(portfolio.sips ?? []);
        this.healthSummary.set(portfolio.healthSummary ?? '');
        this.simulationSummary.set(portfolio.simulationSummary ?? '');
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Portfolio data is not available yet. Upload reports or connect the data service.');
        this.loading.set(false);
      }
    });
  }

  askPortfolio(question: string): void {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    this.chat.update((messages) => [...messages, { role: 'user', text: trimmed }]);

    this.http.post<ChatMessage>(`${this.apiRoot}/chat`, { question: trimmed }).subscribe({
      next: (message) => this.chat.update((messages) => [...messages, message]),
      error: () => {
        this.error.set('Portfolio chat is waiting for a connected reasoning service.');
      }
    });
  }

  loadMacroImpact(): void {
    this.http.get<{ impact: string }>(`${this.apiRoot}/macro-impact`).subscribe({
      next: (response) => this.macroImpact.set(response.impact ?? ''),
      error: () => this.error.set('Macro impact analysis is waiting for a connected market news service.')
    });
  }
}
