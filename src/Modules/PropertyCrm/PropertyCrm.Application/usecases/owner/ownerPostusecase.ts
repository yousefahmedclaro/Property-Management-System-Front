import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { owner } from '../../../PropertyCrm.Domain/owner';
import { ownerRepository, ownerRepositoryProvider } from '../../repositories/owner.repository';

@Injectable()
class ownerPostUseCase implements UseCase<owner, string> {
  private readonly _ownerRepository = inject(ownerRepository);

  execute(owner: owner): Observable<string> {
    return this._ownerRepository.post(owner);
  }
}

const ownerPostProviders = [ownerRepositoryProvider, ownerPostUseCase];
export { ownerPostUseCase, ownerPostProviders };