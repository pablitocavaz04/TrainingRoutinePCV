// src/app/core/repositories/interfaces/people-repository.interface.ts
import { Group } from "../../models/group.model";
import { Person } from "../../models/person.model";
import { IBaseRepository } from "./base-repository.interface";

export interface IGroupsRepository extends IBaseRepository<Group>{

}