// src/app/services/impl/base-service.service.ts
import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBaseService } from '../interfaces/base-service.interface';
import { IBaseRepository, SearchParams } from '../../repositories/intefaces/base-repository.interface';
import { Model } from '../../models/base.model';
import { Paginated } from '../../models/paginated.model';
import { REPOSITORY_TOKEN } from '../../repositories/repository.tokens';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends Model> implements IBaseService<T> {
  constructor(
    @Inject(REPOSITORY_TOKEN) protected repository: IBaseRepository<T>
  ) {}

  getAll(): Observable<T[]>;
  getAll(page: number, pageSize: number): Observable<Paginated<T>>;
  getAll(page: number, pageSize: number, filters: SearchParams): Observable<Paginated<T>>;
  getAll(page?: number, pageSize?: number, filters?: SearchParams): Observable<T[] | Paginated<T>> {    
    if (page === undefined || pageSize === undefined)
        return this.repository.getAll(1, 25, {});
    else
    return this.repository.getAll(page, pageSize, filters??{});
  }

  getById(id: string): Observable<T | null> {
    return this.repository.getById(id);
  }

  add(entity: T): Observable<T> {
    return this.repository.add(entity);
  }

  update(id: string, entity: T): Observable<T> {
    return this.repository.update(id, entity);
  }

  delete(id: string): Observable<T> {
    return this.repository.delete(id);
  }
}
