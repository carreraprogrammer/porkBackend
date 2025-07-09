import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { FormsModule } from '../forms/forms.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [FormsModule, AuthModule],
  controllers: [AdminController],
})
export class AdminModule {}
