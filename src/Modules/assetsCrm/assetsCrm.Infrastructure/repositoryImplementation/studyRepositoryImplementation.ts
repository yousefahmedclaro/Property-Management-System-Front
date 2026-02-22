import { inject, Injectable } from '@angular/core';
import { StudyRepository } from '../../assetsCrm.Application/repositories/study.repository';
import { map, Observable } from 'rxjs';
import { PaginationParams, PaginationRespons } from '../../../Common/domain/pagination';
import { Study } from '../../assetsCrm.Domain/study';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StudyDto, StudyDtoMapper } from '../models/study/studtDto';
import { StudyVm, StudyVmMapper } from '../models/study/studtVm';

@Injectable()
export class StudyRepositoryImplementation implements StudyRepository {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/AdminPanel/Study`;

  getPage(
    params: PaginationParams,
    assetId: string
  ): Observable<PaginationRespons<Study>> {
    return this._httpClient
      .get(`${this.baseUrl}/GetPage`, {
        params: {
          assetId: assetId || '', 
          offset: params.offset ?? 0,
          pageIndex: params.pageIndex,
          search: params.search ?? '',
          ascending: params.ascending ?? true,
          sortBy: params.sortBy ?? '',
        },
      })
      .pipe(
        map((data) => {
          let response = data as PaginationRespons<StudyDto>;
          const items: Study[] = response.items.map((dto) =>{
            console.log(StudyDtoMapper.Map().mapFrom(dto));
            console.log(dto);
            
            
           return StudyDtoMapper.Map().mapFrom(dto)
          }
          );
          return { pageInfo: response.pageInfo, items };
        })
      );
  }

  getList(): Observable<Study[]> {
    return this._httpClient.get(this.baseUrl).pipe(
      map((data) => {
        const response: StudyVm[] = data as StudyVm[];
        return response.map((vm) => StudyVmMapper.Map().mapFrom(vm));
      })
    );
  }

  post(study: Study): Observable<string> {
    return this._httpClient
      .post(this.baseUrl, {
        name: {
          ar: study.name?.ar,
          en: study.name?.en,
        },
        assetId: study.asset?.id,
      })
      .pipe(map((data) => data as string));
  }

  put(study: Study): Observable<object> {
    return this._httpClient.put(
      `${this.baseUrl}/${study.id}`, 
      {
        name: {
           ar: study.name?.ar,
            en: study.name?.en 
          },
        assetId: study.asset?.id,
        id: study.id
        
      }
    );
  }

    getById(id: string): Observable<Study> {
    return this._httpClient.get(this.baseUrl, {
      params: { Id: id },
    }).pipe(
      map((data) => {
        const dto = data as StudyDto;
        return StudyDtoMapper.Map().mapFrom(dto);
      })
    );
  }

  delete(studyId: string): Observable<object> {
    return this._httpClient.delete(
      `${this.baseUrl}/Delete`, 
      {
        params: { id: studyId },
      }
    );
  }
}
