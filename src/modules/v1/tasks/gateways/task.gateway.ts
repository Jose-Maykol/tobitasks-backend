/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common'
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
import { Server } from 'socket.io'
import { WsAuthMiddleware } from '../../auth/middlewares/ws-auth.middleware'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthenticatedSocket } from '../../auth/interfaces/authenticated-socket'
import { TaskService } from '../services/task.service'
import { CreateTaskDto } from '../dtos/create-task.dto'
import { GetTasksDto } from '../dtos/get-task.dto'

@WebSocketGateway({
	namespace: '/tasks',
	cors: {
		origin: ['http://localhost:3000', 'http://localhost:5173'],
		credentials: true
	},
	transports: ['websocket', 'polling']
})
export class TaskGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server
	private logger = new Logger('TaskGateway')

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly taskService: TaskService
	) {}

	afterInit(server: Server) {
		const wsAuthMiddleware = new WsAuthMiddleware(
			this.jwtService,
			this.configService
		)
		server.use(wsAuthMiddleware.use.bind(wsAuthMiddleware))
		this.logger.log('WebSocket Project Gateway initialized')
	}

	handleConnection(client: AuthenticatedSocket) {
		this.logger.log(`Client connected: ${client.id}`)
	}

	handleDisconnect(client: AuthenticatedSocket) {
		this.logger.log(`Client disconnected: ${client.id}`)
	}

	@SubscribeMessage('getTasks')
	@UsePipes(new ValidationPipe())
	async handleGetTasks(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody() payload: GetTasksDto
	) {
		const user = client.data.user
		this.logger.log(`Client ${user.id} requested to get tasks`)
		const tasks = await this.taskService.findByProjectId(payload.projectId)
		client.emit('taskList', tasks)
	}

	@SubscribeMessage('createTask')
	@UsePipes(new ValidationPipe())
	async createTask(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody() payload: CreateTaskDto
	) {
		const user = client.data.user
		this.logger.log(`Client ${user.id} requested to create a task`)
		const newTask = await this.taskService.create({
			...payload,
			userId: user.id
		})
		client.emit('taskCreated', newTask)
	}
}
