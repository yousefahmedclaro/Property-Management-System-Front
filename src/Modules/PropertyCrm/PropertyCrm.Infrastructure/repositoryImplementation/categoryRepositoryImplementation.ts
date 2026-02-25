import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../Common/domain/pagination';
import { category } from '../../PropertyCrm.Domain/category';
import {
  categoryDto,
  categoryDtoMapper,
} from '../models/category/categoryDto';
import { categoryRepository } from '../../PropertyCrm.Application/repositories/category.repository';

@Injectable()
export class categoryRepositoryImplementation
  implements categoryRepository
{
  private readonly _httpClient = inject(HttpClient);

  getPage(params: PaginationParams): Observable<PaginationRespons<category>> {
    return this._httpClient
      .get(`${environment.apiUrl}/v1/AdminPanel/Category/GetPage`, {
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
          const respons = data as PaginationRespons<categoryDto>;

          const items: category[] = respons.items.map((c) =>
            categoryDtoMapper.Map().mapFrom(c)
          );

          return {
            pageInfo: respons.pageInfo,
            items,
          };
        })
      );
  }

  post(category: category): Observable<string> {
    return this._httpClient
      .post(`${environment.apiUrl}/v1/AdminPanel/Category`, {
        name: category.name,
      })
      .pipe(map((data) => data as string));
  }

  put(category: category): Observable<object> {
    return this._httpClient.put(
      `${environment.apiUrl}/v1/AdminPanel/Category`,
      {
        id: category.id,
        name: category.name,
      }
    );
  }

  delete(categoryId: string): Observable<object> {
    return this._httpClient.delete(
      `${environment.apiUrl}/v1/AdminPanel/Category`,
      {
        params: { Id: categoryId },
      }
    );
  }
}
