import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { IOrder } from './orders.common';
import {ObjectId} from 'bson';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(userId: string, orderData: Partial<IOrder>) {
    // call to api-payment
    const createdOrder = await this.ordersRepository.create({
      userId,
      status: 'CREATED',
      details: orderData.details
    });

    return createdOrder;
  }

  async cancelOrder(orderId: string) {
    // call to api-payment
    await this.ordersRepository.updateOne({
      _id: ObjectId.createFromHexString(orderId)
    }, {
      status: 'CANCELED',
    });

    const updatedOrder = await this.ordersRepository.findOne({
      _id: ObjectId.createFromHexString(orderId)
    });

    return updatedOrder;
  }

  async findOrderDetail(orderId: string) {
    const updatedOrder = await this.ordersRepository.findOne({
      _id: ObjectId.createFromHexString(orderId)
    });

    if (!updatedOrder) {
      throw new Error(`Cannot find this order ${orderId}`);
    }
    return updatedOrder;
  }

  async findUserOrders(userId) {
    return this.ordersRepository.find({userId});
  }
}
