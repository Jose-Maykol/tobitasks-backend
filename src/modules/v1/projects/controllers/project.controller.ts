import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { CreateProjectDto } from '../dtos/create-project.dto'
import { ProjectsService } from '../services/projects.service'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { JwtPayload } from '../../auth/interfaces/jwt-payload'

@Controller()
export class ProjectsController {
	constructor(private readonly projectService: ProjectsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(
		@Req() req: Request & { user: JwtPayload },
		@Body() body: CreateProjectDto
	) {
		const { sub: userId } = req.user
		const { name, description } = body
		const project = this.projectService.create({
			name,
			description,
			userId
		})

		return project
	}

	@Get()
	async findAll() {
		const projects = await this.projectService.findAll()

		return {
			projects
		}
	}

	async findOne() {}
}
