import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  MinLengthValidator,
  MinValidator,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { EmployeeService } from '../../../../services/employee.service';

export function noWhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (typeof value !== 'string') return null;
  const isWhitespace = value.trim().length === 0;
  return isWhitespace ? { whitespace: true } : null;
}

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
    private employeeServ: EmployeeService,
    private router: Router
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
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          noWhitespaceValidator,
          Validators.minLength(5),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(5),
          noWhitespaceValidator,
        ],
      ],
      emailAddress: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
          noWhitespaceValidator,
          Validators.minLength(5),
        ],
      ],
      position: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          noWhitespaceValidator,
          Validators.minLength(5),
        ],
      ],
    });
    if (this.EmployeeId > 0) {
      this.employeeServ.GetEmployeeById(this.EmployeeId).subscribe({
        next: (res) => {
          this.EmployeeForm.patchValue({
            firstName: res.firstName,
            lastName: res.lastName,
            emailAddress: res.emailAddress,
            position: res.position
          });
          this.alertServ.close();
        },
        error: (err) => {
          this.alertServ.close();
        },
      });
    } else {
      this.alertServ.close();
    }
  }
  OnSubmit() {
    if (this.EmployeeForm.valid) {
      this.alertServ.showLoading();
      const formData = new FormData();
      formData.append('firstName', this.EmployeeForm.get('firstName')?.value);
      formData.append('lastName', this.EmployeeForm.get('lastName')?.value);
      formData.append(
        'emailAddress',
        this.EmployeeForm.get('emailAddress')?.value
      );
      formData.append('position', this.EmployeeForm.get('position')?.value);
      if (this.EmployeeId > 0) {
        // Update
        this.employeeServ.UpdateEmployee(this.EmployeeId, formData).subscribe({
          next: async () => {
            this.alertServ.close();
            await this.alertServ.success('Employee Updated Success');
            this.router.navigate(['Manage-Employee']);
          },
          error: (err) => {
            this.alertServ.close();
            this.alertServ.error(err.message);
          },
        });
      } else {
        // Insert
        this.employeeServ.InsertEmployee(formData).subscribe({
          next: async () => {
            this.alertServ.close();
            await this.alertServ.success('Employee Insert Success');
            this.router.navigate(['Manage-Employee']);
          },
          error: (err) => {
            this.alertServ.close();
            this.alertServ.error(err.message);
          },
        });
      }
    } else {
      this.alertServ.error('Model is not Valid');
    }
  }
  CancelForm() {
    this.router.navigate(['Manage-Employee']);
  }
  get FirstName() {
    return this.EmployeeForm.get('firstName');
  }
  get LastName() {
    return this.EmployeeForm.get('lastName');
  }
  get EmailAddress() {
    return this.EmployeeForm.get('emailAddress');
  }
  get Position() {
    return this.EmployeeForm.get('position');
  }
}
