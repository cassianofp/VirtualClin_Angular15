import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  addPaciente(data:any){
    return this.http.post('http://localhost:3000/paciente', data);
  }

  getPacienteList(){
    return this.http.get('http://localhost:3000/paciente');
  }

  deletePaciente(id: any){
    return this.http.delete(`http://localhost:3000/paciente/${id}`);
  }
}
