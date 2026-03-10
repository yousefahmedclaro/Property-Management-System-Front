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
import { property } from '../../PropertyCrm.Domain/property';
import { propertyDeleteUseCase, propertyDeleteProviders } from '../../PropertyCrm.Application/usecases/property/propertyDeleteusecase';
import { propertyGetPageUseCase, propertyGetPageProviders } from '../../PropertyCrm.Application/usecases/property/propertyGetPageusecase';
import { CreateUpdatePropertyComponent } from './create-update-property/create-update-property.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
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
    propertyDeleteProviders,
    propertyGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class PropertyComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly propertyDeleteUseCase = inject(propertyDeleteUseCase);
  private readonly propertyGetPageUseCase = inject(propertyGetPageUseCase);
  private readonly router = inject(Router);

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<property> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<property>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.propertyGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('code'), field: 'code' },
    { name: this.translateService.instant('price'), field: 'price' },
    { name: this.translateService.instant('size'), field: 'size' },
    { name: this.translateService.instant('buildingNumber'), field: 'buildingNumber' },
    { name: this.translateService.instant('isAvailable'), field: 'isAvailable' },
    { name: this.translateService.instant('owner'), field: 'owner' },
    { name: this.translateService.instant('location'), field: 'location' },
    { name: this.translateService.instant('category'), field: 'categoryName' },
    { name: this.translateService.instant('rental_durations'), field: 'allowedDurations' },
    { name: this.translateService.instant('action'), field: 'actions' },
  ]);

  ngOnInit() {
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    this.propertyGetPageUseCase.execute({ params }).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(CreateUpdatePropertyComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(prop: property) {
    this.table.openCreateUpdateDialog(
      CreateUpdatePropertyComponent,
      () => this.getData(this.table.PaginationParams),
      prop
    );
  }

view(prop: property) {
  this.router.navigate(['/property', prop.id]);
}


  delete(prop: property) {
    this.table.delete(prop, this.propertyDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}