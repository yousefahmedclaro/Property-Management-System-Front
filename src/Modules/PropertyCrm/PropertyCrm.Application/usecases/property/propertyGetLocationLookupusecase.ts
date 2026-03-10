import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class propertyGetLocationLookupUseCase implements UseCaseWithOutInPut<Lookup[]> {
  private readonly _propertyRepository = inject(propertyRepository);
  execute(): Observable<Lookup[]> {
    return this._propertyRepository.getLocationLookup();
  }
}

const propertyGetLocationLookupProviders = [propertyRepositoryProvider, propertyGetLocationLookupUseCase];
export { propertyGetLocationLookupUseCase, propertyGetLocationLookupProviders };