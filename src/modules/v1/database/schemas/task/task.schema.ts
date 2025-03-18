import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
/* import { Subtask, SubtaskSchema } from './subtask.schema' */

export type TaskDocument = Task & Document

@Schema({
	timestamps: true,
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
	},
	toObject: { virtuals: true }
})
export class Task extends Document {
	@Prop({ type: Types.ObjectId, ref: 'Project', required: true })
	projectId: Types.ObjectId

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	createdBy: Types.ObjectId

	@Prop({ required: true, trim: true, minlength: 2, maxlength: 200 })
	title: string

	@Prop({ trim: true, maxlength: 1000 })
	description?: string

	@Prop({ type: Types.ObjectId, ref: 'Project.stages', required: true })
	stageId: Types.ObjectId

	/* @Prop([{ type: Types.ObjectId, ref: 'Project.tags' }])
	tags: Types.ObjectId[]

	@Prop([{ type: Types.ObjectId, ref: 'Project.members' }])
	assignedTo: Types.ObjectId[]

	@Prop({ type: [SubtaskSchema], default: [] })
	subtasks: Subtask[]

	@Prop({ type: Number })
	timeEstimate?: number

	@Prop({ type: Number })
	timeSpent?: number

	@Prop({ type: Number, required: true })
	sortOrder: number

	@Prop({ type: Date })
	dueDate?: Date

	@Prop({
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'medium'
	})
	priority: string */

	@Prop({ type: Date, default: Date.now })
	createdAt: Date

	@Prop({ type: Date, default: Date.now })
	updatedAt: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)
