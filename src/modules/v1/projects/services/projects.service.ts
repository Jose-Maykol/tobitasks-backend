import { ConflictException, Injectable } from '@nestjs/common'
import { CreateProjectDto } from '../dtos/create-project.dto'
import { ProjectRepository } from '../../database/repositories/project.repository.impl'

@Injectable()
export class ProjectsService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	async create(data: CreateProjectDto) {
		const { name, description } = data

		const project = await this.projectRepository.findByName(name)

		if (project) throw new ConflictException('Project already exists')

		return this.projectRepository.create({ name, description })
	}
}
