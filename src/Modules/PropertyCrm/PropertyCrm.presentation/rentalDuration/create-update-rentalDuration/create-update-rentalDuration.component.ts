import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from "primeng/table";  
import { rentalDurationPostProviders, rentalDurationPostUseCase } from '../../../PropertyCrm.Application/usecases/rentalDuration/rentalDurationPostUseCase';
import { rentalDurationPutProviders, rentalDurationPutUseCase } from '../../../PropertyCrm.Application/usecases/rentalDuration/rentalDurationPutUseCase';
import { rentalDuration } from '../../../PropertyCrm.Domain/rentalDuration';

@Component({
  selector: 'createupdaterentalDurationComponent',
  templateUrl: './create-update-rentalDuration.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    CommonModule,
    Button,
    ButtonModule,
    MultiSelectModule,
    TableModule
],
  providers: [
  rentalDurationPostProviders,
  rentalDurationPutProviders
  ],
})
export class createupdaterentalDurationComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  private data: rentalDuration;
  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly rentalDurationPostUseCase = inject(rentalDurationPostUseCase);
  private readonly rentalDurationPutUseCase = inject(rentalDurationPutUseCase);

  constructor() {
    this.data = this.config.data; 

console.log(this.data);
this.form = new FormGroup({
  name: new FormControl(this.data?.name ?? ''),
    months: new FormControl(this.data?.months ?? 0),
});
}

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

    get months(): FormControl {
    return this.form.get('months') as FormControl;
  }
  
  ngOnInit() {}

  create(rentalDuration: rentalDuration) {
    this.rentalDurationPostUseCase
      .execute(rentalDuration)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(rentalDuration: rentalDuration) {
    this.rentalDurationPutUseCase
      .execute(rentalDuration)
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
  const rentalDuration: rentalDuration = {
    id: this.data?.id || '',
    name: formValue.name || '',
    months: formValue.months || 0,      
  };
  
  if (this.data?.id) {
    this.update(rentalDuration);
  } else {
    this.create(rentalDuration);
  }
}

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}