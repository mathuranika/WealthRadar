import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class Header implements OnInit, OnDestroy {
  menuOpen = false;
  isScrolled = false;

  navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'ti-layout-dashboard' },
    { label: 'Insights', path: '/insights', icon: 'ti-bulb' },
    { label: 'Simulation', path: '/simulation', icon: 'ti-chart-area-line' },
    { label: 'Macro', path: '/sentiment', icon: 'ti-news' },
    { label: 'Alerts', path: '/alerts', icon: 'ti-bell-ringing' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrolled = window.scrollY > 12;
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.cdr.markForCheck();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
