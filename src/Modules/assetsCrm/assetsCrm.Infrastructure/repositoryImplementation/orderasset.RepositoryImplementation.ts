import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderAssetRepository } from '../../assetsCrm.Application/repositories/orderasset.repository';
import { OrderAsset } from '../../assetsCrm.Domain/orderasset';
import { orderassetDto, orderassetDtoMapper } from '../models/orderasset/orderassetDto';
import { orderassetVm, orderassetVmMapper } from '../models/orderasset/orderassetVm';

@Injectable()
export class orderassetRepositoryImplementation implements OrderAssetRepository {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/AdminPanel/OrderAsset`;

getPage(params: PaginationParams): Observable<PaginationRespons<OrderAsset>> {
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
        console.log('🔵 RAW Backend GetPage response:', JSON.stringify(data, null, 2));
        let response = data as PaginationRespons<orderassetDto>;
        
        if (response.items && response.items.length > 0) {
          console.log('🔵 First item from backend:', JSON.stringify(response.items[0], null, 2));
        }
        
        const items: OrderAsset[] = response.items.map((dto) => {
          console.log('🟡 DTO before mapping:', dto);
          const mapped = orderassetDtoMapper.Map().mapFrom(dto);
          console.log('🟢 After mapping:', mapped);
          return mapped;
        });
        
        return { pageInfo: response.pageInfo, items };
      })
    );
}

  getList(): Observable<OrderAsset[]> {
    return this._httpClient.get(this.baseUrl).pipe(
      map((data) => {
        const response: orderassetVm[] = data as orderassetVm[];
        return response.map((vm) => orderassetVmMapper.Map().mapFrom(vm));
      })
    );
  }

  post(orderasset: OrderAsset): Observable<string> {
    return this._httpClient
      .post(this.baseUrl, {
        requirements: orderasset.requirements,
        assetsIds : orderasset.assetsIds,
        companyId: orderasset.companyId,
        notes : orderasset.notes,
      })
      .pipe(map((data) => data as string));
  }


  put(orderAsset: OrderAsset): Observable<object> {
    return this._httpClient.put(
      `${this.baseUrl}/${orderAsset.id}`, 
      {
        id : orderAsset.id,
        requirements: orderAsset.requirements,
        AssetId : orderAsset.assetsIds,
        companyId: orderAsset.companyId,
        notes : orderAsset.notes,
        requestSource: orderAsset.requestSource,  
      }
    );
  }

    getById(id: string): Observable<OrderAsset> {
    return this._httpClient.get(this.baseUrl, {
      params: { Id: id },
    }).pipe(
      map((data) => {
        const dto = data as orderassetDto;
        return orderassetDtoMapper.Map().mapFrom(dto);
      })
    );

  }


delete(orderAssetId: string): Observable<object> {  
  return this._httpClient.delete(
    `${this.baseUrl}/Delete`, 
    {
      params: { Id: orderAssetId },
    }
  ).pipe(
    tap(() => console.log('✅ Delete successful')),
    catchError((error) => {
      throw error;
    })
  );
}
}
