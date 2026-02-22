import { Observable } from 'rxjs';
import { StudyRepositoryImplementation } from '../../assetsCrm.Infrastructure/repositoryImplementation/studyRepositoryImplementation';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { Study } from '../../assetsCrm.Domain/study';

export abstract class StudyRepository {
  abstract getPage(
    params: PaginationParams,
    assetId: string  
  ): Observable<PaginationRespons<Study>>;

  abstract getList(): Observable<Study[]>;
  
  abstract getById(id: string): Observable<Study>; 

  abstract post(study: Study): Observable<string>;

  abstract put(study: Study): Observable<object>;

  abstract delete(studyId: string): Observable<object>;
}

export const StudyRepositoryProvider = {
  provide: StudyRepository,
  useClass: StudyRepositoryImplementation,
};