import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { Lookup } from '../../../../Common/domain/lookup';
import { LocationRepository, locationRepositoryProvider } from '../../repositories/locations.repository';

@Injectable()
class LocationGetChildUseCase implements UseCase<string, Lookup[]> {
  private readonly _locationRepository = inject(LocationRepository);

  execute(parentId: string): Observable<Lookup[]> {
    return this._locationRepository.getChildLocations(parentId);
  }
}

const LocationGetChildProviders = [locationRepositoryProvider, LocationGetChildUseCase];
export { LocationGetChildUseCase, LocationGetChildProviders };