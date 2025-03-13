import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectsController } from './controllers/project.controller'
import { ProjectSchema } from '../database/schemas/project/project.schema'
import { ProjectsService } from './services/projects.service'
import { ProjectRepository } from '../database/repositories/project.repository'

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
	providers: [ProjectsService, ProjectRepository]
})
export class ProjectsModule {}
