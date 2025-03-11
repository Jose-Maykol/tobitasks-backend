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

@WebSocketGateway({
	namespace: '/project',
	cors: {
		origin: '*'
	}
})
export class ProjectGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server
	private logger = new Logger('TaskGateway')

	constructor() {}

	afterInit(server: Server) {
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
		/* const projectId = client.handshake.query.id || 'No project ID' */
		client.emit('tasks', { tasks: [] })
	}

	@SubscribeMessage('create_task')
	createTask(client: Socket, payload: any) {
		this.logger.log(
			`Client ${client.id} created a task with payload: ${payload}`
		)
	}
}
