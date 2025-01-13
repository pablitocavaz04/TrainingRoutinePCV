import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Person } from "../models/person.model";
import { Paginated } from "../models/paginated.model";
import { Group } from "../models/group.model";

export interface PaginatedRaw<T> {
    first: number
    prev: number|null
    next: number|null
    last: number
    pages: number
    items: number
    data: T[]
  };

  export interface GroupRaw {
    id: string
    nombre: string
}
@Injectable({
    providedIn:'root'
})
export class MyGroupsService{

    private apiUrl:string = "http://localhost:3000/grupos"
    constructor(
        private http:HttpClient
    ){

    }

    getAll(page:number, pageSize:number): Observable<Paginated<Group>> {
        return this.http.get<PaginatedRaw<GroupRaw>>(`${this.apiUrl}/?_page=${page}&_per_page=${pageSize}`).pipe(map(res=>{
            return {page:page, pageSize:pageSize, pages:res.pages, data:res.data.map<Group>((d:GroupRaw)=>{
                return {
                    id:d.id, 
                    name:d.nombre, 
                };
            })};
        }))
    }
}