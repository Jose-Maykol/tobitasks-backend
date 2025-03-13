/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticatedSocket } from '../interfaces/authenticated-socket'
import { JwtPayload } from '../interfaces/jwt-payload'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class WsAuthMiddleware implements NestMiddleware {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	use(socket: AuthenticatedSocket, next: (err?: Error) => void) {
		try {
			const token: string =
				(socket.handshake.auth.token as string) ||
				(socket.handshake.headers.authorization?.split(' ')[1] as string)

			if (!token) {
				return next(new Error('Token no encontrado'))
			}

			let payload: JwtPayload | null = null

			try {
				payload = this.jwtService.verify<JwtPayload>(token, {
					secret: this.configService.get<string>('SECRET_KEY')
				})
			} catch (error) {
				return next(new Error('Token inválido'))
			}
			socket.data.user = {
				id: payload.sub,
				email: payload.email
			}
			next()
		} catch (error) {
			next(new Error('No autorizado'))
		}
	}
}
