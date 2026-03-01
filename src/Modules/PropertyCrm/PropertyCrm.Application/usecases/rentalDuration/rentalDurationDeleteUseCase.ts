import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { rentalDurationRepository, rentalDurationRepositoryProvider } from '../../repositories/rentalDuration.repository';

@Injectable()
class rentalDurationDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _rentalDurationRepository = inject(rentalDurationRepository);

  execute(id: string): Observable<object> {
    return this._rentalDurationRepository.delete(id);
  }
}

const rentalDurationDeleteProviders = [
  rentalDurationRepositoryProvider,
  rentalDurationDeleteUseCase,
];

export { rentalDurationDeleteUseCase, rentalDurationDeleteProviders };
