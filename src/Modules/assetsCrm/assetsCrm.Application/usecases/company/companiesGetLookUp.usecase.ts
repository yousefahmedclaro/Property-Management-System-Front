import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import {
  CompaniesRepository,
  CompanyRepositoryProvider,
} from '../../repositories/company.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class CompaniesGetLookUpUseCase implements UseCaseWithOutInPut<Lookup[]> {
  private readonly _companiesRepository: CompaniesRepository =
    inject(CompaniesRepository);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  execute(): Observable<Lookup[]> {
    return this._companiesRepository.getLookUpList();
  }
}

const CompaniesGetLookUpProviders = [
  CompanyRepositoryProvider,
  CompaniesGetLookUpUseCase,
];
export { CompaniesGetLookUpUseCase, CompaniesGetLookUpProviders };

