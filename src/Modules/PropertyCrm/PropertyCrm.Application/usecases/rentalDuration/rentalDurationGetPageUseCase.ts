import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../../Common/domain/pagination';
import { rentalDuration } from '../../../PropertyCrm.Domain/rentalDuration';
import { rentalDurationRepository, rentalDurationRepositoryProvider } from '../../repositories/rentalDuration.repository';

@Injectable()
class rentalDurationGetPageUseCase implements UseCase<
  { params: PaginationParams },
  PaginationRespons<rentalDuration>
> {
  private readonly _rentalDurationRepository = inject(rentalDurationRepository);

  execute(obj: {
    params: PaginationParams;
  }): Observable<PaginationRespons<rentalDuration>> {
    return this._rentalDurationRepository.getPage(obj.params);
  }
}

const rentalDurationGetPageProviders = [
  rentalDurationRepositoryProvider,
  rentalDurationGetPageUseCase,
];

export { rentalDurationGetPageUseCase, rentalDurationGetPageProviders };
