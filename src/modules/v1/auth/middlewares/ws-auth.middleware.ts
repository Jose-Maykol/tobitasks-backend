/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthenticatedSocket } from '../interfaces/authenticated-socket'

@Injectable()
export class WsAuthMiddleware implements NestMiddleware {
	constructor(private jwtService: JwtService) {}

	async use(socket: AuthenticatedSocket, next: (err?: Error) => void) {
		try {
			const token: string =
				(socket.handshake.auth.token as string) ||
				(socket.handshake.headers.authorization?.split(' ')[1] as string)

			if (!token) {
				return next(new Error('Token no encontrado'))
			}

			console.log('Token:', token)

			const payload = await this.jwtService.verify(token)

			console.log('Payload:', payload)

			socket.user = payload
			next()
		} catch (error) {
			next(new Error('No autorizado'))
		}
	}
}
