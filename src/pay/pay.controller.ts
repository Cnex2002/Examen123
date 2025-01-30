// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
import { PayService } from './pay.service';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { PaginationDto } from 'src/common';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}
  //INSER INTO
  @Post()
  create(@Body() createPayDto: CreatePayDto) {
    return this.payService.create(createPayDto);
  }

  //Paginacion 
  @Get()
  findAll(@Query() PaginationDto: PaginationDto) {
    return this.payService.findAll(PaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayDto: UpdatePayDto) {
    return this.payService.update(+id, updatePayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payService.remove(+id);
  }
}
