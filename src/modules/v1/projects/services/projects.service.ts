import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { CreateProjectDto } from '../dtos/create-project.dto'
import { ProjectRepository } from '../../database/repositories/project.repository'

@Injectable()
export class ProjectsService {
	private logger = new Logger('ProjectsService')

	constructor(private readonly projectRepository: ProjectRepository) {}

	async create(data: CreateProjectDto & { userId: string }) {
		const { name, description } = data

		const project = await this.projectRepository.findByName(name)

		if (project) throw new ConflictException('Project already exists')

		const DEFAULT_STAGES = [
			{ name: 'En planificación', order: 0, color: 'neutral-600' },
			{ name: 'En progreso', order: 1, color: 'blue-600' },
			{ name: 'Hecho', order: 2, color: 'green-600' }
		]

		this.logger.log(`Creating project ${name}`)

		return this.projectRepository.create({
			name,
			description,
			stages: DEFAULT_STAGES,
			createdBy: new ObjectId(data.userId)
		})
	}

	async findAll() {
		return this.projectRepository.findAll()
	}
}
