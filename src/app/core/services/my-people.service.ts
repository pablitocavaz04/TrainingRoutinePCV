import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Person } from "../models/person.model";
import { Paginated } from "../models/paginated.model";

export interface PaginatedRaw<T> {
    first: number
    prev: number|null
    next: number|null
    last: number
    pages: number
    items: number
    data: T[]
  };

  export interface PersonRaw {
    id: string
    nombre: string
    apellidos: string
    email: string
    genero: string
    grupoId: string
}
@Injectable({
    providedIn:'root'
})
export class MyPeopleService{

    private apiUrl:string = "http://localhost:3000/personas"
    constructor(
        private http:HttpClient
    ){

    }

    getAll(page:number, pageSize:number): Observable<Paginated<Person>> {
        return this.http.get<PaginatedRaw<PersonRaw>>(`${this.apiUrl}/?_page=${page}&_per_page=${pageSize}`).pipe(map(res=>{
            return {page:page, pageSize:pageSize, pages:res.pages, data:res.data.map<Person>((d:PersonRaw)=>{
                return {
                    id:d.id, 
                    name:d.nombre, 
                    surname:d.apellidos, 
                    age:(d as any)["age"]??0,
                    picture:(d as any)["picture"]?{
                        large:(d as any)["picture"].large, 
                        thumbnail:(d as any)["picture"].thumbnail
                    }:undefined};
            })};
        }))
    }
}