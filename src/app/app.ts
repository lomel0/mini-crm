
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  companyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      companyName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      companyCode: ['', [
        Validators.pattern(/^[0-9]+$/)
      ]],
      vatCode: ['', [
        Validators.pattern(/^(?:[0-9]+|LT[0-9]+)$/)
      ]],
      address: [''],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.pattern(/^\+?[0-9]{9,11}$/)
      ]],
      contacts: this.fb.array([])
    });
  }

  get contacts(): FormArray {
    return this.companyForm.get('contacts') as FormArray;
  }

  createContact(): FormGroup {
  return this.fb.group({
    firstName: [''],
    lastName: [''],
    position: [''],
    phone: ['', [
      Validators.pattern(/^\+?[0-9]{9,11}$/)
    ]]
  });
}

  addContact() {
    this.contacts.push(this.createContact());
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  registerCompany() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    console.log('Registered Company:');
    console.log(this.companyForm.value);

    alert('Company registered successfully!');

    this.companyForm.reset();
    this.contacts.clear();
  }
}
