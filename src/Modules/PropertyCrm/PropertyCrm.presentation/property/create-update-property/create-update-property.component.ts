import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Lookup } from '../../../../Common/domain/lookup';
import { property } from '../../../PropertyCrm.Domain/property';
import { propertyPostProviders, propertyPostUseCase } from '../../../PropertyCrm.Application/usecases/property/propertyPostusecase';
import { propertyPutProviders, propertyPutUseCase } from '../../../PropertyCrm.Application/usecases/property/propertyPutusecase';
import { propertyGetOwnerLookupProviders, propertyGetOwnerLookupUseCase } from '../../../PropertyCrm.Application/usecases/property/propertyGetOwnerLookupusecase';
import { propertyGetCategoryLookupProviders, propertyGetCategoryLookupUseCase } from '../../../PropertyCrm.Application/usecases/property/propertyGetCategoryLookupusecase';
import { propertyGetLocationLookupProviders, propertyGetLocationLookupUseCase } from '../../../PropertyCrm.Application/usecases/property/propertyGetLocationLookupusecase';
import { propertyGetChildLocationProviders, propertyGetChildLocationUseCase } from '../../../PropertyCrm.Application/usecases/property/propertyGetChildLocationLookupusecase';
import { propertyGetRentalDurationLookupProviders, propertyGetRentalDurationLookupUseCase } from '../../../PropertyCrm.Application/usecases/property/propertyGetRentalDurationLookupusecase';

@Component({
  selector: 'app-create-update-property',
  templateUrl: './create-update-property.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    Button,
    InputTextModule,
    SelectModule,
    MultiSelectModule,
    CommonModule,
  ],
  providers: [
    propertyPostProviders,
    propertyPutProviders,
    propertyGetOwnerLookupProviders,
    propertyGetCategoryLookupProviders,
    propertyGetLocationLookupProviders,
    propertyGetChildLocationProviders,
    propertyGetRentalDurationLookupProviders,
  ],
})
export class CreateUpdatePropertyComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public ownerOptions: Lookup[] = [];
  public categoryOptions: Lookup[] = [];
  public locationOptions: Lookup[] = [];
  public childLocationOptions: Lookup[] = [];
  public rentalDurationOptions: Lookup[] = [];
  private data: property;

  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly propertyPostUseCase = inject(propertyPostUseCase);
  private readonly propertyPutUseCase = inject(propertyPutUseCase);
  private readonly ownerLookupUseCase = inject(propertyGetOwnerLookupUseCase);
  private readonly categoryLookupUseCase = inject(propertyGetCategoryLookupUseCase);
  private readonly locationLookupUseCase = inject(propertyGetLocationLookupUseCase);
  private readonly childLocationUseCase = inject(propertyGetChildLocationUseCase);
  private readonly rentalDurationLookupUseCase = inject(propertyGetRentalDurationLookupUseCase);

  constructor() {
    this.data = this.config.data;

    this.form = new FormGroup({
      code: new FormControl(this.data?.code ?? '', Validators.required),
      price: new FormControl(this.data?.price ?? null, Validators.required),
      size: new FormControl(this.data?.size ?? null, Validators.required),
      buildingNumber: new FormControl(this.data?.buildingNumber ?? null),
      ownerId: new FormControl(this.data?.ownerId ?? null, Validators.required),
      categoryId: new FormControl(this.data?.categoryId ?? null, Validators.required),
      locationId: new FormControl(this.data?.locationId ?? null, Validators.required),
      childLocationId: new FormControl(null),
      allowedRentalDurationIds: new FormControl(this.data?.allowedRentalDurationIds ?? [], Validators.required),
    });
  }

  get code(): FormControl { return this.form.get('code') as FormControl; }
  get price(): FormControl { return this.form.get('price') as FormControl; }
  get size(): FormControl { return this.form.get('size') as FormControl; }
  get buildingNumber(): FormControl { return this.form.get('buildingNumber') as FormControl; }
  get ownerId(): FormControl { return this.form.get('ownerId') as FormControl; }
  get categoryId(): FormControl { return this.form.get('categoryId') as FormControl; }
  get locationId(): FormControl { return this.form.get('locationId') as FormControl; }
  get childLocationId(): FormControl { return this.form.get('childLocationId') as FormControl; }
  get allowedRentalDurationIds(): FormControl { return this.form.get('allowedRentalDurationIds') as FormControl; }

  ngOnInit() {
    this.ownerLookupUseCase.execute().subscribe(res => this.ownerOptions = res);
    this.categoryLookupUseCase.execute().subscribe(res => this.categoryOptions = res);
    this.locationLookupUseCase.execute().subscribe(res => this.locationOptions = res);
    this.rentalDurationLookupUseCase.execute().subscribe(res => this.rentalDurationOptions = res);

    // If editing, check if the existing location has children
    if (this.data?.locationId) {
      this.childLocationUseCase.execute(this.data.locationId).subscribe(res => {
        this.childLocationOptions = res;
      });
    }
  }

  onLocationChange(event: any) {
    // Reset child location when parent changes
    this.childLocationId.reset();
    this.childLocationOptions = [];

    if (event.value) {
      this.childLocationUseCase.execute(event.value).subscribe(res => {
        this.childLocationOptions = res;
      });
    }
  }

  create(prop: property) {
    this.propertyPostUseCase
      .execute(prop)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(prop: property) {
    this.propertyPutUseCase
      .execute(prop)
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

    // If child location is selected, use it as the final locationId
    const finalLocationId = this.childLocationId.value ?? this.locationId.value;

    const prop: property = {
      id: this.data?.id,
      code: this.code.value,
      price: this.price.value,
      size: this.size.value,
      buildingNumber: this.buildingNumber.value,
      ownerId: this.ownerId.value,
      categoryId: this.categoryId.value,
      locationId: finalLocationId,
      allowedRentalDurationIds: this.allowedRentalDurationIds.value,
    };

    if (this.data?.id) {
      this.update(prop);
    } else {
      this.create(prop);
    }
  }

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}