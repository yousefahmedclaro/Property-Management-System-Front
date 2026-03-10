import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { property } from '../../PropertyCrm.Domain/property';
import { propertyDto, propertyDtoMapper } from '../models/property/propertyDto';
import { propertyRepository } from '../../PropertyCrm.Application/repositories/property.repository';
import { Lookup } from '../../../Common/domain/lookup';

@Injectable()
export class propertyRepositoryImplementation implements propertyRepository {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/AdminPanel/Property`;

  getPage(params: PaginationParams): Observable<PaginationRespons<property>> {
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
          const respons = data as PaginationRespons<propertyDto>;
          const items: property[] = respons.items.map((p) =>
            propertyDtoMapper.Map().mapFrom(p)
          );
          return { pageInfo: respons.pageInfo, items };
        })
      );
  }

  get(id: string): Observable<property> {
  return this._httpClient
    .get(`${this.baseUrl}/Get`, { params: { id } })
    .pipe(map((data) => propertyDtoMapper.Map().mapFrom(data as propertyDto)));
}

  post(property: property): Observable<string> {
    return this._httpClient
      .post(this.baseUrl, {
        ownerId: property.ownerId,
        categoryId: property.categoryId,
        locationId: property.locationId,
        code: property.code,
        price: property.price,
        size: property.size,
        buildingNumber: property.buildingNumber,
        allowedRentalDurationIds: property.allowedRentalDurationIds,
      })
      .pipe(map((data) => data as string));
  }

  put(property: property): Observable<object> {
    return this._httpClient.put(this.baseUrl, {
      id: property.id,
      ownerId: property.ownerId,
      categoryId: property.categoryId,
      locationId: property.locationId,
      code: property.code,
      price: property.price,
      size: property.size,
      buildingNumber: property.buildingNumber,
      allowedRentalDurationIds: property.allowedRentalDurationIds,
    });
  }

  delete(propertyId: string): Observable<object> {
    return this._httpClient.delete(this.baseUrl, {
      params: { Id: propertyId },
    });
  }

  getOwnerLookup(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/Owner/GetLookupList`)
      .pipe(map((data) => data as Lookup[]));
  }

  getCategoryLookup(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/Category/GetLookupList`)
      .pipe(map((data) => data as Lookup[]));
  }

  getLocationLookup(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/Locations/GetLookupList`)
      .pipe(map((data) => data as Lookup[]));
  }

  getChildLocations(parentId: string): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/Locations/GetChildLocations`, {
        params: { parentId },
      })
      .pipe(map((data) => data as Lookup[]));
  }

  getRentalDurationLookup(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/RentalDuration/GetLookupList`)
      .pipe(map((data) => data as Lookup[]));
  }
}