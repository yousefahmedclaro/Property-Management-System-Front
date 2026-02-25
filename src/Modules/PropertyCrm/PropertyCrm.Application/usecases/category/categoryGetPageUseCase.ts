import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../../Common/domain/pagination';
import { category } from '../../../PropertyCrm.Domain/category';
import { categoryRepository, categoryRepositoryProvider } from '../../repositories/category.repository';

@Injectable()
class categoryGetPageUseCase implements UseCase<
  { params: PaginationParams },
  PaginationRespons<category>
> {
  private readonly _categoryRepository = inject(categoryRepository);

  execute(obj: {
    params: PaginationParams;
  }): Observable<PaginationRespons<category>> {
    return this._categoryRepository.getPage(obj.params);
  }
}

const categoryGetPageProviders = [
  categoryRepositoryProvider,
  categoryGetPageUseCase,
];

export { categoryGetPageUseCase, categoryGetPageProviders };
