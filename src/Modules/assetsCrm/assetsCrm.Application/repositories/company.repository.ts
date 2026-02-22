import { Observable } from 'rxjs';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../Common/domain/pagination';
import { Company } from '../../assetsCrm.Domain/company';
import { CompanyRepositoryImplementation } from '../../assetsCrm.Infrastructure/repositoryImplementation/company.repositoryImplementation';
import { Lookup } from '../../../Common/domain/lookup';

export abstract class CompaniesRepository {
  abstract getPage(
    params: PaginationParams
  ): Observable<PaginationRespons<Company>>;

  abstract getList(): Observable<Company[]>;

  abstract get(id: string): Observable<Company>;

   abstract getLookUpList(): Observable<Lookup[]>;

  abstract post(data: { company: Company; logo: File }): Observable<string>;

  abstract put(data: { company: Company; logo: File }): Observable<object>;

  abstract delete(Company: string): Observable<object>;
}

export const CompanyRepositoryProvider = {
  provide: CompaniesRepository,
  useClass: CompanyRepositoryImplementation,
};
