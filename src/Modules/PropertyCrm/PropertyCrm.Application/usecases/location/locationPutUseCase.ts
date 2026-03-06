import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { Location } from '../../../PropertyCrm.Domain/location';
import { LocationRepository, locationRepositoryProvider } from '../../repositories/locations.repository';

@Injectable()
class LocationPutUseCase implements UseCaseWithOutOutPut<Location> {
  private readonly _locationRepository = inject(LocationRepository);

  execute(location: Location): Observable<object> {
    return this._locationRepository.put(location);
  }
}

const LocationPutProviders = [locationRepositoryProvider, LocationPutUseCase];
export { LocationPutUseCase, LocationPutProviders };