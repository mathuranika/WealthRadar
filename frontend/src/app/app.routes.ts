import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { Insights } from './features/insights/insights';
import { Simulation } from './features/simulation/simulation';
import { Alerts } from './features/alerts/alerts';
import { Sentiment } from './features/sentiment/sentiment';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'insights', component: Insights },
  { path: 'simulation', component: Simulation },
  { path: 'sentiment', component: Sentiment },
  { path: 'alerts', component: Alerts },
  { path: '**', redirectTo: 'dashboard' }
];
