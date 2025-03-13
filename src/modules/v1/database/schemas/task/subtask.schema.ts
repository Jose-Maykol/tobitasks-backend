import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SubtaskDocument = Subtask & Document

@Schema({ timestamps: true })
export class Subtask {
	@Prop({ required: true, trim: true, maxlength: 200 })
	title: string

	@Prop({ default: false })
	completed: boolean

	@Prop({ type: Date })
	dueDate?: Date

	@Prop({ type: Date, default: Date.now })
	createdAt: Date

	@Prop({ type: Date, default: Date.now })
	updatedAt: Date
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask)
