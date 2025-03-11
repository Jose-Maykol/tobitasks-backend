import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectsController } from './controllers/project.controller'
import { ProjectSchema } from '../database/schemas/project/project.schema'
import { ProjectsService } from './services/projects.service'
import { ProjectRepository } from '../database/repositories/project.repository.impl'
import { ProjectGateway } from './gateways/projects.gateway'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Project',
				schema: ProjectSchema
			}
		])
	],
	controllers: [ProjectsController],
	providers: [ProjectsService, ProjectRepository, ProjectGateway]
})
export class ProjectsModule {}
