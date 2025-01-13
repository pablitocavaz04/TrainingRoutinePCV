// src/app/repositories/impl/base-repository-http.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBaseRepository, SearchParams } from '../intefaces/base-repository.interface';
import { API_URL_TOKEN, REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN, STRAPI_AUTH_TOKEN } from '../repository.tokens';
import { Model } from '../../models/base.model';
import { IBaseMapping } from '../intefaces/base-mapping.interface';
import { Paginated } from '../../models/paginated.model';
import { BaseRepositoryHttpService } from './base-repository-http.service';
import { BaseAuthenticationService } from '../../services/impl/base-authentication.service';
import { IStrapiAuthentication } from '../../services/interfaces/strapi-authentication.interface';

export interface PaginatedRaw<T> {
  data: Data<T>[]
  meta: Meta
}

export interface Data<T> {
  id: number
  attributes: T
}


export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}


@Injectable({
  providedIn: 'root'
})
export class StrapiRepositoryService<T extends Model> extends BaseRepositoryHttpService<T> {

  constructor(
    http: HttpClient,
    @Inject(STRAPI_AUTH_TOKEN) override auth: IStrapiAuthentication,
    @Inject(API_URL_TOKEN) apiUrl: string, // URL base de la API para el modelo
    @Inject(RESOURCE_NAME_TOKEN) resource:string, //nombre del recurso del repositorio
    @Inject(REPOSITORY_MAPPING_TOKEN) mapping:IBaseMapping<T>
  ) {
    super(http, auth, apiUrl, resource, mapping);
  }

  private getHeaders() {
    const token = this.auth.getToken();
    return {
      headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
    };
  }

  override getAll(page:number, pageSize:number, filters:SearchParams = {}): Observable<T[] | Paginated<T>> {
    let search: string = Object.entries(filters)
      .map(([k, v]) => `filters[${k}]=${v}`)
      .reduce((p, v) => `${p}${v}`, "");
    if(page!=-1){
      return this.http.get<PaginatedRaw<T>>(
        `${this.apiUrl}/${this.resource}?pagination[page]=${page}&pagination[pageSize]=${pageSize}&${search}&populate=user,group,picture`, 
        this.getHeaders()).pipe(map(res=>{
          return this.mapping.getPaginated(page, pageSize, res.meta.pagination.total, res.data);
        }));
    }
    else{
      return this.http.get<PaginatedRaw<T>>(
        `${this.apiUrl}/${this.resource}?&${search}`, 
        this.getHeaders()).pipe(map((res:PaginatedRaw<T>)=>{
          return res.data.map((elem:Data<T>)=>{
            return this.mapping.getOne(elem);
          });
        }));
    }
  }

  override add(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/${this.resource}`, this.mapping.setAdd(entity), 
      this.getHeaders()).pipe(map(res=>{
        return this.mapping.getAdded(res);
      }));
  }

  override update(id: string, entity: T): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}/${this.resource}/${id}`, this.mapping.setUpdate(entity), 
      this.getHeaders()).pipe(map(res=>{
        return this.mapping.getUpdated(res);
      }));
  }

  override delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.resource}/${id}`, 
      this.getHeaders()).pipe(map(res=>this.mapping.getDeleted(res)));
  }
  
}
