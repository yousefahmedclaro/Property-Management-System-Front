import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from "primeng/table";  
import { renter } from '../../../PropertyCrm.Domain/renter';
import { categoryPostProviders, categoryPostUseCase } from '../../../PropertyCrm.Application/usecases/category/categoryPostUseCase';
import { categoryPutProviders, categoryPutUseCase } from '../../../PropertyCrm.Application/usecases/category/categoryPutUseCase';
import { category } from '../../../PropertyCrm.Domain/category';

@Component({
  selector: 'createupdatecategoryComponent',
  templateUrl: './create-update-category.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    CommonModule,
    Button,
    MultiSelectModule,
    TableModule
],
  providers: [
    categoryPostProviders,
    categoryPutProviders
  ],
})
export class createupdatecategoryComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  private data: renter;
  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly categoryPostUseCase = inject(categoryPostUseCase);
  private readonly categoryPutUseCase = inject(categoryPutUseCase);

  constructor() {
    this.data = this.config.data; 

console.log(this.data);
this.form = new FormGroup({
  name: new FormControl(this.data?.name ?? ''),
});
}

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  
  ngOnInit() {}

  create(category: category) {
    this.categoryPostUseCase
      .execute(category)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(category: category) {
    this.categoryPutUseCase
      .execute(category)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  handleError(err: any, form: FormGroup) {
    if (err.status == 422) {
      Object.entries(err.error.errors).forEach(([key, value]) => {
        form.get(key)?.setErrors({ serverError: value });
      });
    }
  }

submit() {
  this.loading = true;
  this.submitted = true;

  if (this.form.invalid) {
    this.loading = false;
    console.error('Form is invalid:', this.form.errors);
    return;
  }

  const formValue = this.form.value;
  const category: category = {
    id: this.data?.id || '',
    name: formValue.name || '',
  };
  
  if (this.data?.id) {
    this.update(category);
  } else {
    this.create(category);
  }
}

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}