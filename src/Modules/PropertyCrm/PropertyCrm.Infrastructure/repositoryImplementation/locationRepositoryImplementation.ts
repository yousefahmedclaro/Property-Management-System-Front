import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { Location } from '../../PropertyCrm.Domain/location';
import { LocationDto, LocationDtoMapper } from '../models/location/locationDto';
import { Lookup } from '../../../Common/domain/lookup';
import { LocationRepository } from '../../PropertyCrm.Application/repositories/locations.repository';

@Injectable()
export class locationRepositoryImplementation implements LocationRepository {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/AdminPanel/Locations`;

  getPage(params: PaginationParams): Observable<PaginationRespons<Location>> {
    return this._httpClient
      .get(this.baseUrl + '/GetPage', {
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
          const respons = data as PaginationRespons<LocationDto>;
          const items: Location[] = respons.items.map((l) =>
            LocationDtoMapper.Map().mapFrom(l)
          );
          return { pageInfo: respons.pageInfo, items };
        })
      );
  }

  post(location: Location): Observable<string> {
  return this._httpClient
    .post(`${this.baseUrl}/Post`, {  // ← add /Post
      name: {
        ar: location.name?.ar,
        en: location.name?.en,
      },
      parentLocationId: location.parentLocationId ?? null,
    })
    .pipe(map((data) => data as string));
}

put(location: Location): Observable<object> {
  return this._httpClient.put(`${this.baseUrl}/Put`, {  // ← add /Put
    id: location.id,
    name: {
      ar: location.name?.ar,
      en: location.name?.en,
    },
    parentLocationId: location.parentLocationId ?? null,
  });
}





  delete(locationId: string): Observable<object> {
    return this._httpClient.delete(this.baseUrl, {
      params: { Id: locationId },
    });
  }

  getLookupList(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(this.baseUrl + '/GetLookupList')
      .pipe(map((data) => data as Lookup[]));
  }

  getChildLocations(parentId: string): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(this.baseUrl + '/GetChildLocations', {
        params: { parentId },
      })
      .pipe(map((data) => data as Lookup[]));
  }
}