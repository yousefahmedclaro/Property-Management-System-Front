import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { contract } from '../../../PropertyCrm.Domain/contract';
import { contractRepository, contractRepositoryProvider } from '../../repositories/contract.repository';

@Injectable()
class contractPostUseCase implements UseCase<contract, string> {
  private readonly _contractRepository = inject(contractRepository);
  execute(contract: contract): Observable<string> {
    return this._contractRepository.post(contract);
  }
}

const contractPostProviders = [contractRepositoryProvider, contractPostUseCase];
export { contractPostUseCase, contractPostProviders };