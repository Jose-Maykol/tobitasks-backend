import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from '../../database/repositories/user.repository'
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from '../dtos/register.dto'
import * as bcrypt from 'bcrypt'
import { LoginDto } from '../dtos/login.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService
	) {}

	async register(data: RegisterDto) {
		const { name, email, password } = data
		const hashedPassword: string = await bcrypt.hash(password, 10)
		const user = await this.userRepository.create({
			name,
			email,
			password: hashedPassword
		})
		return user
	}

	async login(data: LoginDto) {
		const { email, password } = data
		const user = await this.userRepository.findByEmail(email)

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException('Credenciales inválidas')
		}

		const payload = {
			sub: user._id,
			email: user.email
		}

		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
