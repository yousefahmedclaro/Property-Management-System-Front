import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalizedString } from '../../../../Common/domain/localized-string';
import { Lookup } from '../../../../Common/domain/lookup';
import { Location } from '../../../PropertyCrm.Domain/location';
import { LocationPostUseCase, LocationPostProviders } from '../../../PropertyCrm.Application/usecases/location/locationPostUseCase';
import { LocationPutUseCase, LocationPutProviders } from '../../../PropertyCrm.Application/usecases/location/locationPutUseCase';
import { LocationGetLookupUseCase, LocationGetLookupProviders } from '../../../PropertyCrm.Application/usecases/location/locationGetLookupUseCase';

@Component({
  selector: 'app-create-update-location',
  templateUrl: './create-update-location.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    Button,
    InputTextModule,
    SelectModule,
    CommonModule,
  ],
  providers: [
    LocationPostProviders,
    LocationPutProviders,
    LocationGetLookupProviders,
  ],
})
export class CreateUpdateLocationComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public locationOptions: Lookup[] = [];
  private data: Location;

  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly locationPostUseCase = inject(LocationPostUseCase);
  private readonly locationPutUseCase = inject(LocationPutUseCase);
  private readonly locationGetLookupUseCase = inject(LocationGetLookupUseCase);

  constructor() {
    this.data = this.config.data;

    this.form = new FormGroup({
      name: new FormGroup({
        Ar: new FormControl(this.data?.name?.ar ?? '', Validators.required),
        En: new FormControl(this.data?.name?.en ?? '', Validators.required),
      }),
      parentLocationId: new FormControl(this.data?.parentLocationId ?? null),
    });
  }

  get arName(): FormControl {
    return this.form.get('name.Ar') as FormControl;
  }

  get enName(): FormControl {
    return this.form.get('name.En') as FormControl;
  }

  get parentLocationId(): FormControl {
    return this.form.get('parentLocationId') as FormControl;
  }

  ngOnInit() {
    this.locationGetLookupUseCase.execute().subscribe((response) => {
      this.locationOptions = response;
    });
  }

  create(location: Location) {
    this.locationPostUseCase
      .execute(location)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(location: Location) {
    this.locationPutUseCase
      .execute(location)
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

    if (this.arName.invalid || this.enName.invalid) {
      this.loading = false;
      return;
    }

    const location: Location = {
      id: this.data?.id,
      name: new LocalizedString(this.arName.value, this.enName.value),
      parentLocationId: this.parentLocationId.value ?? null,
    };

    if (this.data?.id) {
      this.update(location);
    } else {
      this.create(location);
    }
  }

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}