import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FormsService } from './forms.service';
import {
  CreateQuestionDefinitionDto, UpdateQuestionDefinitionDto,
  CreateSubmissionDto, UpdateSubmissionDto, ListSubmissionsDto
} from './dto';

@Controller()
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  // *** Público ***
  @Post('submissions')
  createSubmission(@Body() dto: CreateSubmissionDto) {
    return this.formsService.createSubmission(dto);
  }

  // *** Protegidas ***
  @UseGuards(AuthGuard)
  @Get('question-definitions')
  listQuestionDefs() { return this.formsService.listQuestionDefs(); }

  @UseGuards(AuthGuard)
  @Post('question-definitions')
  createQuestionDef(@Body() dto: CreateQuestionDefinitionDto) {
    return this.formsService.createQuestionDef(dto);
  }

  @UseGuards(AuthGuard)
  @Get('question-definitions/:questionId')
  getQuestionDef(@Param('questionId') id: string) {
    return this.formsService.getQuestionDef(id);
  }

  @UseGuards(AuthGuard)
  @Put('question-definitions/:questionId')
  updateQuestionDef(@Param('questionId') id: string, @Body() dto: UpdateQuestionDefinitionDto) {
    return this.formsService.updateQuestionDef(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('question-definitions/:questionId')
  removeQuestionDef(@Param('questionId') id: string) {
    return this.formsService.removeQuestionDef(id);
  }

  @UseGuards(AuthGuard)
  @Get('submissions')
  listSubmissions(@Query() filter: ListSubmissionsDto) {
    return this.formsService.listSubmissions(filter);
  }

  @UseGuards(AuthGuard)
  @Get('submissions/:id')
  getSubmission(@Param('id') id: string) {
    return this.formsService.getSubmission(id);
  }

  @UseGuards(AuthGuard)
  @Put('submissions/:id')
  updateSubmission(@Param('id') id: string, @Body() dto: UpdateSubmissionDto) {
    return this.formsService.updateSubmission(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('submissions/:id')
  removeSubmission(@Param('id') id: string) {
    return this.formsService.removeSubmission(id);
  }
}
