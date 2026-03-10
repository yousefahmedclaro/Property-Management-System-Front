import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { property } from '../../../PropertyCrm.Domain/property';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';

@Injectable()
class propertyPutUseCase implements UseCaseWithOutOutPut<property> {
  private readonly _propertyRepository = inject(propertyRepository);

  execute(property: property): Observable<object> {
    return this._propertyRepository.put(property);
  }
}

const propertyPutProviders = [propertyRepositoryProvider, propertyPutUseCase];
export { propertyPutUseCase, propertyPutProviders };