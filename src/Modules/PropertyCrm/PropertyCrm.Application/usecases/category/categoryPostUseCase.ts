import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { category } from '../../../PropertyCrm.Domain/category';
import { categoryRepository, categoryRepositoryProvider } from '../../repositories/category.repository';

@Injectable()
class categoryPostUseCase implements UseCase<category, string> {
  private readonly _categoryRepository = inject(categoryRepository);

  execute(category: category): Observable<string> {
    return this._categoryRepository.post(category);
  }
}

const categoryPostProviders = [
  categoryRepositoryProvider,
  categoryPostUseCase,
];

export { categoryPostUseCase, categoryPostProviders };
