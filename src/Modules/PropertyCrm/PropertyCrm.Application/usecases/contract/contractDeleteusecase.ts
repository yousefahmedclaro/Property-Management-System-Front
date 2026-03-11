import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { contractRepository, contractRepositoryProvider } from '../../repositories/contract.repository';

@Injectable()
class contractDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _contractRepository = inject(contractRepository);
  execute(id: string): Observable<object> {
    return this._contractRepository.delete(id);
  }
}

const contractDeleteProviders = [contractRepositoryProvider, contractDeleteUseCase];
export { contractDeleteUseCase, contractDeleteProviders };