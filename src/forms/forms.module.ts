import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';

@Module({
  imports: [PrismaModule],
  providers: [FormsService],
  controllers: [FormsController],
  exports: [FormsService], 
})
export class FormsModule {}
