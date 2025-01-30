// import { Injectable } from '@nestjs/common';
import {
  Injectable,
  OnModuleInit,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ContactService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ContactService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createContactDto: CreateContactDto) {
    return this.contact.create({ data: createContactDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalpages = await this.contact.count();
    const lastpage = Math.ceil(totalpages / limit);
    return {
      data: await this.contact.findMany({
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
    const contact = await this.contact.findFirst({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.findOne(id);
    return this.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.contact.delete({ where: { id } });
  }
}
