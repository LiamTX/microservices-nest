import { Injectable } from '@nestjs/common';
import { IPostDto } from './dto/post.dto';

@Injectable()
export class AppService {
  post(data: IPostDto): IPostDto {
    return data;
  }

  get(): IPostDto {
    return {
      name: "get",
      email: "get"
    }
  }
}
