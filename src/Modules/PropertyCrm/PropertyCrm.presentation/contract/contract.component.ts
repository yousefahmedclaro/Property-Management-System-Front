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
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DatePipe } from '@angular/common';
import { contract } from '../../PropertyCrm.Domain/contract';
import { contractDeleteUseCase, contractDeleteProviders } from '../../PropertyCrm.Application/usecases/contract/contractDeleteusecase';
import { contractGetPageUseCase, contractGetPageProviders } from '../../PropertyCrm.Application/usecases/contract/contractGetPageusecase';
import { CreateContractComponent } from './create-update-contract/create-update-contract.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
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
    DatePipe,
  ],
  providers: [
    contractDeleteProviders,
    contractGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class ContractComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly contractDeleteUseCase = inject(contractDeleteUseCase);
  private readonly contractGetPageUseCase = inject(contractGetPageUseCase);
  private readonly router = inject(Router);

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<contract> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<contract>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.contractGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('owner'), field: 'ownerName' },
    { name: this.translateService.instant('renter'), field: 'renterName' },
    { name: this.translateService.instant('rental_duration'), field: 'propertyRentDuration' },
    { name: this.translateService.instant('start_date'), field: 'contractStartDate' },
    { name: this.translateService.instant('end_date'), field: 'contractEndDate' },
    { name: this.translateService.instant('action'), field: 'actions' },
  ]);

  ngOnInit() {
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    this.contractGetPageUseCase.execute({ params }).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(CreateContractComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  view(c: contract) {
    this.router.navigate(['/contract', c.id]);
  }

  delete(c: contract) {
    this.table.delete(c, this.contractDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}