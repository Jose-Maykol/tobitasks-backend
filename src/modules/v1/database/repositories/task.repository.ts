import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Task } from '../schemas/task/task.schema'
import { Model, Types } from 'mongoose'

@Injectable()
export class TaskRepository {
	constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

	async create(data: Partial<Task>): Promise<Task> {
		const createdTask = new this.taskModel(data)
		return createdTask.save()
	}

	async findByProjectId(projectId: string): Promise<Task[]> {
		return this.taskModel
			.find({ projectId: new Types.ObjectId(projectId) })
			.exec()
	}

	async findById(id: string): Promise<Task | null> {
		return this.taskModel.findById(id).exec()
	}

	async getLastTaskOrder(projectId: string, stageId: string): Promise<number> {
		const lastTask = await this.taskModel
			.findOne({
				projectId: new Types.ObjectId(projectId),
				stageId: new Types.ObjectId(stageId)
			})
			.sort({ sortOrder: -1 })
			.exec()

		return lastTask ? lastTask.sortOrder : 0
	}
}
