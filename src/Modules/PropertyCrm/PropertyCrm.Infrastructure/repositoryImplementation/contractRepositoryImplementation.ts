import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { contract } from '../../PropertyCrm.Domain/contract';
import { contractDto, contractDtoMapper } from '../models/contract/contractDto';
import { contractRepository } from '../../PropertyCrm.Application/repositories/contract.repository';
import { Lookup } from '../../../Common/domain/lookup';

@Injectable()
export class contractRepositoryImplementation implements contractRepository {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/AdminPanel/Contract`;

  getPage(params: PaginationParams): Observable<PaginationRespons<contract>> {
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
          const respons = data as PaginationRespons<contractDto>;
          const items: contract[] = respons.items.map((c) =>
            contractDtoMapper.Map().mapFrom(c)
          );
          return { pageInfo: respons.pageInfo, items };
        })
      );
  }

  get(id: string): Observable<contract> {
    return this._httpClient
      .get(`${this.baseUrl}/Get`, { params: { id } })
      .pipe(map((data) => contractDtoMapper.Map().mapFrom(data as contractDto)));
  }

  post(contract: contract): Observable<string> {
    return this._httpClient
      .post(this.baseUrl, {
        ownerId: contract.ownerId,
        renterId: contract.renterId,
        propertyId: contract.propertyId,
        rentalDurationId: contract.rentalDurationId,
        startData: contract.startData,
        monthlyRentAmount: contract.monthlyRentAmount,
        annualIncreament: contract.annualIncreament,
        insurance: contract.insurance,
      })
      .pipe(map((data) => data as string));
  }

  delete(contractId: string): Observable<object> {
    return this._httpClient.delete(this.baseUrl, {
      params: { Id: contractId },
    });
  }

  getOwnerLookup(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/Owner/GetLookupList`)
      .pipe(map((data) => data as Lookup[]));
  }

  getRenterLookup(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/Renter/GetLookupList`)
      .pipe(map((data) => data as Lookup[]));
  }

  getPropertyLookup(): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/Property/GetLookupList`)
      .pipe(map((data) => data as Lookup[]));
  }

  getPropertyRentalDurations(propertyId: string): Observable<Lookup[]> {
    return this._httpClient
      .get<Lookup[]>(`${environment.apiUrl}/v1/AdminPanel/RentalDuration/GetPropertyRentalDurations`, {
        params: { Id: propertyId },
      })
      .pipe(map((data) => data as Lookup[]));
  }
}