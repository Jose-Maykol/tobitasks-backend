import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './controllers/auth.controller'
import { UserRepository } from '../database/repositories/user.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../database/schemas/user/user.schema'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'your-secret-key',
			signOptions: { expiresIn: '1h' }
		}),
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: UserSchema
			}
		])
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UserRepository]
})
export class AuthModule {}
