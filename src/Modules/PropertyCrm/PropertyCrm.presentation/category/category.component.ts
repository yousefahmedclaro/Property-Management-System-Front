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
import { category } from '../../PropertyCrm.Domain/category';
import { categoryDeleteProviders, categoryDeleteUseCase } from '../../PropertyCrm.Application/usecases/category/categoryDeleteUseCase';
import { categoryGetPageProviders, categoryGetPageUseCase } from '../../PropertyCrm.Application/usecases/category/categoryGetPageUseCase';
import { createupdatecategoryComponent } from './create-update-category/create-update-category.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
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
    categoryDeleteProviders,
    categoryGetPageProviders,
    DialogService,
    MessageService,
    ConfirmationService,
  ],
})
export class CategoryComponent implements OnInit {
  public readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly categoryDeleteUseCase = inject(categoryDeleteUseCase);
  private readonly categoryGetPageUseCase = inject(categoryGetPageUseCase);

  public searchQuery = { data: '' };
  public pagesData: { data?: PaginationRespons<category> } = { data: undefined };
  public loading = false;

  public readonly table = new TableComponent<category>(
    this.translateService,
    this.dialogService,
    this.messageService,
    this.confirmationService,
    this.getData,
    this.searchQuery,
    this.categoryGetPageUseCase,
    this.pagesData
  );

  public readonly columns = signal<any[]>([
    { name: this.translateService.instant('name'), field: 'name' },
  ]);


  ngOnInit() {
    this.getData(this.table.PaginationParams);
  }

  getData(params: PaginationParams) {
    this.categoryGetPageUseCase.execute({ params }).subscribe((data) => {
      this.pagesData.data = data;
    });
  }

  create() {
    this.table.openCreateUpdateDialog(createupdatecategoryComponent, () => {
      this.getData(this.table.PaginationParams);
    });
  }

  update(category: category) {
    this.table.openCreateUpdateDialog(
      createupdatecategoryComponent,
      () => this.getData(this.table.PaginationParams),
      category
    );
  }

  delete(category: category) {
    console.log('Delete in presentation called for category:', category.id);
    this.table.delete(category, this.categoryDeleteUseCase, () => {
      this.getData(this.table.PaginationParams);
    });
  }
}