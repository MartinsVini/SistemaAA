import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcessoService } from '../../../core/services/processo.service';
import { Processo, ProcessoStatus } from '../../../core/models/processo.model';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="h-full flex flex-col">
      <div class="flex justify-between items-end mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Quadro de Processos</h1>
          <p class="text-slate-500 text-sm mt-1">Acompanhe a evolução de todos os processos do escritório.</p>
        </div>
        <a routerLink="/novo-lead" class="bg-aa-primary hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Nova Captação
        </a>
      </div>

      <!-- Board Area -->
      <div class="flex-1 overflow-x-auto pb-4">
        <div class="flex gap-6 h-full min-w-max items-start">
          
          <!-- Columns -->
          <ng-container *ngFor="let column of columns()">
            <div class="w-80 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/50 shadow-sm flex-shrink-0">
              <!-- Column Header -->
              <div class="p-4 border-b border-slate-200/60 bg-white/50 rounded-t-xl backdrop-blur-sm flex justify-between items-center sticky top-0">
                <h3 class="font-semibold text-slate-700">{{ column.title }}</h3>
                <span class="bg-white text-xs font-bold text-slate-500 px-2 py-1 rounded-full shadow-sm border border-slate-100">{{ getProcessesByStatus(column.status).length }}</span>
              </div>
              
              <!-- Column Body (Cards) -->
              <div class="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                
                <!-- Loading State -->
                <div *ngIf="isLoading()" class="animate-pulse space-y-3">
                  <div class="h-24 bg-white/60 rounded-lg border border-slate-100"></div>
                  <div class="h-24 bg-white/60 rounded-lg border border-slate-100"></div>
                </div>

                <!-- Empty State -->
                <div *ngIf="!isLoading() && getProcessesByStatus(column.status).length === 0" class="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                  <span class="text-xs text-slate-400 font-medium">Sem processos</span>
                </div>

                <!-- Cards -->
                <ng-container *ngIf="!isLoading()">
                  <div *ngFor="let p of getProcessesByStatus(column.status)" 
                       class="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-aa-secondary/30 hover:-translate-y-0.5 transition-all group relative">
                    
                    <!-- Decorative line -->
                    <div class="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" [ngClass]="column.colorClass"></div>
                    
                    <div class="pl-1">
                      <div class="text-xs font-medium text-slate-400 mb-1 flex justify-between items-center">
                        <span>{{ p.dataCriacao | date:'shortDate' }}</span>
                        <!-- ID or short code could go here -->
                      </div>
                      <h4 class="font-semibold text-slate-800 text-sm mb-1 leading-tight group-hover:text-aa-primary">{{ p.tipoAcao }}</h4>
                      <p class="text-xs text-slate-500 line-clamp-2 mb-3">{{ p.numeroProcesso ? 'Proc: ' + p.numeroProcesso : 'Sem número de processo' }}</p>
                      
                      <div class="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                        <div class="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                           <svg class="w-3.5 h-3.5 text-aa-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                           <span class="truncate max-w-[120px]">{{ p.clientes?.[0]?.nome || 'Cliente não atribuído' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ng-container>

              </div>
            </div>
          </ng-container>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 10px;
    }
  `]
})
export class KanbanComponent implements OnInit {
  private processoService = inject(ProcessoService);

  processos = signal<Processo[]>([]);
  isLoading = signal<boolean>(true);

  // Define as colunas do Kanban baseadas no enum ProcessoStatus
  columns = signal([
    { title: 'Entrada', status: ProcessoStatus.Entrada, colorClass: 'bg-emerald-400' },
    { title: 'Triagem', status: ProcessoStatus.Triagem, colorClass: 'bg-blue-400' },
    { title: 'Redação Inicial', status: ProcessoStatus.RedacaoInicial, colorClass: 'bg-amber-400' },
    { title: 'Revisão', status: ProcessoStatus.Revisao, colorClass: 'bg-orange-400' },
    { title: 'Protocolado', status: ProcessoStatus.Protocolado, colorClass: 'bg-purple-400' }
  ]);

  ngOnInit(): void {
    this.loadProcessos();
  }

  loadProcessos() {
    this.isLoading.set(true);
    this.processoService.getProcessos().subscribe({
      next: (data) => {
        this.processos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar processos', err);
        // Em um cenário real, exibir um toast toast de erro
        this.isLoading.set(false);
      }
    });
  }

  getProcessesByStatus(status: ProcessoStatus): Processo[] {
    return this.processos().filter(p => p.status === status);
  }
}
