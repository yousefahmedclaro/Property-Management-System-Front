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
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { renter } from '../../PropertyCrm.Domain/renter';
import { renterGetPageProviders, renterGetPageUseCase } from '../../PropertyCrm.Application/usecases/renter/renterGetPage.usecase';
import { renterDeleteProviders, renterDeleteUseCase } from '../../PropertyCrm.Application/usecases/renter/renterDelete.usecase';
import { createupdaterenterComponent } from './create-update-renter/create-update-renter.component';


@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
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
    renterDeleteProviders,
    renterGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class RenterComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly renterDeleteUseCase = inject(renterDeleteUseCase);
  private readonly renterGetPageUseCase = inject(renterGetPageUseCase);

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<renter> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<renter>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.renterGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('name'), field: 'name' },
    { name: this.translateService.instant('email'), field: 'email' },
    { name: this.translateService.instant('budget'), field: 'budget' },
    { name: this.translateService.instant('phoneNumber'), field: 'phoneNumber' },
  ]);


  ngOnInit() {
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    this.renterGetPageUseCase.execute({ params }).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(createupdaterenterComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(renter: renter) {
    this.table.openCreateUpdateDialog(
      createupdaterenterComponent,
      () => this.getData(this.table.PaginationParams),
      renter
    );
  }

  delete(renter: renter) {
    this.table.delete(renter, this.renterDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}