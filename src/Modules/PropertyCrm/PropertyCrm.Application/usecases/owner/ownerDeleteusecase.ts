import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { ownerRepository, ownerRepositoryProvider } from '../../repositories/owner.repository';

@Injectable()
class ownerDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _ownerRepository = inject(ownerRepository);

  execute(id: string): Observable<object> {
    return this._ownerRepository.delete(id);
  }
}

const ownerDeleteProviders = [ownerRepositoryProvider, ownerDeleteUseCase];
export { ownerDeleteUseCase, ownerDeleteProviders };