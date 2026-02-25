import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../Common/domain/pagination';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { renterDto, renterDtoMapper } from '../models/renter/rentertDto';
import { renterRepository } from '../../PropertyCrm.Application/repositories/renter.repository';
import { renter } from '../../PropertyCrm.Domain/renter';

    
@Injectable()
export class renterRepositoryImplementation implements renterRepository {
  private readonly _httpClient = inject(HttpClient);

  getPage(params: PaginationParams): Observable<PaginationRespons<renter>> {
    return this._httpClient
      .get(`${environment.apiUrl}/v1/AdminPanel/Renter/GetPage`, {
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
          let respons: PaginationRespons<renterDto> =
            data as PaginationRespons<renterDto>;

          const items: renter[] = respons.items.map((c) =>
            renterDtoMapper.Map().mapFrom(c)
          );

          return {
            pageInfo: respons.pageInfo,
            items: items,
          };
        })
      );
  }

   post(renter: renter): Observable<string> {
    return this._httpClient
      .post(`${environment.apiUrl}/v1/AdminPanel/Renter`, {
        name: renter.name,
        budget: renter.budget,
        email: renter.email,
        phoneNumber: renter.phoneNumber
      })
      .pipe(map((data) => data as string));
  }

  put(renter: renter): Observable<object> {
    return this._httpClient.put(
      `${environment.apiUrl}/v1/AdminPanel/Renter`, 
      {
        name: renter.name,
        id: renter.id,
        budget: renter.budget,
        email: renter.email,
        phoneNumber: renter.phoneNumber
      }
    );
  }

  delete(renterId: string): Observable<object> {
    console.log('renterRepositoryImplementation delete called with renterId:', renterId);
    return this._httpClient.delete(
      `${environment.apiUrl}/v1/AdminPanel/Renter`,
      {
        params: {
          Id: renterId,
        },
      }
    );
  }
}
