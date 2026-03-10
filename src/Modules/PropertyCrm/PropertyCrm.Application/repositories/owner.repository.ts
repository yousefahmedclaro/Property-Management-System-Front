import { Observable } from 'rxjs';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { owner } from '../../PropertyCrm.Domain/owner';
import { ownerRepositoryImplementation } from '../../PropertyCrm.Infrastructure/repositoryImplementation/ownerRepositoryImplementation';

export abstract class ownerRepository {
  abstract getPage(params: PaginationParams): Observable<PaginationRespons<owner>>;
  abstract post(owner: owner): Observable<string>;
  abstract put(owner: owner): Observable<object>;
  abstract delete(ownerId: string): Observable<object>;
}

export const ownerRepositoryProvider = {
  provide: ownerRepository,
  useClass: ownerRepositoryImplementation,
};