import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { owner } from '../../../PropertyCrm.Domain/owner';
import { ownerRepository, ownerRepositoryProvider } from '../../repositories/owner.repository';

@Injectable()
class ownerPutUseCase implements UseCaseWithOutOutPut<owner> {
  private readonly _ownerRepository = inject(ownerRepository);

  execute(owner: owner): Observable<object> {
    return this._ownerRepository.put(owner);
  }
}

const ownerPutProviders = [ownerRepositoryProvider, ownerPutUseCase];
export { ownerPutUseCase, ownerPutProviders };