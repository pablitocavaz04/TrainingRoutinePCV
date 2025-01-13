// src/app/services/interfaces/people.service.interface.ts
import { Group } from '../../models/group.model';
import { Person } from '../../models/person.model';
import { IBaseService } from './base-service.interface';

export interface IGroupsService extends IBaseService<Group> {
  // Métodos específicos si los hay
}
