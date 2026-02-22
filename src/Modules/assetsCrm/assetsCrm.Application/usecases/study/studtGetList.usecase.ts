import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { Study } from '../../../assetsCrm.Domain/study';
import { StudyRepository, StudyRepositoryProvider } from '../../repositories/study.repository';

@Injectable()
class StudyGetListUseCase implements UseCaseWithOutInPut<Study[]> {
  private readonly _studyRepository = inject(StudyRepository);

  execute(): Observable<Study[]> {
    return this._studyRepository.getList();
  }
}

const StudyGetListProviders = [
  StudyRepositoryProvider,
  StudyGetListUseCase,
];

export { StudyGetListUseCase, StudyGetListProviders };