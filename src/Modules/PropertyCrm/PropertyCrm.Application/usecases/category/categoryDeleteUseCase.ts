import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { categoryRepository, categoryRepositoryProvider } from '../../repositories/category.repository';

@Injectable()
class categoryDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _categoryRepository = inject(categoryRepository);

  execute(id: string): Observable<object> {
    return this._categoryRepository.delete(id);
  }
}

const categoryDeleteProviders = [
  categoryRepositoryProvider,
  categoryDeleteUseCase,
];

export { categoryDeleteUseCase, categoryDeleteProviders };
