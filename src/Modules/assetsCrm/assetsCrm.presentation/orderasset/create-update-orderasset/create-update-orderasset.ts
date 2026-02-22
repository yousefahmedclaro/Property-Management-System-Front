import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GetAssetProviders } from '../../../assetsCrm.Application/usecases/assets/getAsset.usecase';
import { GetCompanyProviders } from '../../../assetsCrm.Application/usecases/company/getCompanies.usecase';
import { AssetsGetLookUpProviders, AssetsGetLookUpUseCase } from '../../../assetsCrm.Application/usecases/assets/assetsLookup.usecase';
import { Lookup } from '../../../../Common/domain/lookup';
import { OrderAsset } from '../../../assetsCrm.Domain/orderasset';
import { orderassetPostProviders, orderassetPostUseCase } from '../../../assetsCrm.Application/usecases/orderasset/orderassetPost.usecase';
import { orderassetPutProviders, orderassetPutUseCase } from '../../../assetsCrm.Application/usecases/orderasset/orderassetPut.usecase';
import { CompaniesGetLookUpProviders, CompaniesGetLookUpUseCase } from '../../../assetsCrm.Application/usecases/company/companiesGetLookUp.usecase';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from "primeng/table";  

@Component({
  selector: 'createupdateorderassetComponent',
  templateUrl: './create-update-orderasset.html',
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
    orderassetPostProviders,
    orderassetPutProviders,
    AssetsGetLookUpProviders,
    CompaniesGetLookUpProviders,
    GetCompanyProviders,
    GetAssetProviders,
  ],
})
export class createupdateorderassetComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public assetsOptions: Lookup[] = [];
  public companyOptions: Lookup[] = [];
  private data: OrderAsset;

  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly assetsGetLookUpUseCase = inject(AssetsGetLookUpUseCase);
  private readonly companiesGetLookUpUseCase = inject(CompaniesGetLookUpUseCase);
  private readonly orderassetPostUseCase = inject(orderassetPostUseCase);
  private readonly orderassetPutUseCase = inject(orderassetPutUseCase);


  constructor() {
    this.data = this.config.data;
    

console.log(this.data);

this.form = new FormGroup({
  assetsIds: new FormControl(this.data?.assetsIds ?? [], Validators.required), 
  companyId: new FormControl(this.data?.companyId ?? null, Validators.required), 
  notes: new FormControl(this.data?.notes ?? ''),
  requirements: new FormControl(this.data?.requirements ?? '', Validators.required),
  requestSource: new FormControl(this.data?.requestSource ?? '', Validators.required),
});
}


  get companyId(): FormControl {
    return this.form.get('companyId') as FormControl;
  }

  get assetsIds(): FormControl {
    return this.form.get('assetsIds') as FormControl;
  }

  get requirements(): FormControl {
    return this.form.get('requirements') as FormControl;
  }

    get notes(): FormControl {
    return this.form.get('notes') as FormControl;
  }

    get requestSource(): FormControl {
    return this.form.get('requestSource') as FormControl;
  }

  ngOnInit() {
  this.assetsGetLookUpUseCase.execute().subscribe((response) => {
    this.assetsOptions = response;
  });
    this.companiesGetLookUpUseCase.execute().subscribe((response) => {
      this.companyOptions = response;
    });
  }

  create(orderasset: OrderAsset) {
    this.orderassetPostUseCase
      .execute(orderasset)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(orderAsset: OrderAsset) {
    this.orderassetPutUseCase
      .execute(orderAsset)
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
  
  const orderasset: OrderAsset = {
    id: this.data?.id || '',
    requirements: formValue.requirements || '',
    assetsIds: formValue.assetsIds || [],
    companyId: formValue.companyId || '',
    notes: formValue.notes || '',
    requestSource: formValue.requestSource || '',
  };
  
  if (this.data?.id) {
    this.update(orderasset);
  } else {
    this.create(orderasset);
  }
}

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}