import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IPostDto } from './dto/post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('post-emit')
  async post(@Payload() data: IPostDto) {
    return await this.appService.post(data);
  }

  @MessagePattern('get-send')
  async get(@Payload() id: string) {
    return await this.appService.get();
  }
}
