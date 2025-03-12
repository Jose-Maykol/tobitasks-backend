import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserRepository } from '../../database/repositories/user.repository'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../interfaces/jwt-payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userRepository: UserRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'your-secret-key'
		})
	}

	async validate(payload: JwtPayload) {
		console.log('payload', payload)
		const user = await this.userRepository.findById(payload.sub)
		if (!user) {
			throw new Error('Usuario no encontrado')
		}
		return user
	}
}
