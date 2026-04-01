import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProcessoService } from '../../../core/services/processo.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { ParteContrariaService } from '../../../core/services/parte-contraria.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cliente, ParteContraria } from '../../../core/models/processo.model';

@Component({
  selector: 'app-novo-lead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="h-full flex flex-col max-w-4xl mx-auto">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Nova Inicial</h1>
          <p class="text-slate-500 text-sm mt-1">Registre um novo processo inicial.</p>
        </div>
        <a routerLink="/kanban" class="text-sm font-medium text-slate-500 hover:text-aa-primary transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar
        </a>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 relative flex flex-col">
        
        <!-- Progress bar indication -->
        <div class="h-1 w-full bg-slate-100">
          <div class="h-full bg-aa-accent" [style.width]="getFormProgress() + '%'"></div>
        </div>

        <div class="p-8 flex-1 overflow-y-auto">
          
          <!-- NOVO CLIENTE FORM -->
          <form *ngIf="formState() === 'cliente'" [formGroup]="clientForm" (ngSubmit)="onSaveClient()" class="space-y-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-aa-secondary/10 text-aa-secondary flex items-center justify-center text-xs">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </span>
                Cadastrar Novo Cliente
              </h3>
              <button type="button" (click)="cancelCreation()" class="text-sm text-slate-500 hover:text-red-500 font-medium">Cancelar</button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 mb-1">Nome Completo <span class="text-red-500">*</span></label>
                <input type="text" formControlName="nome" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">E-mail <span class="text-red-500">*</span></label>
                <input type="email" formControlName="email" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">CPF/CNPJ <span class="text-red-500">*</span></label>
                <input type="text" formControlName="cpfCnpj" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                <input type="text" formControlName="telefone" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
                <input type="text" formControlName="endereco" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
            </div>

            <div class="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" (click)="cancelCreation()" class="px-5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">Cancelar</button>
              <button type="submit" [disabled]="clientForm.invalid || isSubmittingClient()" class="px-5 py-2 rounded-lg text-sm font-medium text-white bg-aa-secondary hover:bg-opacity-90 transition-colors shadow-sm disabled:opacity-70">
                {{ isSubmittingClient() ? 'Salvando...' : 'Salvar Cliente' }}
              </button>
            </div>
          </form>

          <!-- NOVA PARTE CONTRÁRIA FORM -->
          <form *ngIf="formState() === 'parteContraria'" [formGroup]="parteContrariaForm" (ngSubmit)="onSaveParteContraria()" class="space-y-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-aa-secondary/10 text-aa-secondary flex items-center justify-center text-xs">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </span>
                Cadastrar Nova Parte Contrária
              </h3>
              <button type="button" (click)="cancelCreation()" class="text-sm text-slate-500 hover:text-red-500 font-medium">Cancelar</button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 mb-1">Nome / Razão Social <span class="text-red-500">*</span></label>
                <input type="text" formControlName="nome" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">CPF/CNPJ <span class="text-red-500">*</span></label>
                <input type="text" formControlName="cnpjCpf" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Tipo <span class="text-red-500">*</span></label>
                <select formControlName="tipo" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all bg-white">
                  <option value="Comum">Comum</option>
                  <option value="Bancário">Bancário</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Setor</label>
                <input type="text" formControlName="setor" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-700 mb-1">Observações</label>
                <textarea formControlName="observacoes" rows="2" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300 resize-none"></textarea>
              </div>
            </div>

            <div class="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" (click)="cancelCreation()" class="px-5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">Cancelar</button>
              <button type="submit" [disabled]="parteContrariaForm.invalid || isSubmittingParteContraria()" class="px-5 py-2 rounded-lg text-sm font-medium text-white bg-aa-secondary hover:bg-opacity-90 transition-colors shadow-sm disabled:opacity-70">
                {{ isSubmittingParteContraria() ? 'Salvando...' : 'Salvar Parte Contrária' }}
              </button>
            </div>
          </form>

          <!-- PROCESSO FORM (Nova Inicial) -->
          <form *ngIf="formState() === 'lead'" [formGroup]="leadForm" (ngSubmit)="onSubmit()" class="flex flex-col h-full">
            
            <div class="space-y-8 flex-1">
              
              <!-- Section 1: Dados da Causa -->
              <div>
                <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-aa-primary/10 text-aa-primary flex items-center justify-center text-xs">1</span>
                  Nova Inicial
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <!-- Dropdown de Cliente e Botão Adicionar -->
                  <div class="md:col-span-2 relative">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Cliente <span class="text-red-500">*</span></label>
                    <div class="flex items-center gap-3">
                      <!-- Input wrapper for autocomplete -->
                      <div class="relative flex-1 autocomplete-wrapper" (document:click)="closeDropdown($event)">
                        <input type="text" 
                               formControlName="clienteSearch" 
                               (focus)="showDropdown()"
                               class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300" 
                               placeholder="Busque por nome do cliente...">
                        
                        <!-- Autocomplete Dropdown -->
                        <div *ngIf="isClienteDropdownOpen() && filteredClientes().length > 0" class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          <ul class="py-1">
                            <li *ngFor="let c of filteredClientes()" 
                                (click)="selectCliente(c)" 
                                class="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm font-medium text-slate-700 border-b border-slate-100 last:border-0">
                              {{ c.nome }} <span class="text-xs text-slate-400 font-normal block">{{ c.cpfCnpj }}</span>
                            </li>
                          </ul>
                        </div>
                        <div *ngIf="isClienteDropdownOpen() && filteredClientes().length === 0 && leadForm.get('clienteSearch')?.value" class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-sm text-slate-500">
                          Nenhum cliente encontrado com "{{ leadForm.get('clienteSearch')?.value }}".
                        </div>
                        <div *ngIf="isClienteDropdownOpen() && filteredClientes().length === 0 && !leadForm.get('clienteSearch')?.value" class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-sm text-slate-500">
                          Nenhum cliente cadastrado ainda. Clique em "Novo" para adicionar.
                        </div>
                      </div>

                      <button type="button" (click)="startCreateClient()" class="shrink-0 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-aa-primary font-medium text-sm rounded-lg transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Novo
                      </button>
                    </div>
                    <p *ngIf="isInvalid('clienteId')" class="text-xs text-red-500 mt-1">O cliente é obrigatório. Selecione um na lista.</p>
                  </div>

                  <!-- Dropdown de Parte Contraria -->
                  <div class="md:col-span-2 relative">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Parte Contrária</label>
                    <div class="flex items-center gap-3">
                      <!-- Input wrapper for autocomplete -->
                      <div class="relative flex-1 autocomplete-wrapper-pc" (document:click)="closePcDropdown($event)">
                        <input type="text" 
                               formControlName="parteContrariaSearch" 
                               (focus)="showPcDropdown()"
                               class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300" 
                               placeholder="Busque por parte contrária... (Opcional)">
                        
                        <!-- Autocomplete Dropdown -->
                        <div *ngIf="isParteContrariaDropdownOpen() && filteredPartesContrarias().length > 0" class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          <ul class="py-1">
                            <li *ngFor="let pc of filteredPartesContrarias()" 
                                (click)="selectParteContraria(pc)" 
                                class="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm font-medium text-slate-700 border-b border-slate-100 last:border-0">
                              {{ pc.nome }} <span class="text-xs text-slate-400 font-normal block">{{ pc.cnpjCpf }}</span>
                            </li>
                          </ul>
                        </div>
                        <div *ngIf="isParteContrariaDropdownOpen() && filteredPartesContrarias().length === 0 && leadForm.get('parteContrariaSearch')?.value" class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-sm text-slate-500">
                          Nenhuma parte contrária encontrada com "{{ leadForm.get('parteContrariaSearch')?.value }}".
                        </div>
                        <div *ngIf="isParteContrariaDropdownOpen() && filteredPartesContrarias().length === 0 && !leadForm.get('parteContrariaSearch')?.value" class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-sm text-slate-500">
                          Nenhuma parte contrária cadastrada ainda. Clique em "Novo" para adicionar.
                        </div>
                      </div>

                      <button type="button" (click)="startCreateParteContraria()" class="shrink-0 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-aa-primary font-medium text-sm rounded-lg transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Novo
                      </button>
                    </div>
                  </div>

                  <!-- Título da Causa -->
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Título / Resumo do Caso <span class="text-red-500">*</span></label>
                    <input type="text" formControlName="titulo" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300" placeholder="Ex: Ação Trabalhista - Horas Extras">
                    <p *ngIf="isInvalid('titulo')" class="text-xs text-red-500 mt-1">O título é obrigatório.</p>
                  </div>
                </div>
              </div>

              <hr class="border-slate-100">

              <!-- Section 2: Detalhes do Processo -->
              <div>
                <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-aa-primary/10 text-aa-primary flex items-center justify-center text-xs">2</span>
                  Detalhes do Processo <span class="text-xs font-normal text-slate-500 ml-2">(Opcional)</span>
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Número do Processo (CNJ)</label>
                    <input type="text" formControlName="numeroProcesso" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300" placeholder="0000000-00.0000.0.00.0000">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Fase do Processo</label>
                    <select formControlName="faseDoProcesso" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all bg-white">
                      <option value="">Selecione...</option>
                      <option value="Conhecimento">Conhecimento</option>
                      <option value="Recursal">Recursal</option>
                      <option value="Execução">Execução</option>
                      <option value="Arquivado">Arquivado</option>
                    </select>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Vara do Trabalho / Fórum</label>
                    <input type="text" formControlName="varaDoTrabalho" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">UF</label>
                    <input type="text" formControlName="uf" maxlength="2" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300 uppercase">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Valor da Causa (R$)</label>
                    <input type="number" step="0.01" formControlName="valorCausa" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all placeholder:text-slate-300">
                  </div>
                </div>
              </div>

              <hr class="border-slate-100">

              <!-- Section 3: Dados Trabalhistas -->
              <div>
                <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-aa-primary/10 text-aa-primary flex items-center justify-center text-xs">3</span>
                  Dados Trabalhistas <span class="text-xs font-normal text-slate-500 ml-2">(Opcional)</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Data de Admissão</label>
                    <input type="date" formControlName="admissao" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Data de Demissão</label>
                    <input type="date" formControlName="demissao" class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-aa-accent/50 outline-none transition-all">
                  </div>
                  <div class="flex items-center gap-3 pb-3">
                    <input type="checkbox" id="sindicato" formControlName="sindicato" class="w-5 h-5 text-aa-primary bg-slate-50 border-slate-300 rounded focus:ring-aa-accent transition-all cursor-pointer">
                    <label for="sindicato" class="text-sm font-medium text-slate-700 cursor-pointer select-none">Assistência Sindical?</label>
                  </div>
                </div>
              </div>

              <hr class="border-slate-100">

              <!-- Section 4: Upload de Documentos Iniciais -->
              <div>
                <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-aa-primary/10 text-aa-primary flex items-center justify-center text-xs">4</span>
                  Documentos Iniciais <span class="text-xs font-normal text-slate-500 ml-2">(Max 5 arquivos, opcional)</span>
                </h3>
                
                <div 
                  class="border-2 border-dashed rounded-xl p-8 text-center transition-all bg-slate-50/50"
                  [ngClass]="{'border-aa-secondary bg-aa-secondary/5': isDragging()}"
                  (dragover)="onDragOver($event)" 
                  (dragleave)="onDragLeave($event)" 
                  (drop)="onDrop($event)">
                  
                  <svg class="mx-auto h-12 w-12 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  
                  <p class="text-sm text-slate-600 mb-1">Arraste e solte arquivos aqui, ou</p>
                  <label class="cursor-pointer text-aa-accent hover:text-aa-primary font-medium text-sm transition-colors">
                    <span>selecione no seu computador</span>
                    <input type="file" multiple class="hidden" (change)="onFileSelected($event)" accept=".pdf,.doc,.docx,.jpg,.png">
                  </label>
                </div>

                <!-- File List Preview -->
                <div *ngIf="selectedFiles().length > 0" class="mt-4 space-y-2">
                  <div *ngFor="let file of selectedFiles(); let i = index" class="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div class="flex items-center gap-3 overflow-hidden">
                      <svg class="w-6 h-6 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <div class="truncate">
                        <p class="text-sm font-medium text-slate-700 truncate">{{ file.name }}</p>
                        <p class="text-xs text-slate-500">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
                      </div>
                    </div>
                    <button type="button" (click)="removeFile(i)" class="text-slate-400 hover:text-red-500 p-1 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </div>
                <p *ngIf="fileError()" class="text-xs text-red-500 mt-2">{{ fileError() }}</p>

              </div>

            </div>

            <!-- Bottom Actions inside the scroll area to keep it part of the form flow -->
            <div class="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3 mt-auto">
              <button type="button" routerLink="/kanban" class="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 border border-transparent transition-colors">
                Cancelar
              </button>
              <button type="submit" [disabled]="leadForm.invalid || isSubmitting()" class="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-aa-primary hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2">
                <span *ngIf="!isSubmitting()">Salvar Captação</span>
                <span *ngIf="isSubmitting()">Salvando...</span>
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  `
})
export class NovoLeadComponent implements OnInit {
  private fb = inject(FormBuilder);
  private processoService = inject(ProcessoService);
  private clienteService = inject(ClienteService);
  private parteContrariaService = inject(ParteContrariaService);
  private router = inject(Router);
  private http = inject(HttpClient);

  // --- Forms ---
  leadForm: FormGroup = this.fb.group({
    clienteSearch: [''],
    clienteId: ['', Validators.required],
    parteContrariaSearch: [''],
    parteContrariaId: [''],
    titulo: ['', Validators.required],
    numeroProcesso: [''],
    faseDoProcesso: [''],
    varaDoTrabalho: [''],
    uf: [''],
    valorCausa: [null],
    admissao: [''],
    demissao: [''],
    sindicato: [false]
  });

  clientForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpfCnpj: ['', Validators.required],
    telefone: [''],
    endereco: ['']
  });

  parteContrariaForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    cnpjCpf: ['', Validators.required],
    tipo: ['Comum', Validators.required],
    setor: [''],
    observacoes: ['']
  });

  // --- States ---
  formState = signal<'lead' | 'cliente' | 'parteContraria'>('lead');
  isSubmitting = signal(false);
  isSubmittingClient = signal(false);
  isSubmittingParteContraria = signal(false);

  // Clientes Autocomplete State
  clientes = signal<Cliente[]>([]);
  filteredClientes = signal<Cliente[]>([]);
  isClienteDropdownOpen = signal(false);

  // Parte Contraria Autocomplete State
  partesContrarias = signal<ParteContraria[]>([]);
  filteredPartesContrarias = signal<ParteContraria[]>([]);
  isParteContrariaDropdownOpen = signal(false);

  // Drag and Drop Upload State
  isDragging = signal(false);
  selectedFiles = signal<File[]>([]);
  fileError = signal('');

  ngOnInit() {
    this.fetchClientes();
    this.fetchPartesContrarias();

    // Autocomplete filter logic for Clientes
    this.leadForm.get('clienteSearch')?.valueChanges.subscribe(value => {
      const term = (value || '').toLowerCase();

      const currentSelectedClient = this.clientes().find(c => c.id === this.leadForm.get('clienteId')?.value);
      if (currentSelectedClient && currentSelectedClient.nome !== value) {
        this.leadForm.patchValue({ clienteId: '' }, { emitEvent: false });
      }

      this.filteredClientes.set(
        this.clientes().filter(c =>
          c.nome.toLowerCase().includes(term) ||
          c.cpfCnpj.includes(term)
        )
      );
    });

    // Autocomplete filter logic for Partes Contrarias
    this.leadForm.get('parteContrariaSearch')?.valueChanges.subscribe(value => {
      const term = (value || '').toLowerCase();

      const currentSelectedPc = this.partesContrarias().find(pc => pc.id === this.leadForm.get('parteContrariaId')?.value);
      if (currentSelectedPc && currentSelectedPc.nome !== value) {
        this.leadForm.patchValue({ parteContrariaId: '' }, { emitEvent: false });
      }

      this.filteredPartesContrarias.set(
        this.partesContrarias().filter(pc =>
          pc.nome.toLowerCase().includes(term) ||
          pc.cnpjCpf.includes(term)
        )
      );
    });
  }

  fetchClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.filteredClientes.set(data);
      },
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  fetchPartesContrarias() {
    this.parteContrariaService.getPartesContrarias().subscribe({
      next: (data) => {
        this.partesContrarias.set(data);
        this.filteredPartesContrarias.set(data);
      },
      error: (err) => console.error('Erro ao carregar partes contrárias', err)
    });
  }

  // --- Autocomplete Interactions ---
  // CLIENTES
  showDropdown() {
    this.isClienteDropdownOpen.set(true);
    this.isParteContrariaDropdownOpen.set(false);
  }

  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-wrapper')) {
      this.isClienteDropdownOpen.set(false);
    }
  }

  selectCliente(cliente: Cliente) {
    this.leadForm.patchValue({
      clienteSearch: cliente.nome,
      clienteId: cliente.id
    });
    this.isClienteDropdownOpen.set(false);
  }

  // PARTES CONTRÁRIAS
  showPcDropdown() {
    this.isParteContrariaDropdownOpen.set(true);
    this.isClienteDropdownOpen.set(false);
  }

  closePcDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-wrapper-pc')) {
      this.isParteContrariaDropdownOpen.set(false);
    }
  }

  selectParteContraria(pc: ParteContraria) {
    this.leadForm.patchValue({
      parteContrariaSearch: pc.nome,
      parteContrariaId: pc.id
    });
    this.isParteContrariaDropdownOpen.set(false);
  }

  // --- Creation UI Controls ---
  startCreateClient() {
    this.clientForm.reset();
    this.formState.set('cliente');
    this.isClienteDropdownOpen.set(false);
  }

  startCreateParteContraria() {
    this.parteContrariaForm.reset({ tipo: 'Comum' });
    this.formState.set('parteContraria');
    this.isParteContrariaDropdownOpen.set(false);
  }

  cancelCreation() {
    this.formState.set('lead');
  }

  onSaveClient() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.isSubmittingClient.set(true);
    this.clienteService.createCliente(this.clientForm.value).subscribe({
      next: (novoCliente) => {
        const currentList = this.clientes();
        this.clientes.set([...currentList, novoCliente]);
        this.selectCliente(novoCliente);

        this.isSubmittingClient.set(false);
        this.formState.set('lead');
      },
      error: (err) => {
        console.error('Erro ao criar cliente', err);
        this.isSubmittingClient.set(false);
      }
    });
  }

  onSaveParteContraria() {
    if (this.parteContrariaForm.invalid) {
      this.parteContrariaForm.markAllAsTouched();
      return;
    }

    this.isSubmittingParteContraria.set(true);
    this.parteContrariaService.createParteContraria(this.parteContrariaForm.value).subscribe({
      next: (novoPc) => {
        const currentList = this.partesContrarias();
        this.partesContrarias.set([...currentList, novoPc]);
        this.selectParteContraria(novoPc);

        this.isSubmittingParteContraria.set(false);
        this.formState.set('lead');
      },
      error: (err) => {
        console.error('Erro ao criar parte contrária', err);
        this.isSubmittingParteContraria.set(false);
      }
    });
  }

  // --- Lead Form Properties ---
  getFormProgress(): number {
    let progress = 0;
    if (this.leadForm.get('clienteId')?.value) progress += 20;
    if (this.leadForm.get('titulo')?.value) progress += 20;
    if (this.leadForm.get('numeroProcesso')?.value) progress += 10;
    if (this.leadForm.get('faseDoProcesso')?.value) progress += 10;
    if (this.selectedFiles().length > 0) progress += 40;
    return Math.min(progress, 100);
  }

  isInvalid(field: string): boolean {
    const ctrl = this.leadForm.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  // --- File Drag & Drop Handlers ---
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      this.handleFiles(Array.from(event.target.files));
    }
  }

  handleFiles(files: File[]) {
    this.fileError.set('');
    const currentFiles = [...this.selectedFiles()];

    if (currentFiles.length + files.length > 5) {
      this.fileError.set('No máximo 5 anexos permitidos.');
      return;
    }

    this.selectedFiles.set([...currentFiles, ...files]);
  }

  removeFile(index: number) {
    const files = [...this.selectedFiles()];
    files.splice(index, 1);
    this.selectedFiles.set(files);
    this.fileError.set('');
  }

  // --- API Submission (Processo) ---
  onSubmit() {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formValues = this.leadForm.value;

    const createPayload: any = {
      tipoAcao: formValues.titulo,
      numeroProcesso: formValues.numeroProcesso || undefined,
      faseDoProcesso: formValues.faseDoProcesso || undefined,
      varaDoTrabalho: formValues.varaDoTrabalho || undefined,
      uf: formValues.uf ? formValues.uf.toUpperCase() : undefined,
      valorCausa: formValues.valorCausa || undefined,
      admissao: formValues.admissao || undefined,
      demissao: formValues.demissao || undefined,
      sindicato: formValues.sindicato || false,
      clienteIds: [formValues.clienteId],
      parteContrariaIds: formValues.parteContrariaId ? [formValues.parteContrariaId] : [],
      captadorId: '00000000-0000-0000-0000-000000000000', // Default GUID caso não tenha auth na store
      responsavelId: '00000000-0000-0000-0000-000000000000'
    };

    this.processoService.createProcesso(createPayload).subscribe({
      next: (processo) => {
        if (this.selectedFiles().length > 0) {
          this.uploadFiles(processo.id);
        } else {
          this.router.navigate(['/kanban']);
        }
      },
      error: (err) => {
        console.error('Erro ao criar processo', err);
        this.isSubmitting.set(false);
      }
    });
  }

  uploadFiles(processoId: string) {
    const formData = new FormData();
    this.selectedFiles().forEach(f => {
      formData.append('arquivos', f);
    });

    this.http.post(`${environment.apiUrl}/Processos/${processoId}/documentos`, formData)
      .subscribe({
        next: () => {
          this.router.navigate(['/kanban']);
        },
        error: (err) => {
          console.error('Erro ao fazer upload dos arquivos', err);
          this.router.navigate(['/kanban']);
        }
      });
  }
}
