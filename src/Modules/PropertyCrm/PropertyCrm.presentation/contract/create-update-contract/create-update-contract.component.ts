import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Lookup } from '../../../../Common/domain/lookup';
import { contract } from '../../../PropertyCrm.Domain/contract';
import { contractPostUseCase, contractPostProviders } from '../../../PropertyCrm.Application/usecases/contract/contractPostusecase';
import { contractGetOwnerLookupUseCase, contractGetOwnerLookupProviders } from '../../../PropertyCrm.Application/usecases/contract/contractGetOwnerLookupusecase';
import { contractGetRenterLookupUseCase, contractGetRenterLookupProviders } from '../../../PropertyCrm.Application/usecases/contract/contractGetRenterLookupusecase';
import { contractGetPropertyLookupUseCase, contractGetPropertyLookupProviders } from '../../../PropertyCrm.Application/usecases/contract/contractGetPropertyLookupusecase';
import { contractGetPropertyRentalDurationsUseCase, contractGetPropertyRentalDurationsProviders } from '../../../PropertyCrm.Application/usecases/contract/contractGetPropertyRentalDurationsusecase';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-update-contract.component.html',
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
    contractPostProviders,
    contractGetOwnerLookupProviders,
    contractGetRenterLookupProviders,
    contractGetPropertyLookupProviders,
    contractGetPropertyRentalDurationsProviders,
  ],
})
export class CreateContractComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public ownerOptions: Lookup[] = [];
  public renterOptions: Lookup[] = [];
  public propertyOptions: Lookup[] = [];
  public rentalDurationOptions: Lookup[] = [];

  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly contractPostUseCase = inject(contractPostUseCase);
  private readonly ownerLookupUseCase = inject(contractGetOwnerLookupUseCase);
  private readonly renterLookupUseCase = inject(contractGetRenterLookupUseCase);
  private readonly propertyLookupUseCase = inject(contractGetPropertyLookupUseCase);
  private readonly propertyRentalDurationsUseCase = inject(contractGetPropertyRentalDurationsUseCase);

  constructor() {
    this.form = new FormGroup({
      ownerId: new FormControl(null, Validators.required),
      renterId: new FormControl(null, Validators.required),
      propertyId: new FormControl(null, Validators.required),
      rentalDurationId: new FormControl(null, Validators.required),
      startData: new FormControl('', Validators.required),
      monthlyRentAmount: new FormControl(null, Validators.required),
      annualIncreament: new FormControl(null, Validators.required),
      insurance: new FormControl(null, Validators.required),
    });
  }

  get ownerId(): FormControl { return this.form.get('ownerId') as FormControl; }
  get renterId(): FormControl { return this.form.get('renterId') as FormControl; }
  get propertyId(): FormControl { return this.form.get('propertyId') as FormControl; }
  get rentalDurationId(): FormControl { return this.form.get('rentalDurationId') as FormControl; }
  get startData(): FormControl { return this.form.get('startData') as FormControl; }
  get monthlyRentAmount(): FormControl { return this.form.get('monthlyRentAmount') as FormControl; }
  get annualIncreament(): FormControl { return this.form.get('annualIncreament') as FormControl; }
  get insurance(): FormControl { return this.form.get('insurance') as FormControl; }

  ngOnInit() {
    this.ownerLookupUseCase.execute().subscribe(res => this.ownerOptions = res);
    this.renterLookupUseCase.execute().subscribe(res => this.renterOptions = res);
    this.propertyLookupUseCase.execute().subscribe(res => this.propertyOptions = res);
  }

  onPropertyChange(event: any) {
    // Reset rental duration when property changes
    this.rentalDurationId.reset();
    this.rentalDurationOptions = [];

    if (event.value) {
      this.propertyRentalDurationsUseCase.execute(event.value).subscribe(res => {
        this.rentalDurationOptions = res;
      });
    }
  }

  create(c: contract) {
    this.contractPostUseCase
      .execute(c)
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

    const c: contract = {
      ownerId: this.ownerId.value,
      renterId: this.renterId.value,
      propertyId: this.propertyId.value,
      rentalDurationId: this.rentalDurationId.value,
      startData: this.startData.value,
      monthlyRentAmount: this.monthlyRentAmount.value,
      annualIncreament: this.annualIncreament.value,
      insurance: this.insurance.value,
    };

    this.create(c);
  }

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}