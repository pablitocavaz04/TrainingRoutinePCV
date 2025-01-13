import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Person } from "../../models/person.model";
import { Group } from "../../models/group.model";

export interface GroupRaw {
    id: string
    nombre: string
}
@Injectable({
    providedIn: 'root'
  })
  export class GroupsMappingJsonServer implements IBaseMapping<Group> {
    setAdd(data: Group) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize: number, pages:number, data:GroupRaw[]): Paginated<Group> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Group>((d:GroupRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: GroupRaw):Group {
        return {
            id:data.id, 
            name:data.nombre, 
        };
    }
    getAdded(data: any):Group {
        throw new Error("Method not implemented.");
    }
    getUpdated(data: any):Group {
        throw new Error("Method not implemented.");
    }
    getDeleted(data: any):Group {
        throw new Error("Method not implemented.");
    }
  }
  