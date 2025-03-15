import { IsMongoId, IsNotEmpty } from 'class-validator'

export class GetTasksDto {
	@IsMongoId()
	@IsNotEmpty()
	projectId: string
}
