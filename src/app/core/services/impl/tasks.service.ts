// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { Task } from '../../models/task.model';
import { TASKS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { ITasksRepository } from '../../repositories/intefaces/tasks-repository.interface';
import { ITasksService } from '../interfaces/tasks-service.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends BaseService<Task> implements ITasksService {
  constructor(
    @Inject(TASKS_REPOSITORY_TOKEN) repository: ITasksRepository
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}
