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

@Schema({
	toJSON: {
		transform: (
			doc: Document,
			ret: { _id?: string; __v?: number; [key: string]: any }
		) => {
			ret.id = ret._id
			delete ret._id
			delete ret.__v
			return ret
		}
	}
})
export class ProjectStage {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({ required: true, min: 0 })
	order: number

	@Prop({ required: true, enum: Object.values(StageColors) })
	color: string
}

export const ProjectStageSchema = SchemaFactory.createForClass(ProjectStage)
