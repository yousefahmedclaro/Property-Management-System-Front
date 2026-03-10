import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { property } from '../../../PropertyCrm.Domain/property';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';

@Injectable()
class propertyPostUseCase implements UseCase<property, string> {
  private readonly _propertyRepository = inject(propertyRepository);

  execute(property: property): Observable<string> {
    return this._propertyRepository.post(property);
  }
}

const propertyPostProviders = [propertyRepositoryProvider, propertyPostUseCase];
export { propertyPostUseCase, propertyPostProviders };