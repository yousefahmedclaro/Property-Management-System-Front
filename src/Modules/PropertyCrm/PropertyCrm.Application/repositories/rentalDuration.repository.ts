import { Observable } from 'rxjs';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../Common/domain/pagination';
import { rentalDuration } from '../../PropertyCrm.Domain/rentalDuration';
import { rentalDurationRepositoryImplementation } from '../../PropertyCrm.Infrastructure/repositoryImplementation/rentalDurationRepositoryImplementation';

export abstract class rentalDurationRepository {
  abstract getPage(
    params: PaginationParams
  ): Observable<PaginationRespons<rentalDuration>>;

  abstract post(entity: rentalDuration): Observable<string>;

  abstract put(entity: rentalDuration): Observable<object>;

  abstract delete(id: string): Observable<object>;
}

export const rentalDurationRepositoryProvider = {
  provide: rentalDurationRepository,
  useClass: rentalDurationRepositoryImplementation,
};
