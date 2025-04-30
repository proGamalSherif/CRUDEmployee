import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl:string = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  GetEmployeeAsync():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.apiUrl}/Employee`);
  }
  DeleteEmployee(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.apiUrl}/Employee/${id}`)
  }
}
