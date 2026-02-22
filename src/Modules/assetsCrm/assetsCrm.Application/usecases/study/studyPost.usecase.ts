import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { Study } from '../../../assetsCrm.Domain/study';
import { StudyRepository, StudyRepositoryProvider } from '../../repositories/study.repository';

@Injectable()
class StudyPostUseCase implements UseCase<Study, string> {
  private readonly _studyRepository = inject(StudyRepository);

  execute(study: Study): Observable<string> {
    return this._studyRepository.post(study);
  }
}

const StudyPostProviders = [
  StudyRepositoryProvider,
  StudyPostUseCase,
];

export { StudyPostUseCase, StudyPostProviders };