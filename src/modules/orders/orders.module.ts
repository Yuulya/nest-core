import { OrderController } from './orders.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBModelNames } from '../../common/constants';
import { OrderSchema } from './orders.schema';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
        {name: DBModelNames.Order, schema: OrderSchema},
    ])
  ],
  controllers: [OrderController],
  providers: [OrdersRepository, OrdersService],
})
export class OrdersModule {}
