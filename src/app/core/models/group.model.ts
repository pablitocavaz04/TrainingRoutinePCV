// src/app/core/person.model.ts
import { Model } from "./base.model";

export interface Group extends Model{
    name:string,
    picture?:string
}