import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormType } from '../../generated/prisma';
import { CreateFormTypeDto, UpdateFormTypeDto } from './dto';

@Injectable()
export class FormTypesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFormTypeDto): Promise<FormType> {
    return this.prisma.formType.create({ data: dto });
  }

  findAll(): Promise<FormType[]> {
    return this.prisma.formType.findMany();
  }

  findOne(id: number): Promise<FormType | null> {
    return this.prisma.formType.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateFormTypeDto): Promise<FormType> {
    return this.prisma.formType.update({ where: { id }, data: dto });
  }

  remove(id: number): Promise<FormType> {
    return this.prisma.formType.delete({ where: { id } });
  }
}
