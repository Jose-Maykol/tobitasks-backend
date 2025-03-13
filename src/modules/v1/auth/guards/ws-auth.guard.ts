import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { AuthenticatedSocket } from '../interfaces/authenticated-socket'

@Injectable()
export class WsAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const client = context.switchToWs().getClient<AuthenticatedSocket>()

		if (!client.data.user) {
			throw new WsException('Acceso no autorizado')
		}

		return true
	}
}
