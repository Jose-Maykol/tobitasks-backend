import { Module } from '@nestjs/common'
import { TaskSchema } from '../database/schemas/task/task.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskGateway } from './gateways/task.gateway'
import { JwtService } from '@nestjs/jwt'
import { TaskService } from './services/task.service'
import { TaskRepository } from '../database/repositories/task.repository'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Task',
				schema: TaskSchema
			}
		])
	],
	controllers: [],
	providers: [TaskGateway, JwtService, TaskService, TaskRepository]
})
export class TaskModule {}
