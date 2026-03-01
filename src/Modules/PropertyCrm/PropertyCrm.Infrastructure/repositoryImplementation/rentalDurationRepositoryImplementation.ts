import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../Common/domain/pagination';
import { rentalDuration } from '../../PropertyCrm.Domain/rentalDuration';
import {
  rentalDurationDto,
  rentalDurationDtoMapper,
} from '../models/rentalDuration/rentalDurationDto';
import { rentalDurationRepository } from '../../PropertyCrm.Application/repositories/rentalDuration.repository';

@Injectable()
export class rentalDurationRepositoryImplementation
  implements rentalDurationRepository
{
  private readonly _httpClient = inject(HttpClient);

  getPage(params: PaginationParams): Observable<PaginationRespons<rentalDuration>> {
    return this._httpClient
      .get(`${environment.apiUrl}/v1/AdminPanel/RentalDuration/GetPage`, {
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
          const response = data as PaginationRespons<rentalDurationDto>;

          const items = response.items.map((x) =>
            rentalDurationDtoMapper.Map().mapFrom(x)
          );

          return {
            pageInfo: response.pageInfo,
            items,
          };
        })
      );
  }

  post(entity: rentalDuration): Observable<string> {
    return this._httpClient
      .post(`${environment.apiUrl}/v1/AdminPanel/RentalDuration`, {
        months: entity.months,
        name: entity.name,
      })
      .pipe(map((x) => x as string));
  }

  put(entity: rentalDuration): Observable<object> {
    return this._httpClient.put(
      `${environment.apiUrl}/v1/AdminPanel/RentalDuration`,
      {
        id: entity.id,
        months: entity.months,
        name: entity.name,
      }
    );
  }

  delete(id: string): Observable<object> {
    return this._httpClient.delete(
      `${environment.apiUrl}/v1/AdminPanel/RentalDuration`,
      {
        params: { Id: id },
      }
    );
  }
}
