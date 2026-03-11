import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { PaginationParams, PaginationRespons } from '../../../../Common/domain/pagination';
import { contract } from '../../../PropertyCrm.Domain/contract';
import { contractRepository, contractRepositoryProvider } from '../../repositories/contract.repository';

@Injectable()
class contractGetPageUseCase implements UseCase<{ params: PaginationParams }, PaginationRespons<contract>> {
  private readonly _contractRepository = inject(contractRepository);
  execute(obj: { params: PaginationParams }): Observable<PaginationRespons<contract>> {
    return this._contractRepository.getPage(obj.params);
  }
}

const contractGetPageProviders = [contractRepositoryProvider, contractGetPageUseCase];
export { contractGetPageUseCase, contractGetPageProviders };