import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ParteContraria } from '../models/processo.model';

@Injectable({
  providedIn: 'root'
})
export class ParteContrariaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/PartesContrarias`;

  getPartesContrarias(): Observable<ParteContraria[]> {
    return this.http.get<ParteContraria[]>(this.apiUrl);
  }

  getParteContrariaById(id: string): Observable<ParteContraria> {
    return this.http.get<ParteContraria>(`${this.apiUrl}/${id}`);
  }

  createParteContraria(parteContraria: Partial<ParteContraria>): Observable<ParteContraria> {
    return this.http.post<ParteContraria>(this.apiUrl, parteContraria);
  }

  updateParteContraria(id: string, parteContraria: Partial<ParteContraria>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, parteContraria);
  }

  deleteParteContraria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
