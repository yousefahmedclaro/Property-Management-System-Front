import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { StudyRepository, StudyRepositoryProvider } from '../../repositories/study.repository';

@Injectable()
class StudyDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _studyRepository = inject(StudyRepository);

  execute(studyId: string): Observable<object> {
    return this._studyRepository.delete(studyId);
  }
}

const StudyDeleteProviders = [
  StudyRepositoryProvider,
  StudyDeleteUseCase,
];

export { StudyDeleteUseCase, StudyDeleteProviders };
