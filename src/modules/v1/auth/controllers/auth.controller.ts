import { Body, Controller, Post } from '@nestjs/common'
import { RegisterDto } from '../dtos/register.dto'
import { LoginDto } from '../dtos/login.dto'
import { AuthService } from '../services/auth.service'

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		return this.authService.register(registerDto)
	}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto)
	}

	/* @UseGuards(JwtAuthGuard)
	@Post('profile')
	async profile() {
		return { message: 'Acceso a perfil autorizado' }
	} */
}
