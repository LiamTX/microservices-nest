import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IPostDto } from './dto/post.dto';

@Controller()
export class AppController {

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:bitnami@localhost:5672/study'],
        queue: 'admin-backend'
      }
    });
  }

  @Post('post')
  post(@Body() data: IPostDto) {
    console.log(data)
    this.clientAdminBackend.emit('post-emit', data);
  }

  @Get('get')
  get(@Query('id') id: string): Observable<IPostDto> {
    return this.clientAdminBackend.send('get-send', id ? id : '');
  }
}
