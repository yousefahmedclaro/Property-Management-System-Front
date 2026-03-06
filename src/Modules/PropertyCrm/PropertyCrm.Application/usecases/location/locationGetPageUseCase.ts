import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { PaginationParams, PaginationRespons } from '../../../../Common/domain/pagination';
import { Location } from '../../../PropertyCrm.Domain/location';
import { LocationRepository, locationRepositoryProvider } from '../../repositories/locations.repository';

@Injectable()
class LocationGetPageUseCase implements UseCase<{ params: PaginationParams }, PaginationRespons<Location>> {
  private readonly _locationRepository = inject(LocationRepository);

  execute(obj: { params: PaginationParams }): Observable<PaginationRespons<Location>> {
    return this._locationRepository.getPage(obj.params);
  }
}

const LocationGetPageProviders = [locationRepositoryProvider, LocationGetPageUseCase];
export { LocationGetPageUseCase, LocationGetPageProviders };