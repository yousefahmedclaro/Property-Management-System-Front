import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { Company } from '../../../assetsCrm.Domain/company';
import { CompaniesRepository, CompanyRepositoryProvider } from '../../repositories/company.repository';

@Injectable()
class GetCompanyUseCase implements UseCase<string, Company> {
  private readonly _companyRepository: CompaniesRepository =
    inject(CompaniesRepository);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  execute(id: string): Observable<Company> {
    return this._companyRepository.get(id);
  }
}

const GetCompanyProviders = [CompanyRepositoryProvider, GetCompanyUseCase];
export { GetCompanyUseCase, GetCompanyProviders };