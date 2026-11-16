import { AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
  viewChild, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import type Collapse from 'bootstrap/js/dist/collapse';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private readonly navbarNav = viewChild<ElementRef<HTMLElement>>('navbarNav');
  private collapseInstance: Collapse | null = null;

  // Signal driving the [class.collapsed] and [attr.aria-expanded] on the icon button
  readonly isMenuOpen = signal(false);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const navEl = this.navbarNav()?.nativeElement;
    if (!navEl) return;

    const { default: CollapseClass } = await import('bootstrap/js/dist/collapse');
    this.collapseInstance = CollapseClass.getOrCreateInstance(navEl, { toggle: false });

    // Sync signal state with Bootstrap's actual animation events
    const onShow = () => this.isMenuOpen.set(true);
    const onHide = () => this.isMenuOpen.set(false);

    navEl.addEventListener('show.bs.collapse', onShow);
    navEl.addEventListener('hide.bs.collapse', onHide);

    this.destroyRef.onDestroy(() => {
      navEl.removeEventListener('show.bs.collapse', onShow);
      navEl.removeEventListener('hide.bs.collapse', onHide);
      this.collapseInstance?.dispose();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isMenuOpen() && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.collapseInstance?.toggle();
  }

  closeMenu(): void {
    if (this.isMenuOpen()) {
      this.collapseInstance?.hide();
    }
  }
}
