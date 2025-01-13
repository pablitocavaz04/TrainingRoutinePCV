import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Group } from "../../models/group.model";

export interface GroupRaw {
    data: Data
    meta: Meta
  }
  
export interface Data {
    id: number
    attributes: GroupAttributes
}
export interface GroupData {
    data: GroupAttributes;
}

export interface GroupAttributes {
    name: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}

export interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class GroupsMappingStrapi implements IBaseMapping<Group> {
    

    setAdd(data: Group):GroupData {
        return {
            data:{
                name:data.name
            }
        };
    }
    setUpdate(data: Group):GroupData {
        let toReturn:GroupData = {
            data:{
                name:""
            }
        };  
        Object.keys(data).forEach(key=>{
            switch(key){
                case 'name': toReturn.data['name']=data[key];
                break;
                default:
            }
        });
        return toReturn;
    }
    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Group> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Group>((d:Data)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | GroupRaw): Group {
        const isGroupRaw = (data: Data | GroupRaw): data is GroupRaw => 'meta' in data;
        
        const attributes = isGroupRaw(data) ? data.data.attributes : data.attributes;
        const id = isGroupRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            name: attributes.name
        };
    }
    getAdded(data: GroupRaw):Group {
        return this.getOne(data.data);
    }
    getUpdated(data: GroupRaw):Group {
        return this.getOne(data.data);
    }
    getDeleted(data: GroupRaw):Group {
        return this.getOne(data.data);
    }
  }
  