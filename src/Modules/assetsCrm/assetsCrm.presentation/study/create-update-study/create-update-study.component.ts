import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { LocalizedString } from '../../../../Common/domain/localized-string';
import { CommonModule } from '@angular/common';
import { Study } from '../../../assetsCrm.Domain/study';
import { StudyPutProviders, StudyPutUseCase } from '../../../assetsCrm.Application/usecases/study/studyput.usecase';
import { StudyPostProviders, StudyPostUseCase } from '../../../assetsCrm.Application/usecases/study/studyPost.usecase';
import { GetAssetProviders } from '../../../assetsCrm.Application/usecases/assets/getAsset.usecase';
import { AssetsGetLookUpProviders, AssetsGetLookUpUseCase } from '../../../assetsCrm.Application/usecases/assets/assetsLookup.usecase';
import { Lookup } from '../../../../Common/domain/lookup';

@Component({
  selector: 'app-create-update-study',
  templateUrl: './create-update-study.component.html',
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
    StudyPostProviders,
    StudyPutProviders,
    AssetsGetLookUpProviders,
    GetAssetProviders,
  ],
})
export class CreateUpdateStudyComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public assetsOptions: Lookup[] = [];
  private data: Study;

  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly studyPostUseCase = inject(StudyPostUseCase);
  private readonly studyPutUseCase = inject(StudyPutUseCase);
  private readonly assetsGetLookUpUseCase = inject(AssetsGetLookUpUseCase);


  constructor() {
    this.data = this.config.data;
    
    this.form = new FormGroup({
      name: new FormGroup({
        Ar: new FormControl(this.data?.name?.ar ?? '', Validators.required),
        En: new FormControl(this.data?.name?.en ?? '', Validators.required),
      }),
      asset: new FormControl(this.data?.asset ?? '', Validators.required),
    });
  }

  get arName(): FormControl {
    return this.form.get('name.Ar') as FormControl;
  }

  get enName(): FormControl {
    return this.form.get('name.En') as FormControl;
  }

  get asset(): FormControl {
    return this.form.get('asset') as FormControl;
  }

  ngOnInit() {
    this.assetsGetLookUpUseCase.execute().subscribe((response) => {
      this.assetsOptions = response;
    });
  }

  create(study: Study) {
    this.studyPostUseCase
      .execute(study)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.closeDialog(true),
        error: (err) => this.handleError(err, this.form),
      });
  }

  update(study: Study) {
    this.studyPutUseCase
      .execute(study)
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

    const study: Study = {
      id: this.data?.id,
      name: new LocalizedString(this.arName.value, this.enName.value),
      asset: { id: this.asset.value },
    };

    if (this.data?.id) {
      this.update(study);
    } else {
      this.create(study);
    }
  }

  closeDialog(isConfirmed: boolean = false) {
    this.ref.close({ confirmed: isConfirmed });
  }
}