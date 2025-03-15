import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IsMongoId } from 'class-validator'

export class CreateTaskDto {
	@IsMongoId()
	@IsNotEmpty()
	projectId: string

	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsOptional()
	description: string

	@IsMongoId()
	@IsNotEmpty()
	stageId: string
}
