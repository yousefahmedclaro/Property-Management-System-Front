import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Lookup } from '../../../../Common/domain/lookup';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from "primeng/table";  
import { renterPostProviders, renterPostUseCase } from '../../../PropertyCrm.Application/usecases/renter/renterPost.usecase';
import { renterPutProviders, renterPutUseCase } from '../../../PropertyCrm.Application/usecases/renter/renterPut.usecase';
import { renter } from '../../../PropertyCrm.Domain/renter';

@Component({
  selector: 'createupdaterenterComponent',
  templateUrl: './create-update-renter.component.html',
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
    renterPostProviders,
    renterPutProviders
  ],
})
export class createupdaterenterComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  private data: renter;

  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly renterPostUseCase = inject(renterPostUseCase);
  private readonly renterPutUseCase = inject(renterPutUseCase);


  constructor() {
    this.data = this.config.data;
    

console.log(this.data);

this.form = new FormGroup({
  name: new FormControl(this.data?.name ?? ''),
  email: new FormControl(this.data?.email ?? '', [Validators.email]),
  budget: new FormControl(this.data?.budget ?? ''),
  phoneNumber: new FormControl(this.data?.phoneNumber ?? ''),
});
}



  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

    get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

    get budget(): FormControl {
    return this.form.get('budget') as FormControl;
  }

    get phoneNumber(): FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }
  

  ngOnInit() {}

  create(renter: renter) {
    this.renterPostUseCase
      .execute(renter)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(renter: renter) {
    this.renterPutUseCase
      .execute(renter)
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
  
  const renter: renter = {
    id: this.data?.id || '',
    name: formValue.name || '',
    email: formValue.email || '',
    budget: formValue.budget || '',
    phoneNumber: formValue.phoneNumber || '',
  };
  
  if (this.data?.id) {
    this.update(renter);
  } else {
    this.create(renter);
  }
}

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}