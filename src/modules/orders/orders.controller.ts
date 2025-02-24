import {
  Controller,
  Patch,
  Param,
  Body,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { OrderHistoriesService } from '../orderHistories/orderHistories.service';
import { Order } from './Order.entity';
import { UpdateOrderDto } from '../../dto/orders/updateOrder.dto';
import { UpdateTechicalDataDto } from 'src/dto/orders/updateTechData.dto';
import { UpdateStatusDto } from 'src/dto/orders/updateTechStatus.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/roles/role.guard';
import { Roles } from 'src/decorators/role/role.decorator';
import { Role } from 'src/enum/Role.enum';
import { CreationOrderDto } from './dto/creationOrderDto.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderHistoriesService: OrderHistoriesService,
  ) {}

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/
  @Get() // Endpoint verificado!
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Get('email/:clientEmail') // Endpoint verificado!
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async getOrdersByClientEmail(
    @Param('clientEmail') clientEmail: string,
  ): Promise<Order[]> {
    return this.ordersService.getOrdersByClientEmail(clientEmail);
  }

  @Get('technician/:technId') // Endpoint verificado!
  // @Roles(Role.TECHN)
  // @UseGuards(AuthGuard, RoleGuard)
  async getOrdersByTechnId(
    @Param('technId') technId: string,
  ): Promise<Order[]> {
    return this.ordersService.getOrdersByTechnId(technId);
  }

  /*@Get ('status/:status')

  async getByStatus (@Param ('status') status: OrderStatus): Promise<Order []> {

    return this.ordersService.getByStatus (status);

  }*/

  @Get(':id') // Endpoint verificado!
  @Roles(Role.ADMIN, Role.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  async getOrderById(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.getOrderById(orderId);
  }

  // @Post('create')
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  // async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
  //   return this.ordersService.createOrder(createOrderDto);
  // }

  @Post('create')
  async createOrder(@Body() orderData: CreationOrderDto) {
    console.log(orderData);
    return this.ordersService.orderCreation(orderData);
  }

  @Patch('technicaldata/:id') // Endpoint verificado!
  // @Roles(Role.TECHN)
  // @UseGuards(AuthGuard, RoleGuard)
  async updateTechnicalData(
    @Param('id') orderId: string,
    @Body() updateTechnicalDataDto: UpdateTechicalDataDto,
  ): Promise<Order> {
    return this.ordersService.updateTechnicalData(
      orderId,
      updateTechnicalDataDto,
    );
  }

  @Patch('orderUpdate/:id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updateData: UpdateOrderDto,
  ){
    return this.ordersService.orderUpdate(orderId, updateData);
  }

  @Patch(':id/status') // Endpoint verificado!
  // @Roles(Role.TECHN)
  // @UseGuards(AuthGuard, RoleGuard)
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(orderId, updateStatusDto);
  }

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/
  /* Falso Delete*/
  @Put('inactivate/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async inactivedelete(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<{ message: string }> {
    return this.ordersService.inactiveDelete(orderId, updateOrderDto);
  }
}
