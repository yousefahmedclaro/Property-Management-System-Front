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
import { AuthService } from '../../../Identity/Identity.Application/auth-service';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { owner } from '../../PropertyCrm.Domain/owner';
import { CreateUpdateOwnerComponent } from './create-update-owner/create-update-owner.component';
import { ownerDeleteProviders, ownerDeleteUseCase } from '../../PropertyCrm.Application/usecases/owner/ownerDeleteusecase';
import { ownerGetPageProviders, ownerGetPageUseCase } from '../../PropertyCrm.Application/usecases/owner/ownerGetPageusecase';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
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
    ownerDeleteProviders,
    ownerGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class OwnerComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly ownerDeleteUseCase = inject(ownerDeleteUseCase);
  private readonly ownerGetPageUseCase = inject(ownerGetPageUseCase);

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<owner> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<owner>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.ownerGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('name'), field: 'name' },
    { name: this.translateService.instant('email'), field: 'email' },
    { name: this.translateService.instant('phoneNumber'), field: 'phoneNumber' },
    { name: this.translateService.instant('incomeBalance'), field: 'incomeBalance' },
    { name: this.translateService.instant('action'), field: 'actions' },
  ]);

  ngOnInit() {
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    this.ownerGetPageUseCase.execute({ params }).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(CreateUpdateOwnerComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(owner: owner) {
    this.table.openCreateUpdateDialog(
      CreateUpdateOwnerComponent,
      () => this.getData(this.table.PaginationParams),
      owner
    );
  }

  delete(owner: owner) {
    this.table.delete(owner, this.ownerDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}