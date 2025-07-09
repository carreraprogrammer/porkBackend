import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormsModule } from './forms/forms.module';
import { FormTypesModule } from './form-types/form-types.module';

@Module({
  imports: [FormsModule, FormTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
