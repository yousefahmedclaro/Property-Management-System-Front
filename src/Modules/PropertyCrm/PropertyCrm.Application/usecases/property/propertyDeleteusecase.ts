import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';

@Injectable()
class propertyDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _propertyRepository = inject(propertyRepository);

  execute(id: string): Observable<object> {
    return this._propertyRepository.delete(id);
  }
}

const propertyDeleteProviders = [propertyRepositoryProvider, propertyDeleteUseCase];
export { propertyDeleteUseCase, propertyDeleteProviders };