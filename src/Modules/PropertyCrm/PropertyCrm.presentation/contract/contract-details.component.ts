import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { contractGetProviders, contractGetUseCase } from '../../PropertyCrm.Application/usecases/contract/contractGetusecase';
import { contract } from '../../PropertyCrm.Domain/contract';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  standalone: true,
  imports: [TranslateModule, ButtonModule, CommonModule],
  providers: [contractGetProviders],
})
export class ContractDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly contractGetUseCase = inject(contractGetUseCase);

  public contract: contract | null = null;
  public loading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contractGetUseCase.execute(id).subscribe({
        next: (data) => { this.contract = data; this.loading = false; },
        error: () => { this.loading = false; }
      });
    }
  }

  goBack() { this.router.navigate(['/contract']); }
}