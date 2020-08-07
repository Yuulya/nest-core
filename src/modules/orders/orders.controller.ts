import {Controller, Post, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  @Post('create_order')
  createOrder() {
    // mark order status as created
    return {};
  }

  @Post('cancel_order')
  cancelOrder() {
    // mark order status as canceled
    return {}
  }

  @Get('get_order')
  getOrder() {
    return {}
  }
}