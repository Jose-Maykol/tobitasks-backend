import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User extends Document {
	@Prop({
		required: true,
		trim: true,
		minlength: 2,
		maxlength: 100,
		unique: true
	})
	name: string
	@Prop({
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	})
	email: string
	@Prop({
		required: true,
		minlength: 6
	})
	password: string
	@Prop({ default: null })
	profilePicture: string
	@Prop({ default: true })
	isActive: boolean
	@Prop({ default: null })
	lastLogin: Date
	@Prop({ default: null })
	githubId: string
	@Prop({ default: null })
	googleId: string
}

export const UserSchema = SchemaFactory.createForClass(User)
