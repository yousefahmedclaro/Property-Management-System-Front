import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class propertyGetOwnerLookupUseCase implements UseCaseWithOutInPut<Lookup[]> {
  private readonly _propertyRepository = inject(propertyRepository);
  execute(): Observable<Lookup[]> {
    return this._propertyRepository.getOwnerLookup();
  }
}

const propertyGetOwnerLookupProviders = [propertyRepositoryProvider, propertyGetOwnerLookupUseCase];
export { propertyGetOwnerLookupUseCase, propertyGetOwnerLookupProviders };