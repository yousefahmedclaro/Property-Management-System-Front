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
import { Location } from '../../PropertyCrm.Domain/location';
import { LocationDeleteUseCase, LocationDeleteProviders } from '../../PropertyCrm.Application/usecases/location/locationDeleteUseCase';
import { LocationGetPageUseCase, LocationGetPageProviders } from '../../PropertyCrm.Application/usecases/location/locationGetPageUseCase';
import { CreateUpdateLocationComponent } from './create-update-location/create-update-location.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
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
    LocationDeleteProviders,
    LocationGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class LocationComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly locationDeleteUseCase = inject(LocationDeleteUseCase);
  private readonly locationGetPageUseCase = inject(LocationGetPageUseCase);

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<Location> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<Location>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.locationGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('arabic_name'), field: 'name.ar' },
    { name: this.translateService.instant('english_name'), field: 'name.en' },
    { name: this.translateService.instant('parent_location'), field: 'parentLocationId' },
  ]);

  ngOnInit() {
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    this.locationGetPageUseCase.execute({ params }).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(CreateUpdateLocationComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(location: Location) {
    this.table.openCreateUpdateDialog(
      CreateUpdateLocationComponent,
      () => this.getData(this.table.PaginationParams),
      location
    );
  }

  delete(location: Location) {
    this.table.delete(location, this.locationDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}