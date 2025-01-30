// import { Injectable, OnModuleInit, Logger, NotFoundException, } from '@nestjs/common';
import {
  Injectable,
  OnModuleInit,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';


@Injectable()
export class PropertyService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PropertyService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }




  create(createPropertyDto: CreatePropertyDto) {
    return this.property.create({ data: createPropertyDto });
  }
  
  //PAGINACION DE DATOS
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalpages = await this.property.count();
    const lastpage = Math.ceil(totalpages / limit);

    return {
      data: await this.property.findMany({
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
    const property = await this.property.findFirst({ where: { id } });
    
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    await this.findOne(id);
    return this.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.property.delete({ where: { id } });
    
  }
}
