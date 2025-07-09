import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FormsService } from './forms.service';
import {
  CreateQuestionDefinitionDto,
  UpdateQuestionDefinitionDto,
  CreateSubmissionDto,
  UpdateSubmissionDto,
  ListSubmissionsDto,
} from './dto';

@Controller()
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  // QuestionDefinition routes
  @Post('question-definitions')
  createQuestionDef(@Body() dto: CreateQuestionDefinitionDto) {
    return this.formsService.createQuestionDef(dto);
  }

  @Get('question-definitions')
  listQuestionDefs() {
    return this.formsService.listQuestionDefs();
  }

  @Get('question-definitions/:id')
  getQuestionDef(@Param('id') id: string) {
    return this.formsService.getQuestionDef(id);
  }

  @Put('question-definitions/:id')
  updateQuestionDef(@Param('id') id: string, @Body() dto: UpdateQuestionDefinitionDto) {
    return this.formsService.updateQuestionDef(id, dto);
  }

  @Delete('question-definitions/:id')
  removeQuestionDef(@Param('id') id: string) {
    return this.formsService.removeQuestionDef(id);
  }

  // FormSubmission routes
  @Post('submissions')
  createSubmission(@Body() dto: CreateSubmissionDto) {
    return this.formsService.createSubmission(dto);
  }

  @Get('submissions')
  listSubmissions(@Query() filter: ListSubmissionsDto) {
    return this.formsService.listSubmissions(filter);
  }

  @Get('submissions/:id')
  getSubmission(@Param('id') id: string) {
    return this.formsService.getSubmission(id);
  }

  @Put('submissions/:id')
  updateSubmission(@Param('id') id: string, @Body() dto: UpdateSubmissionDto) {
    return this.formsService.updateSubmission(id, dto);
  }

  @Delete('submissions/:id')
  removeSubmission(@Param('id') id: string) {
    return this.formsService.removeSubmission(id);
  }
}
