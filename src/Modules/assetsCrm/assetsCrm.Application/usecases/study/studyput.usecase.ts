import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { Study } from '../../../assetsCrm.Domain/study';
import { StudyRepository, StudyRepositoryProvider } from '../../repositories/study.repository';

@Injectable()
class StudyPutUseCase implements UseCaseWithOutOutPut<Study> {
  private readonly _studyRepository = inject(StudyRepository);

  execute(study: Study): Observable<object> {
    return this._studyRepository.put(study);
  }
}
const StudyPutProviders = [
  StudyRepositoryProvider,
  StudyPutUseCase,
];
export { StudyPutUseCase, StudyPutProviders };