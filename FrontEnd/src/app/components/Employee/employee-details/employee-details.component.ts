import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent implements OnInit {
  EmployeeForm!: FormGroup;
  EmployeeId!: number;
  FormName!: string;
  constructor(
    private fb: FormBuilder,
    private routes: ActivatedRoute,
    private alertServ: AlertService,
    private employeeServ:EmployeeService
  ) {
    this.routes.paramMap.subscribe((id) => {
      this.EmployeeId = Number(id.get('id'));
      if (this.EmployeeId > 0) {
        this.FormName = 'Update Employee';
      } else {
        this.FormName = 'Insert Employee';
      }
    });
  }
  ngOnInit() {
    this.alertServ.showLoading();
    this.EmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      position: ['', Validators.required],
    });
    if (this.EmployeeId > 0) {
      this.employeeServ.GetEmployeeById(this.EmployeeId).subscribe({
        next:(res)=>{
          this.EmployeeForm.patchValue({
            firstName:[res.firstName],
            lastName:[res.lastName],
            emailAddress:[res.emailAddress],
            position:[res.position]
          })
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    this.alertServ.close();
  }
}
