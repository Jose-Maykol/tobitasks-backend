import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ProjectStage, ProjectStageSchema } from './project-stage.schema'
import { ProjectTag, ProjectTagSchema } from './project-tag.schema'
import { ProjectMember, ProjectMemberSchema } from './project-member.schema'

export type ProjectDocument = Project & Document

export enum ProjectColors {
	NEUTRAL = 'neutral',
	BLUE = 'blue',
	PURPLE = 'purple',
	VIOLET = 'violet',
	GREEN = 'green'
}

export enum ProjectStatus {
	OPEN = 'open',
	IN_PROGRESS = 'in progress',
	DONE = 'done',
	BLOCKED = 'blocked'
}

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
	}
})
export class Project {
	@Prop({
		required: true,
		trim: true,
		minlength: 2,
		maxlength: 100,
		unique: true
	})
	name: string

	@Prop({ trim: true, maxlength: 500 })
	description: string

	@Prop({
		type: String,
		enum: Object.values(ProjectColors),
		default: ProjectColors.NEUTRAL
	})
	primaryColor: string

	@Prop({ type: Types.ObjectId, ref: 'User' })
	createdBy: Types.ObjectId

	@Prop({ type: [ProjectStageSchema] })
	stages: ProjectStage[]

	@Prop({ type: [ProjectTagSchema] })
	tags: ProjectTag[]

	@Prop({ type: [ProjectMemberSchema] })
	members: ProjectMember[]

	@Prop({
		type: String,
		enum: Object.values(ProjectStatus),
		default: 'open'
	})
	status: string

	@Prop({ type: Date })
	startDate: Date

	@Prop({ type: Date })
	endDate: Date

	@Prop({
		type: Number,
		default: 0,
		min: 0,
		max: 100
	})
	progress: number
}

export const ProjectSchema = SchemaFactory.createForClass(Project)
