import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../../../models/employee';
import { EmployeeService } from '../../../../services/employee.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-manage-employee',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css',
})
export class ManageEmployeeComponent implements OnInit {
  @ViewChild('SearchText') SearchText!: ElementRef;
  EmployeeArr!: Employee[];
  TotalPages:number=0;
  CurrentPage:number=1;
  filteredData: Employee[] = [];
  constructor(
    private employeeServ: EmployeeService,
    private router: Router,
    private alertServ: AlertService
  ) {}
  ngOnInit() {
    this.alertServ.showLoading('Loading ..', 'Loading Employee Data');
    this.loadInitialData();
  }
  loadInitialData() {
    this.employeeServ.GetTotalPages(8).subscribe({
      next: (res) => {
        this.TotalPages = res;
        this.CurrentPage = 1;
        this.getPageData();
      },
      error: (err) => {
        console.log(err);
        this.alertServ.close();
      },
    });
  }
  getPageData() {
    this.employeeServ.GetAllWithPagination(this.CurrentPage, 8).subscribe({
      next: (res) => {
        this.EmployeeArr = res;
        this.alertServ.close();
      },
      error: (err) => {
        console.log(err);
        this.alertServ.close();
      },
    });
  }
  NavigateToDetails(id: number) {
    this.router.navigate([`Manage-Employee/Employee-Details/${id}`]);
  }
  NextPage() {
    if (this.CurrentPage < this.TotalPages) {
      this.CurrentPage++;
      this.alertServ.showLoading();
      this.loadPage();
    }
  }
  PrevPage() {
    if (this.CurrentPage > 1) {
      this.CurrentPage--;
      this.alertServ.showLoading();
      this.loadPage();
    }
  }
  loadPage() {
    const searchValue = this.SearchText?.nativeElement.value.trim();
    if (searchValue) {
      this.FilterEmployee(this.CurrentPage);
    } else {
      this.getPageData();
    }
  }
  FilterEmployee(current: number) {
    this.employeeServ.FilterEmployee(this.SearchText.nativeElement.value).subscribe({
      next: (res) => {
        this.filteredData = res;
        const totalCount = res.length;
        const totalPages = Math.ceil(totalCount / 8);
        this.TotalPages = Math.max(totalPages, 1);
        this.CurrentPage = current;
        const start = (this.CurrentPage - 1) * 8;
        const end = start + 8;
        this.EmployeeArr = res.slice(start, end);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  ngAfterViewInit() {
    fromEvent(this.SearchText.nativeElement, 'input').pipe(
      debounceTime(1000),
      map((event: any) => event.target.value.trim()),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.FilterEmployee(1);
      } else {
        this.filteredData = [];
        this.CurrentPage = 1;
        this.loadInitialData();
      }
    });
  }

  async DeleteEmployee(id: number) {
    let result = await this.alertServ.confirm(
      'Are you Sure that you want to delete selected employee ?',
      'Delete Employee'
    );
    if (result.isConfirmed) {
      this.alertServ.showLoading('Loading ..', 'Delete Employee Data');
      this.employeeServ.DeleteEmployee(id).subscribe({
        next: () => {
          this.employeeServ.GetAllWithPagination(this.CurrentPage,8).subscribe({
            next: (res) => {
              this.EmployeeArr = res;
              this.alertServ.close();
            },
            error: (err) => {
              console.log(err);
              this.alertServ.close();
            },
          });
        },
        error: (err) => {
          console.log(err);
        this.alertServ.close();
      },
      });
    }
  }
}
