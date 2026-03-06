import { Observable } from 'rxjs';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { Location } from '../../PropertyCrm.Domain/location';
import { Lookup } from '../../../Common/domain/lookup';
import { locationRepositoryImplementation } from '../../PropertyCrm.Infrastructure/repositoryImplementation/locationRepositoryImplementation';

export abstract class LocationRepository {
  abstract getPage(params: PaginationParams)
  : Observable<PaginationRespons<Location>>;
  
  abstract post(location: Location): Observable<string>;

  abstract put(location: Location): Observable<object>;

  abstract delete(locationId: string): Observable<object>;

  abstract getLookupList(): Observable<Lookup[]>;

  abstract getChildLocations(parentId: string): Observable<Lookup[]>;
}

export const locationRepositoryProvider = {
  provide: LocationRepository,
  useClass: locationRepositoryImplementation,
};