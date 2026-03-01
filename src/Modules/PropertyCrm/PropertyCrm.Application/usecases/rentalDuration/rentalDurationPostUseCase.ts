import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { rentalDuration } from '../../../PropertyCrm.Domain/rentalDuration';
import { rentalDurationRepository, rentalDurationRepositoryProvider } from '../../repositories/rentalDuration.repository';

@Injectable()
class rentalDurationPostUseCase implements UseCase<rentalDuration, string> {
  private readonly _rentalDurationRepository = inject(rentalDurationRepository);

  execute(rentalDuration: rentalDuration): Observable<string> {
    return this._rentalDurationRepository.post(rentalDuration);
  }
}

const rentalDurationPostProviders = [
  rentalDurationRepositoryProvider,
  rentalDurationPostUseCase,
];

export { rentalDurationPostUseCase, rentalDurationPostProviders };
