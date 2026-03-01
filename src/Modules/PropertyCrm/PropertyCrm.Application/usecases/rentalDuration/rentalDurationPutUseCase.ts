import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { rentalDuration } from '../../../PropertyCrm.Domain/rentalDuration';
import { rentalDurationRepository, rentalDurationRepositoryProvider } from '../../repositories/rentalDuration.repository';

@Injectable()
class rentalDurationPutUseCase implements UseCaseWithOutOutPut<rentalDuration> {
  private readonly _rentalDurationRepository = inject(rentalDurationRepository);

  execute(rentalDuration: rentalDuration): Observable<object> {
    return this._rentalDurationRepository.put(rentalDuration);
  }
}

const rentalDurationPutProviders = [
  rentalDurationRepositoryProvider,
  rentalDurationPutUseCase,
];

export { rentalDurationPutUseCase, rentalDurationPutProviders };
