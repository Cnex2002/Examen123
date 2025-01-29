import {
  Injectable,
  OnModuleInit,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { stat } from 'fs';
import { last, NotFoundError } from 'rxjs';

@Injectable()
export class PeopleService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PeopleService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createPersonDto: CreatePersonDto) {
    return this.person.create({ data: createPersonDto });
  }

  //PAGINACION DE DATOS
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalpages = await this.person.count();
    const lastpage = Math.ceil(totalpages / limit);

    return {
      data: await this.person.findMany({
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
    const persona = await this.person.findFirst({ where: { id } });
    
    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }
    return persona;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    await this.findOne(id);
    return this.person.update({
      where: { id },
      data: updatePersonDto,
    });

    // return `This action updates a #${id} person`;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.person.delete({ where: { id } });
    // return `This action removes a #${id} person`;
  }
}
