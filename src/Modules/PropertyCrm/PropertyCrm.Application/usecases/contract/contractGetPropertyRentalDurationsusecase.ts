import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { contractRepository, contractRepositoryProvider } from '../../repositories/contract.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class contractGetPropertyRentalDurationsUseCase implements UseCase<string, Lookup[]> {
  private readonly _contractRepository = inject(contractRepository);
  execute(propertyId: string): Observable<Lookup[]> {
    return this._contractRepository.getPropertyRentalDurations(propertyId);
  }
}

const contractGetPropertyRentalDurationsProviders = [contractRepositoryProvider, contractGetPropertyRentalDurationsUseCase];
export { contractGetPropertyRentalDurationsUseCase, contractGetPropertyRentalDurationsProviders };