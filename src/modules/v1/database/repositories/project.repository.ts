import { InjectModel } from '@nestjs/mongoose'
import { Project } from '../schemas/project/project.schema'
import { Model, Types } from 'mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectRepository {
	constructor(
		@InjectModel(Project.name) private projectModel: Model<Project>
	) {}

	async create(data: Partial<Project>): Promise<Project> {
		const createdProject = new this.projectModel(data)
		return createdProject.save()
	}

	async findAll(): Promise<Project[]> {
		return this.projectModel.find().exec()
	}

	async findByUserId(userId: string): Promise<Project[]> {
		return this.projectModel
			.find({ createdBy: new Types.ObjectId(userId) })
			.exec()
	}

	async findOneById(id: string): Promise<Project | null> {
		return this.projectModel.findById(id).exec()
	}

	async findOneByName(name: string): Promise<Project | null> {
		return this.projectModel.findOne({ name }).exec()
	}

	/* async update(
		id: string,
		updateProjectDto: UpdateProjectDto
	): Promise<Project | null> {
		return this.projectModel
			.findByIdAndUpdate(id, updateProjectDto, { new: true })
			.exec()
	}

	async delete(id: string): Promise<Project | null> {
		return this.projectModel.findByIdAndDelete(id).exec()
	} */
}
