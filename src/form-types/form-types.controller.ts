import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FormTypesService } from './form-types.service';
import { CreateFormTypeDto, UpdateFormTypeDto } from './dto';

@Controller('form-types')
export class FormTypesController {
  constructor(private readonly service: FormTypesService) {}

  @Post()
  create(@Body() dto: CreateFormTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFormTypeDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
