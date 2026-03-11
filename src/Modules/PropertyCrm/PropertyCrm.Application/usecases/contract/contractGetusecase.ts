import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { contract } from '../../../PropertyCrm.Domain/contract';
import { contractRepository, contractRepositoryProvider } from '../../repositories/contract.repository';

@Injectable()
class contractGetUseCase implements UseCase<string, contract> {
  private readonly _contractRepository = inject(contractRepository);
  execute(id: string): Observable<contract> {
    return this._contractRepository.get(id);
  }
}

const contractGetProviders = [contractRepositoryProvider, contractGetUseCase];
export { contractGetUseCase, contractGetProviders };