import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { owner } from '../../PropertyCrm.Domain/owner';
import { ownerDto, ownerDtoMapper } from '../models/owner/ownerDto';
import { ownerRepository } from '../../PropertyCrm.Application/repositories/owner.repository';

@Injectable()
export class ownerRepositoryImplementation implements ownerRepository {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/AdminPanel/Owner`;

  getPage(params: PaginationParams): Observable<PaginationRespons<owner>> {
    return this._httpClient
      .get(`${this.baseUrl}/GetPage`, {
        params: {
          offset: params.offset ?? 0,
          pageIndex: params.pageIndex,
          search: params.search ?? '',
          ascending: params.ascending ?? true,
          sortBy: params.sortBy ?? '',
        },
      })
      .pipe(
        map((data) => {
          const respons = data as PaginationRespons<ownerDto>;
          const items: owner[] = respons.items.map((o) =>
            ownerDtoMapper.Map().mapFrom(o)
          );
          return { pageInfo: respons.pageInfo, items };
        })
      );
  }

  post(owner: owner): Observable<string> {
    return this._httpClient
      .post(this.baseUrl, {
        name: owner.name,
        email: owner.email,
        phoneNumber: owner.phoneNumber,
        budget: owner.incomeBalance,
      })
      .pipe(map((data) => data as string));
  }

  put(owner: owner): Observable<object> {
    return this._httpClient.put(this.baseUrl, {
      id: owner.id,
      name: owner.name,
      email: owner.email,
      phoneNumber: owner.phoneNumber,
      budget: owner.incomeBalance,
    });
  }

  delete(ownerId: string): Observable<object> {
    return this._httpClient.delete(this.baseUrl, {
      params: { Id: ownerId },
    });
  }
}