// import { Injectable } from '@nestjs/common';
import {
  Injectable,
  OnModuleInit,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class PayService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PayService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createPayDto: CreatePayDto) {
    return this.pago.create({ data: createPayDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalpages = await this.pago.count();
    const lastpage = Math.ceil(totalpages / limit);
    return {
      data: await this.pago.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalpages,
        page: page,
        lastPage: lastpage,
      },
    };
  }

  async findOne(id: number) {
    const pay = await this.pago.findFirst({ where: { id } });
    if (!pay) {
      throw new NotFoundException('Pay not found');
    }
    return pay;
  }

  async update(id: number, updatePayDto: UpdatePayDto) {
    await this.findOne(id);
    return this.pago.update({
      where: { id },
      data: updatePayDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.pago.delete({ where: { id } });
  }
}
