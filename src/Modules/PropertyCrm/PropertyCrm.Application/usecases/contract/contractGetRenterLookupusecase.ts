import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { contractRepository, contractRepositoryProvider } from '../../repositories/contract.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class contractGetRenterLookupUseCase implements UseCaseWithOutInPut<Lookup[]> {
  private readonly _contractRepository = inject(contractRepository);
  execute(): Observable<Lookup[]> { return this._contractRepository.getRenterLookup(); }
}

const contractGetRenterLookupProviders = [contractRepositoryProvider, contractGetRenterLookupUseCase];
export { contractGetRenterLookupUseCase, contractGetRenterLookupProviders };