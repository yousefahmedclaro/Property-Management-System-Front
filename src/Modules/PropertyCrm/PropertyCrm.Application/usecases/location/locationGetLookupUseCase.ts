import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { Lookup } from '../../../../Common/domain/lookup';
import { LocationRepository, locationRepositoryProvider } from '../../repositories/locations.repository';

@Injectable()
class LocationGetLookupUseCase implements UseCaseWithOutInPut<Lookup[]> {
  private readonly _locationRepository = inject(LocationRepository);

  execute(): Observable<Lookup[]> {
    return this._locationRepository.getLookupList();
  }
}

const LocationGetLookupProviders = [locationRepositoryProvider, LocationGetLookupUseCase];
export { LocationGetLookupUseCase, LocationGetLookupProviders };