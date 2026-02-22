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
import { AuthService } from '../../../Identity/Identity.Application/auth-service';
import { ActivatedRoute } from '@angular/router';
import { orderassetDeleteProviders, orderassetDeleteUseCase } from '../../assetsCrm.Application/usecases/orderasset/orderassetDelete.usecase';
import { orderassetGetPageProviders, orderassetGetPageUseCase } from '../../assetsCrm.Application/usecases/orderasset/orderassetGetPage.usecase';
import { OrderAsset } from '../../assetsCrm.Domain/orderasset';
import { createupdateorderassetComponent } from './create-update-orderasset/create-update-orderasset';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { InputGroup } from 'primeng/inputgroup'; 
import { Button } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';


@Component({
  selector: 'app-orderasset',
  templateUrl: './orderasset.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputGroupAddonModule,
    PaginatorModule,
    ConfirmDialog,
    Toast,
    InputGroup,
    Button,
    BadgeModule
  ],
  providers: [
    orderassetDeleteProviders,
    orderassetGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class orderAssetComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly orderAssetDeleteUseCase = inject(orderassetDeleteUseCase);
  private readonly orderAssetGetPageUseCase = inject(orderassetGetPageUseCase);

  public selectedCompany: string = ''; 
  public selectedAssets: string[] = []; 

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<OrderAsset> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<OrderAsset>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.orderAssetGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    // {
    //   name: this.translateService.instant('Assets'),
    //   field: 'assetsIds',
    // },
    {
      name: this.translateService.instant('code'),
      field: 'code',
    },
    {
      name: this.translateService.instant('company'),
      field: 'companyId',
    },
    // {
    //   name: this.translateService.instant('requirements'),
    //   field: 'requirements',
    // },
    {
      name: this.translateService.instant('status'),
      field: 'status',
    }

    // {
    //   name: this.translateService.instant('notes'),
    //   field: 'notes',
    // },
    // {
    //   name: this.translateService.instant('source'),
    //   field: 'requestSource',
    // },
    // {
    //   name: this.translateService.instant('quotation'),
    //   field: 'QuotationWordLink',
    // },
  ]);

  constructor() {
    if (this.authService.isEditor()) {
      this.columns().push({ name: this.translateService.instant('Actions'), field: 'actions' });
    }
  }

  ngOnInit() {
    this.selectedAssets = this.route.snapshot.params['assetsIds'] || '';
    this.selectedCompany = this.route.snapshot.params['companyId'] || '';

    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    const obj = { params, assetsIds: this.selectedAssets, companyId : this.selectedCompany };
    this.orderAssetGetPageUseCase.execute(obj).subscribe((data) => {
      this.pagesData.data = data;
      console.log(obj);
    });
  }

  create() {
    this.table.openCreateUpdateDialog(createupdateorderassetComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(orderasset: OrderAsset) {
    this.table.openCreateUpdateDialog(
      createupdateorderassetComponent,
      () => this.getData(this.table.PaginationParams),
      orderasset
    );
  }

  delete(  orderasset: OrderAsset) {
    this.table.delete(orderasset, this.orderAssetDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  statusSeverity(orderAsset: OrderAsset) {
    if (orderAsset.status === "New Order") return 'danger';
    if (orderAsset.status === "Approved") return 'success';
    else return 'success';
  }

}