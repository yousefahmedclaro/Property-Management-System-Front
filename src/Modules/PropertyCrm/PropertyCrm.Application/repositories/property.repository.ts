import { Observable } from 'rxjs';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { property } from '../../PropertyCrm.Domain/property';
import { Lookup } from '../../../Common/domain/lookup';
import { propertyRepositoryImplementation } from '../../PropertyCrm.Infrastructure/repositoryImplementation/propertyRepositoryImplementation';

export abstract class propertyRepository {
  abstract getPage(params: PaginationParams): Observable<PaginationRespons<property>>;
  abstract get(id: string): Observable<property>;
  abstract post(property: property): Observable<string>;
  abstract put(property: property): Observable<object>;
  abstract delete(propertyId: string): Observable<object>;
  abstract getOwnerLookup(): Observable<Lookup[]>;
  abstract getCategoryLookup(): Observable<Lookup[]>;
  abstract getLocationLookup(): Observable<Lookup[]>;
  abstract getChildLocations(parentId: string): Observable<Lookup[]>;
  abstract getRentalDurationLookup(): Observable<Lookup[]>;
}

export const propertyRepositoryProvider = {
  provide: propertyRepository,
  useClass: propertyRepositoryImplementation,
};