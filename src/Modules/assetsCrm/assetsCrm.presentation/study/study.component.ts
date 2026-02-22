import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PaginatorModule } from 'primeng/paginator';
import { TableComponent } from '../../../Common/presentation/tableComponent';
import { InputGroup } from 'primeng/inputgroup'; 
import{CreateUpdateStudyComponent} from './create-update-study/create-update-study.component';
import { Study } from '../../assetsCrm.Domain/study';
import { StudyGetPageProviders, StudyGetPageUseCase } from '../../assetsCrm.Application/usecases/study/studyGetPage.usecase';
import { StudyDeleteProviders, StudyDeleteUseCase } from '../../assetsCrm.Application/usecases/study/study.Delete.usecase';
import { AuthService } from '../../../Identity/Identity.Application/auth-service';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
// import { InputGroupModule } from 'primeng/inputgroup';


@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputGroupAddonModule,
    PaginatorModule,
    InputGroup,        
    Toast,
    ConfirmDialog,
  ],
  providers: [
    StudyDeleteProviders,
    StudyGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class StudyComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly studyDeleteUseCase = inject(StudyDeleteUseCase);
  private readonly studyGetPageUseCase = inject(StudyGetPageUseCase);

  public selectedAsset: string = ''; 
  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<Study> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<Study>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.studyGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('arabic_name'), field: 'name.ar' },
    { name: this.translateService.instant('english_name'), field: 'name.en' },
    { name: this.translateService.instant('asset'), field: 'assetName' },
    { name: this.translateService.instant('rental_value'), field: 'rentalValue' },
    { name: this.translateService.instant('value'), field: 'value' },
    { name: this.translateService.instant('irr'), field: 'irr' },
  ]);

  constructor() {
    if (this.authService.isEditor()) {
      this.columns().push({ name: this.translateService.instant('AssetsList.actions'), field: 'actions' });
    }
  }

  ngOnInit() {
    this.selectedAsset = this.route.snapshot.params['assetId'] || '';
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    const obj = { params, assetId: this.selectedAsset };
    this.studyGetPageUseCase.execute(obj).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(CreateUpdateStudyComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(study: Study) {
    this.table.openCreateUpdateDialog(
      CreateUpdateStudyComponent,
      () => this.getData(this.table.PaginationParams),
      study
    );
  }

  delete(study: Study) {
    this.table.delete(study, this.studyDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}