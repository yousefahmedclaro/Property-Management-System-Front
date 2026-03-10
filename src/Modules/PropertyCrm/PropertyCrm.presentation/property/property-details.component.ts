import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { propertyGetProviders, propertyGetUseCase } from '../../PropertyCrm.Application/usecases/property/propertyGet.usecase';
import { property } from '../../PropertyCrm.Domain/property';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonModule,
    CommonModule,
  ],
  providers: [
    propertyGetProviders,
  ],
})
export class PropertyDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly propertyGetUseCase = inject(propertyGetUseCase);

  public property: property | null = null;
  public loading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.propertyGetUseCase.execute(id).subscribe({
        next: (data) => {
          this.property = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/property']);
  }
}