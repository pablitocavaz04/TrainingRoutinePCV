// src/app/repositories/impl/base-repository-http.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBaseRepository, SearchParams } from '../intefaces/base-repository.interface';
import { API_URL_TOKEN, AUTH_TOKEN, REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { Model } from '../../models/base.model';
import { IBaseMapping } from '../intefaces/base-mapping.interface';
import { Paginated } from '../../models/paginated.model';
import { BaseRepositoryHttpService } from './base-repository-http.service';
import { BaseAuthenticationService } from '../../services/impl/base-authentication.service';
import { IAuthentication } from '../../services/interfaces/authentication.interface';

export interface PaginatedRaw<T> {
  first: number
  prev: number|null
  next: number|null
  last: number
  pages: number
  items: number
  data: T[]
};

@Injectable({
  providedIn: 'root'
})
export class JsonServerRepositoryService<T extends Model> extends BaseRepositoryHttpService<T> {

  constructor(
    http: HttpClient,
    @Inject(AUTH_TOKEN) auth: IAuthentication,
    @Inject(API_URL_TOKEN) apiUrl: string, // URL base de la API para el modelo
    @Inject(RESOURCE_NAME_TOKEN) resource:string, //nombre del recurso del repositorio
    @Inject(REPOSITORY_MAPPING_TOKEN) mapping:IBaseMapping<T>
  ) {
    super(http, auth, apiUrl, resource, mapping);
  }

  override getAll(page:number, pageSize:number, filters:SearchParams = {}): Observable<T[] | Paginated<T>> {
    let search: string = Object.entries(filters)
      .map(([k, v]) => `${k}_like=${v}`)
      .reduce((p, v) => `${p}${v}`, "");
    if(page!=-1){
      return this.http.get<PaginatedRaw<T>>(
        `${this.apiUrl}/${this.resource}/?_page=${page}&_per_page=${pageSize}&${search}`)
        .pipe(map(res=>{
          return this.mapping.getPaginated(page, pageSize, res.pages, res.data);
        }));
    }
    else{
      return this.http.get<T[]>(
        `${this.apiUrl}/${this.resource}?&${search}`)
        .pipe(map(res=>{
          return res.map((elem:any)=>{
            return this.mapping.getOne(elem);
          });
        }));
    }
    
  }

  override add(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/${this.resource}`, this.mapping.setAdd(entity)).pipe(map(res=>{
        return this.mapping.getAdded(res);
      }));
  }

  override update(id: string, entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}/${this.resource}/${id}`, this.mapping.setUpdate(entity)).pipe(map(res=>{
        return this.mapping.getUpdated(res);
      }));
  }
  
}
