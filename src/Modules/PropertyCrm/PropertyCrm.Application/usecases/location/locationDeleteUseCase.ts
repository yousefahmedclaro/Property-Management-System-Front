import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { LocationRepository, locationRepositoryProvider } from '../../repositories/locations.repository';

@Injectable()
class LocationDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _locationRepository = inject(LocationRepository);

  execute(id: string): Observable<object> {
    return this._locationRepository.delete(id);
  }
}

const LocationDeleteProviders = [locationRepositoryProvider, LocationDeleteUseCase];
export { LocationDeleteUseCase, LocationDeleteProviders };