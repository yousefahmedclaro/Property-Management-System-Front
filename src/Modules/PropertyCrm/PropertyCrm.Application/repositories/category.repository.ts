import { Observable } from 'rxjs';
import {
  PaginationParams,
  PaginationRespons,
} from '../../../Common/domain/pagination';
import { category } from '../../PropertyCrm.Domain/category';
import { categoryRepositoryImplementation } from '../../PropertyCrm.Infrastructure/repositoryImplementation/categoryRepositoryImplementation';

export abstract class categoryRepository {
  abstract getPage(
    params: PaginationParams
  ): Observable<PaginationRespons<category>>;

  abstract post(category: category): Observable<string>;

  abstract put(category: category): Observable<object>;

  abstract delete(categoryId: string): Observable<object>;
}

export const categoryRepositoryProvider = {
  provide: categoryRepository,
  useClass: categoryRepositoryImplementation,
};
