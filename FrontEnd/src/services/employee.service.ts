import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl:string = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  GetEmployeeById(id:number):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.apiUrl}/Employee/${id}`);
  }
  GetTotalPages(pgSize:number):Observable<number>{
    return this.httpClient.get<number>(`${this.apiUrl}/Employee/GetTotalPages/${pgSize}`)
  }
  GetAllWithPagination(pgNumber:number,pgSize:number):Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.apiUrl}/Employee/${pgNumber}/${pgSize}`)
  }
  FilterEmployee(searchText:string):Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.apiUrl}/Employee/FilterEmployee/${searchText}`);;
  }
  InsertEmployee(employeeForm:FormData):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/Employee`,employeeForm)
  }
  UpdateEmployee(id:number, employeeForm:FormData):Observable<any>{
    return this.httpClient.put(`${this.apiUrl}/Employee/${id}`,employeeForm)
  }
  DeleteEmployee(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.apiUrl}/Employee/${id}`)
  }
}
