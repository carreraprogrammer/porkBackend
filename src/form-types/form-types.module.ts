import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FormTypesService } from './form-types.service';
import { FormTypesController } from './form-types.controller';

@Module({
  imports: [PrismaModule],
  providers: [FormTypesService],
  controllers: [FormTypesController],
})
export class FormTypesModule {}
