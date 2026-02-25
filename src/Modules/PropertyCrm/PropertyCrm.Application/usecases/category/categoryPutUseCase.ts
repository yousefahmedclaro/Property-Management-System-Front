import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { category } from '../../../PropertyCrm.Domain/category';
import { categoryRepository, categoryRepositoryProvider } from '../../repositories/category.repository';

@Injectable()
class categoryPutUseCase implements UseCaseWithOutOutPut<category> {
  private readonly _categoryRepository = inject(categoryRepository);

  execute(category: category): Observable<object> {
    return this._categoryRepository.put(category);
  }
}

const categoryPutProviders = [
  categoryRepositoryProvider,
  categoryPutUseCase,
];

export { categoryPutUseCase, categoryPutProviders };
