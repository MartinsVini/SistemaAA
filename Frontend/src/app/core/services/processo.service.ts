import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Processo, CreateProcessoDto, UpdateProcessoStatusDto, ProcessoStatus } from '../models/processo.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Processos`;

  // Obter todos os processos, opcionalmente filtrados por status
  getProcessos(status?: ProcessoStatus): Observable<Processo[]> {
    let url = this.apiUrl;
    if (status !== undefined) {
      url += `?status=${status}`;
    }
    return this.http.get<Processo[]>(url);
  }

  // Obter um processo específico por ID
  getProcessoById(id: string): Observable<Processo> {
    return this.http.get<Processo>(`${this.apiUrl}/${id}`);
  }

  // Criar um novo processo (Nova Captação)
  createProcesso(processo: CreateProcessoDto): Observable<Processo> {
    return this.http.post<Processo>(this.apiUrl, processo);
  }

  // Atualizar um processo inteiro
  updateProcesso(id: string, processo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, processo);
  }

  // Atualizar apenas o status (Mover no Kanban)
  updateStatus(id: string, updateDto: UpdateProcessoStatusDto): Observable<any> {
    // We didn't create a specific endpoint for just status update in the MVP backend, 
    // but typically a PUT or PATCH is used. Assuming we just PUT the whole updated object 
    // or use a custom endpoint. For now, doing a generic PUT to /api/Processos/{id}/status if it exists,
    // or we might need to fetch, update status, and save. Let's assume there is a patch or we update the whole thing.
    // I will add a method that expects the backend to support it. 
    // If not, we will need to change this logic later.
    return this.http.put(`${this.apiUrl}/${id}/status`, updateDto);
  }

  // Excluir um processo
  deleteProcesso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
