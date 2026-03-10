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
import { rentalDurationGetPageProviders, rentalDurationGetPageUseCase } from '../../PropertyCrm.Application/usecases/rentalDuration/rentalDurationGetPageUseCase';
import { rentalDurationDeleteProviders, rentalDurationDeleteUseCase } from '../../PropertyCrm.Application/usecases/rentalDuration/rentalDurationDeleteUseCase';
import { rentalDuration } from '../../PropertyCrm.Domain/rentalDuration';
import { createupdaterentalDurationComponent } from './create-update-rentalDuration/create-update-rentalDuration.component';


@Component({
  selector: 'app-rentalDuration',
  templateUrl: './rentalDuration.component.html',
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
    rentalDurationDeleteProviders,
    rentalDurationGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class RentalDurationComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly rentalDurationDeleteUseCase = inject(rentalDurationDeleteUseCase);
  private readonly rentalDurationGetPageUseCase = inject(rentalDurationGetPageUseCase);

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<rentalDuration> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<rentalDuration>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.rentalDurationGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('name'), field: 'name' },
    { name: this.translateService.instant('months'), field: 'months' },
    { name: this.translateService.instant('action'), field: 'actionsss' },
  ]);


  ngOnInit() {
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    this.rentalDurationGetPageUseCase.execute({ params }).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(createupdaterentalDurationComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(rentalDuration: rentalDuration) {
    this.table.openCreateUpdateDialog(
      createupdaterentalDurationComponent,
      () => this.getData(this.table.PaginationParams),
      rentalDuration
    );
  }

  delete(rentalDuration: rentalDuration) {
    console.log('Delete in presentation called for rentalDuration:', rentalDuration.id);
    this.table.delete(rentalDuration, this.rentalDurationDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}