/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Logger } from '@nestjs/common'
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { WsAuthMiddleware } from '../../auth/middlewares/ws-auth.middleware'
import { JwtService } from '@nestjs/jwt'

@WebSocketGateway({
	namespace: '/tasks',
	cors: {
		origin: '*'
	}
})
export class TaskGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server
	private logger = new Logger('TaskGateway')

	constructor(private readonly jwtService: JwtService) {}

	afterInit(server: Server) {
		const wsAuthMiddleware = new WsAuthMiddleware(this.jwtService)
		server.use(wsAuthMiddleware.use.bind(wsAuthMiddleware))
		this.logger.log('WebSocket Project Gateway initialized')
	}

	handleConnection(client: Socket) {
		this.logger.log(`Client connected: ${client.id}`)
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`)
	}

	@SubscribeMessage('get_tasks')
	handleGetTasks(
		@ConnectedSocket() client: Socket,
		@MessageBody() payload: any
	) {
		this.logger.log(
			`Client ${client.id} requested tasks with payload: ${payload}`
		)
		const user = client
		this.logger.log(`User: ${user}`)
		/* const projectId = client.handshake.query.id || 'No project ID' */
		client.emit('task_list', {
			tasks: [
				{
					id: 1,
					name: 'Task 1',
					description: 'Task 1 description'
				}
			]
		})
	}

	@SubscribeMessage('create_task')
	createTask(client: Socket, payload: any) {
		this.logger.log(
			`Client ${client.id} created a task with payload: ${payload}`
		)
	}
}
