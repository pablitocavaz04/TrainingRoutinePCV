// src/app/services/interfaces/base-service.interface.ts
import { Observable } from 'rxjs';
import { Paginated } from '../../models/paginated.model';
import { SearchParams } from '../../repositories/intefaces/base-repository.interface';

export interface IBaseService<T> {
  getAll(): Observable<T[]>;
  getAll(page: number, pageSize: number): Observable<Paginated<T>>;
  getAll(page?: number, pageSize?: number, filters?: SearchParams): Observable<T[] | Paginated<T>>;
  getById(id: string): Observable<T | null>;
  add(entity: T): Observable<T>;
  update(id: string, entity: T): Observable<T>;
  delete(id: string): Observable<T>;
}
