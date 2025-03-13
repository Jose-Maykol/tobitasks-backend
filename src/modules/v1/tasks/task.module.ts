import { Module } from '@nestjs/common'
import { TaskSchema } from '../database/schemas/task/task.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskGateway } from './gateways/tasks.gateway'
import { JwtService } from '@nestjs/jwt'

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
	providers: [TaskGateway, JwtService]
})
export class TaskModule {}
