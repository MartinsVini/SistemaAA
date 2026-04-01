import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { KanbanComponent } from './features/processos/kanban/kanban.component';
import { NovoLeadComponent } from './features/processos/novo-lead/novo-lead.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'kanban', component: KanbanComponent },
      { path: 'novo-lead', component: NovoLeadComponent },
      { path: '', redirectTo: 'kanban', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
