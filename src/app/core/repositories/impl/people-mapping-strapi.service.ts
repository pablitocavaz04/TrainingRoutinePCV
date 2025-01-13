import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Person } from "../../models/person.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";


interface MediaRaw{
    data: StrapiMedia
}
interface UserRaw{
    data: UserData
}

interface UserData{
    id: number
    attributes: UserAttributes
}

interface UserAttributes {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
interface GroupRaw{
    data: GroupData,
    meta: Meta
}

interface GroupData {
    id: number
    attributes: GroupAttributes
}
  
interface GroupAttributes {
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}
  

interface PersonRaw {
    data: Data
    meta: Meta
  }
  
interface Data {
    id: number
    attributes: PersonAttributes
}
interface PersonData {
    data: PersonAttributes;
}

interface PersonAttributes {
    name: string
    surname: string
    gender: string
    birthdate?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    group:GroupRaw | number | null,
    user:UserRaw | number | null,
    picture:MediaRaw | number | null
}

interface GroupAttributes {
    name: string
}

interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class PeopleMappingStrapi implements IBaseMapping<Person> {
    toGenderMapping:any = {
        Masculino:'male',
        Femenino:'female',
        Otros:'other'
    };
    
    fromGenderMapping:any = {
        male:'Masculino',
        female:'Femenino',
        other:'Otros'
    };

    setAdd(data: Person):PersonData {
        return {
            data:{
                name:data.name,
                surname:data.surname,
                gender: this.toGenderMapping[data.gender],
                group:data.groupId?Number(data.groupId):null,
                user:data.userId?Number(data.userId):null,
                picture:data.picture?Number(data.picture):null
            }
        };
    }
    setUpdate(data: Partial<Person>): PersonData {
        const mappedData: Partial<PersonAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'name': mappedData.name = data[key];
                break;
                case 'surname': mappedData.surname = data[key];
                break;
                case 'gender': mappedData.gender = this.toGenderMapping[data[key]!];
                break;
                case 'groupId': mappedData.group = data[key] ? Number(data[key]) : null;
                break;
                case 'userId': mappedData.user = data[key] ? Number(data[key]) : null;
                break;
                case 'picture': mappedData.picture = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as PersonAttributes
        };
    }

    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Person> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Person>((d:Data|PersonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | PersonRaw): Person {
        const isPersonRaw = (data: Data | PersonRaw): data is PersonRaw => 'meta' in data;

        const attributes = isPersonRaw(data) ? data.data.attributes : data.attributes;
        const id = isPersonRaw(data) ? data.data.id : data.id;
        
        return {
            id: id.toString(),
            name: attributes.name,
            surname: attributes.surname,
            groupId: typeof attributes.group === 'object' ? attributes.group?.data?.id.toString() : undefined,
            gender: this.fromGenderMapping[attributes.gender],
            userId: typeof attributes.user === 'object' ? attributes.user?.data?.id.toString() : undefined,
            picture: typeof attributes.picture === 'object' ? {
                url: attributes.picture?.data?.attributes?.url,
                large: attributes.picture?.data?.attributes?.formats?.large?.url || attributes.picture?.data?.attributes?.url,
                medium: attributes.picture?.data?.attributes?.formats?.medium?.url || attributes.picture?.data?.attributes?.url,
                small: attributes.picture?.data?.attributes?.formats?.small?.url || attributes.picture?.data?.attributes?.url,
                thumbnail: attributes.picture?.data?.attributes?.formats?.thumbnail?.url || attributes.picture?.data?.attributes?.url,
            } : undefined
        };
    }
    getAdded(data: PersonRaw):Person {
        return this.getOne(data.data);
    }
    getUpdated(data: PersonRaw):Person {
        return this.getOne(data.data);
    }
    getDeleted(data: PersonRaw):Person {
        return this.getOne(data.data);
    }
  }
  