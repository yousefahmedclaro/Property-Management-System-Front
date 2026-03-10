import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { owner } from '../../../PropertyCrm.Domain/owner';
import { ownerPostProviders, ownerPostUseCase } from '../../../PropertyCrm.Application/usecases/owner/ownerPostusecase';
import { ownerPutProviders, ownerPutUseCase } from '../../../PropertyCrm.Application/usecases/owner/ownerPutusecase';

@Component({
  selector: 'app-create-update-owner',
  templateUrl: './create-update-owner.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    CommonModule,
    Button,
  ],
  providers: [
    ownerPostProviders,
    ownerPutProviders,
  ],
})
export class CreateUpdateOwnerComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  private data: owner;

  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly ownerPostUseCase = inject(ownerPostUseCase);
  private readonly ownerPutUseCase = inject(ownerPutUseCase);

  constructor() {
    this.data = this.config.data;

    this.form = new FormGroup({
      name: new FormControl(this.data?.name ?? '', Validators.required),
      email: new FormControl(this.data?.email ?? '', [Validators.email]),
      incomeBalance: new FormControl(this.data?.incomeBalance ?? ''),
      phoneNumber: new FormControl(this.data?.phoneNumber ?? ''),
    });
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get incomeBalance(): FormControl {
    return this.form.get('incomeBalance') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }

  ngOnInit() {}

  create(owner: owner) {
    this.ownerPostUseCase
      .execute(owner)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(owner: owner) {
    this.ownerPutUseCase
      .execute(owner)
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
      return;
    }

    const formValue = this.form.value;

    const owner: owner = {
      id: this.data?.id || '',
      name: formValue.name || '',
      email: formValue.email || '',
      incomeBalance: formValue.incomeBalance || 0,
      phoneNumber: formValue.phoneNumber || '',
    };

    if (this.data?.id) {
      this.update(owner);
    } else {
      this.create(owner);
    }
  }

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}