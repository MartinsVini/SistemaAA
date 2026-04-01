import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <!-- Decorativos de fundo em estilo Glassmorphism -->
      <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-aa-accent/20 blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-aa-secondary/20 blur-[100px]"></div>

      <div class="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 z-10">
        
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold tracking-tight text-aa-primary mb-2">Sistema AA</h1>
          <p class="text-sm text-slate-500">Faça login para gerir os seus processos.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              class="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-aa-accent/50 focus:border-aa-accent transition-all outline-none text-sm placeholder:text-slate-400"
              placeholder="exemplo@advogados.pt"
            />
            <p *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="text-xs text-red-500 mt-1">
              Inserir um email válido.
            </p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="password" class="block text-sm font-medium text-slate-700">Senha</label>
            </div>
            <input 
              type="password" 
              id="password"
              formControlName="password" 
              class="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-aa-accent/50 focus:border-aa-accent transition-all outline-none text-sm placeholder:text-slate-400"
              placeholder="••••••••"
            />
            <p *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="text-xs text-red-500 mt-1">
              A senha é obrigatória.
            </p>
          </div>

          <div *ngIf="errorMessage" class="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm text-center">
            {{ errorMessage }}
          </div>

          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading"
            class="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-aa-primary hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]">
            <span *ngIf="!isLoading">Entrar</span>
            <svg *ngIf="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>

      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          // Router navigation is handled in the AuthService
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
          console.error(err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
