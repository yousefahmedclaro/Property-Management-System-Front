import { Observable } from 'rxjs';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../Common/domain/pagination';
import { renter } from '../../PropertyCrm.Domain/renter';
import { renterRepositoryImplementation } from '../../PropertyCrm.Infrastructure/repositoryImplementation/renterRepositoryImplementation';

export abstract class renterRepository {
  abstract getPage(
    params: PaginationParams
  ): Observable<PaginationRespons<renter>>;
  
  abstract post(renter: renter): Observable<string>;

  abstract put(renter: renter): Observable<object>;

  abstract delete(renterId: string): Observable<object>;
}

export const renterRepositoryProvider = {
  provide: renterRepository,
  useClass: renterRepositoryImplementation,
};
