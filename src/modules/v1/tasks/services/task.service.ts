import { Injectable } from '@nestjs/common'
import { TaskRepository } from '../../database/repositories/task.repository'
import { Task } from '../../database/schemas/task/task.schema'
import { CreateTaskDto } from '../dtos/create-task.dto'
import { Types } from 'mongoose'

@Injectable()
export class TaskService {
	constructor(private readonly taskRepository: TaskRepository) {}

	async create(data: CreateTaskDto & { userId: string }): Promise<Task> {
		const newTask = await this.taskRepository.create({
			title: data.title,
			description: data.description,
			createdBy: new Types.ObjectId(data.userId),
			projectId: new Types.ObjectId(data.projectId),
			stageId: new Types.ObjectId(data.stageId)
		})
		return newTask
	}

	async findByProjectId(projectId: string): Promise<Task[]> {
		const tasks = await this.taskRepository.findByProjectId(projectId)
		return tasks
	}

	/* async findAll() {
		return []
	}

	async findOne(id) {
		return null
	}

	async update(id, data) {
		return data
	}

	async remove(id) {
		return null
	} */
}
