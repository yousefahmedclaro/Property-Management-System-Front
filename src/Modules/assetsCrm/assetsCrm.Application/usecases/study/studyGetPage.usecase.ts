import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { PaginationParams, PaginationRespons } from '../../../../Common/domain/pagination';
import { Study } from '../../../assetsCrm.Domain/study';
import { StudyRepository, StudyRepositoryProvider } from '../../repositories/study.repository';

@Injectable()
class StudyGetPageUseCase implements UseCase<
  { params: PaginationParams; assetId: string },
  PaginationRespons<Study>
> {
  private readonly _studyRepository = inject(StudyRepository);

  execute(obj: {
    params: PaginationParams;
    assetId: string;
  }): Observable<PaginationRespons<Study>> {
    return this._studyRepository.getPage(obj.params, obj.assetId);
  }
}

const StudyGetPageProviders = [
  StudyRepositoryProvider,
  StudyGetPageUseCase,
];

export { StudyGetPageUseCase, StudyGetPageProviders };