import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserRepository } from '../../database/repositories/user.repository'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../interfaces/jwt-payload'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('SECRET_KEY') as string
		})
	}

	async validate(payload: JwtPayload) {
		const user = await this.userRepository.findById(payload.sub)
		if (!user) {
			throw new Error('Usuario no encontrado')
		}
		return payload
	}
}
