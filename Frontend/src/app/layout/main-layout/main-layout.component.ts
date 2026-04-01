import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      
      <!-- Sidebar -->
      <aside class="w-64 flex-shrink-0 bg-aa-primary flex flex-col transition-all duration-300 shadow-xl z-20">
        <!-- Brand / Logo area -->
        <div class="h-16 flex items-center px-6 bg-slate-900/50 border-b border-white/5">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-aa-secondary to-aa-accent flex items-center justify-center shadow-lg shadow-aa-accent/20">
              <span class="text-white font-bold text-sm tracking-tighter">AA</span>
            </div>
            <span class="text-white font-semibold tracking-wide"> Assunção Advocacia</span>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <!-- Item: Dashboard / Kanban -->
          <a routerLink="/kanban" routerLinkActive="bg-white/10 text-white" 
             class="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors group">
            <svg class="w-5 h-5 mr-3 text-slate-400 group-hover:text-aa-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
            </svg>
            Quadro Kanban
          </a>

          <!-- Item: Novo Lead -->
          <a routerLink="/novo-lead" routerLinkActive="bg-white/10 text-white" 
             class="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors group">
            <svg class="w-5 h-5 mr-3 text-slate-400 group-hover:text-aa-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Nova Captação
          </a>
        </nav>

        <!-- User / Logout area -->
        <div class="p-4 border-t border-white/10">
          <button (click)="logout()" class="flex w-full items-center px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sair da conta
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden relative">
        <!-- Top Header for Context or Breadcrumbs -->
        <header class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-8 flex-shrink-0 z-10 sticky top-0">
          <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
             <span class="px-2 py-1 bg-slate-100 rounded text-slate-600">Módulo Operacional</span>
          </div>
          
          <div class="ml-auto flex items-center gap-4">
            <!-- Notifications or User Profile Avatar can go here -->
             <div class="w-8 h-8 rounded-full bg-aa-accent/10 border border-aa-accent/20 flex items-center justify-center text-aa-accent font-bold text-xs">
                US
             </div>
          </div>
        </header>

        <!-- Router Outlet Container (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-8 relative">
           <!-- Subtle background pattern for depth -->
           <div class="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
           
           <!-- Content -->
           <div class="relative z-10 w-full max-w-7xl mx-auto h-full">
              <router-outlet></router-outlet>
           </div>
        </div>
      </main>

    </div>
  `
})
export class MainLayoutComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
