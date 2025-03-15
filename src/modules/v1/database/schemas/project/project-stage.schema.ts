import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProjectStageDocument = ProjectStage & Document

enum StageColors {
	NEUTRAL = 'neutral',
	BLUE = 'blue',
	GREEN = 'green',
	YELLOW = 'yellow',
	RED = 'red'
}

@Schema()
export class ProjectStage {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({ required: true, min: 0 })
	order: number

	@Prop({ required: true, enum: Object.values(StageColors) })
	color: string
}

export const ProjectStageSchema = SchemaFactory.createForClass(ProjectStage)
