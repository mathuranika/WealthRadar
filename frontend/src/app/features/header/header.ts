import { CommonModule} from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [CommonModule,RouterLink]
})
export class Header implements OnInit, OnDestroy {
  menuOpen = false;
  isScrolled = false;

  navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'ti-layout-dashboard' },
    { label: 'Analytics',  path: '/analytics',  icon: 'ti-chart-line'},
    { label: 'Insights',   path: '/insights',   icon: 'ti-bulb'},
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