import { Observable } from 'rxjs';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { contract } from '../../PropertyCrm.Domain/contract';
import { Lookup } from '../../../Common/domain/lookup';
import { contractRepositoryImplementation } from '../../PropertyCrm.Infrastructure/repositoryImplementation/contractRepositoryImplementation';

export abstract class contractRepository {
  abstract getPage(params: PaginationParams): Observable<PaginationRespons<contract>>;
  abstract get(id: string): Observable<contract>;
  abstract post(contract: contract): Observable<string>;
  abstract delete(contractId: string): Observable<object>;
  abstract getOwnerLookup(): Observable<Lookup[]>;
  abstract getRenterLookup(): Observable<Lookup[]>;
  abstract getPropertyLookup(): Observable<Lookup[]>;
  abstract getPropertyRentalDurations(propertyId: string): Observable<Lookup[]>;
}

export const contractRepositoryProvider = {
  provide: contractRepository,
  useClass: contractRepositoryImplementation,
};