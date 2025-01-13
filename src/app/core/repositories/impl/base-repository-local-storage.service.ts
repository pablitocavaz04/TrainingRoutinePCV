// src/app/repositories/impl/base-repository-http.service.ts
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBaseRepository, SearchParams } from '../intefaces/base-repository.interface';
import { Model } from '../../models/base.model';
import { REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { IBaseMapping } from '../intefaces/base-mapping.interface';
import { Paginated } from '../../models/paginated.model';


@Injectable({
  providedIn: 'root'
})
export class BaseRespositoryLocalStorageService<T extends Model> implements IBaseRepository<T> {

  _items:T[] = [];
  private newID():string{
    const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      code += validChars[randomIndex];
    }
    return code;
  }

  constructor(
    @Inject(RESOURCE_NAME_TOKEN) protected resource:string, //nombre del recurso del repositorio
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping:IBaseMapping<T>
  
  ) {
    let mockupList:any[] = [];
    for(let i = 0; i<100;i++){
      let mockup = {
        name:{
          title:'Mr',
          first:"Juan Antonio",
          last:"García Gómez"
        },
        age:47,
        picture:{
          large:"https://picsum.photos/id/0/200/300",
          thumbnail:"https://picsum.photos/id/0/200/300"
        }
      };
      mockup.picture.large = `https://picsum.photos/id/${i}/200/300`;
      mockup.picture.thumbnail = `https://picsum.photos/id/${i}/200/300`;
      mockupList = [...mockupList, mockup];
    }
    this._items = JSON.parse(localStorage.getItem(resource) ?? JSON.stringify(mockupList));
    localStorage.setItem(this.resource, JSON.stringify(this._items));
  }

  getAll(page:number, pageSize:number, filters:SearchParams = {}): Observable<Paginated<T>> {
    return of(
      this.mapping.getPaginated(page, pageSize, Math.ceil(this._items.length / pageSize),
        this._items.slice(
          page*pageSize, 
          Math.min(
            (page+1)*pageSize, 
            this._items.length
          )
        )
      )
    );
  }

  getById(id: string): Observable<T | null> {
    return of(this.mapping.getOne(this._items.find(item=>item.id == id) ?? null));
  }

  add(entity: T): Observable<T> {
    entity.id = this.newID();
    entity.createdAt = (new Date()).toISOString();
    this._items.push(entity);
    localStorage.setItem(this.resource, JSON.stringify(this._items));
    return of(this.mapping.getAdded(entity));
  }

  update(id: string, entity: T): Observable<T> {
    let index = this._items.findIndex(item=>item.id == id);
    if(index>=0){
      this._items[index]=entity;
      localStorage.setItem(this.resource, JSON.stringify(this._items));
      return of(this.mapping.getUpdated(this._items[index]));
    }
    throw new Error("id not found"); 
  }

  delete(id: string): Observable<T> {
    let index = this._items.findIndex(item=>item.id == id);
    if(index>=0){
      let entity = this._items.splice(index, 1);
      localStorage.setItem(this.resource, JSON.stringify(this._items));
      return of(this.mapping.getDeleted(entity));
    }
    throw new Error("id not found");
  }
}
