import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto {
	@IsMongoId()
	id: string

	@IsString()
	@IsOptional()
	title: string

	@IsString()
	@IsOptional()
	description: string

	@IsMongoId()
	@IsOptional()
	stageId: string

	@IsNumber()
	@IsOptional()
	sortOrder: number
}
