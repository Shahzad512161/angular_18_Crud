import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    debugger;
    this.createForm();
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const oldData = localStorage.getItem('EmpData');
      if (oldData) {
        debugger;
        this.employeeList = JSON.parse(oldData);
      }
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empID: new FormControl(this.employeeObj.empID),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      email: new FormControl(this.employeeObj.email),
      address: new FormControl(this.employeeObj.address),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      contact: new FormControl(this.employeeObj.contact),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required , Validators.minLength(10)])
    });
  }

  onSave() {
    if (typeof window !== 'undefined' && localStorage) {
      const oldData = localStorage.getItem('EmpData');
      if (oldData) {
        debugger;
        const parsedData = JSON.parse(oldData);
        this.employeeForm.controls['empID'].setValue(parsedData.length + 1);
        this.employeeList.unshift(this.employeeForm.value);
      } else {
        this.employeeList.unshift(this.employeeForm.value);
      }
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      this.employeeObj = new EmployeeModel();
      this.createForm()
    }
  }

  onEdit(item: EmployeeModel){
    this.employeeObj = item;
    this.createForm()
  }

  onUpdate(){
   
    const records = this.employeeList.find(m => m.empID == this.employeeForm.controls["empID"].value);
    if( records != undefined){
      records.address = this.employeeForm.controls['address'].value;
      records.contact = this.employeeForm.controls['contact'].value;
      records.email = this.employeeForm.controls['email'].value;
    }
    localStorage.setItem("EmpData" , JSON.stringify(this.employeeList))
    this.employeeObj = new EmployeeModel();
    this.createForm()
  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure u want to delete")
    if( isDelete){
      const index = this.employeeList.findIndex(m => m.empID == id)
      this.employeeList.splice(index,1)
      localStorage.setItem("EmpData" , JSON.stringify(this.employeeList))
    }
  }
}
