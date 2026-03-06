import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { Location } from '../../../PropertyCrm.Domain/location';
import { LocationRepository, locationRepositoryProvider } from '../../repositories/locations.repository';

@Injectable()
class LocationPostUseCase implements UseCase<Location, string> {
  private readonly _locationRepository = inject(LocationRepository);

  execute(location: Location): Observable<string> {
    return this._locationRepository.post(location);
  }
}

const LocationPostProviders = [locationRepositoryProvider, LocationPostUseCase];
export { LocationPostUseCase, LocationPostProviders };