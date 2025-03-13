import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './controllers/auth.controller'
import { UserRepository } from '../database/repositories/user.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../database/schemas/user/user.schema'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('SECRET_KEY'),
				signOptions: { expiresIn: '1d' }
			})
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
