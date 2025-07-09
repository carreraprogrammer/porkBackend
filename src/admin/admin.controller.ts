import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { FormsService } from '../forms/forms.service';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly formsService: FormsService) {}

  @Get('submissions')
  list() {
    return this.formsService.listSubmissions();
  }

  @Get('submissions/:id/pdf')
  async getPdf(@Param('id') id: string, @Res() res: Response) {
    const submission = await this.formsService.getSubmission(id);
    const buf = Buffer.from(JSON.stringify(submission));
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buf);
  }
}
