// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { IPeopleService } from '../interfaces/people-service.interface';
import { Person } from '../../models/person.model';
import { GROUPS_REPOSITORY_TOKEN, PEOPLE_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IPeopleRepository } from '../../repositories/intefaces/people-repository.interface';
import { IGroupsService } from '../interfaces/groups-service.interface';
import { Group } from '../../models/group.model';
import { IGroupsRepository } from '../../repositories/intefaces/groups-repository.interface';
import { Observable } from 'rxjs';
import { Paginated } from '../../models/paginated.model';
import { IBaseRepository, SearchParams } from '../../repositories/intefaces/base-repository.interface';


@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseService<Group> {
  constructor(
    @Inject(GROUPS_REPOSITORY_TOKEN) repository: IBaseRepository<Group>
  ) {
    super(repository);
  }

}
