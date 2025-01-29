import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PaginationDto } from 'src/common';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  //INSIERTA
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    //  return createPersonDto;
    return this.peopleService.create(createPersonDto);
  }

  //PAGINACION DE DATOS
  @Get()
  findAll(@Query() PaginationDto: PaginationDto) {
    // return PagiationDto;
    return this.peopleService.findAll(PaginationDto);
  }
  //TRAE UNO
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',) id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
