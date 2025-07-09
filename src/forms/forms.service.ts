// src/forms/forms.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import {
  CreateQuestionDefinitionDto,
  UpdateQuestionDefinitionDto,
  CreateSubmissionDto,
  UpdateSubmissionDto,
  ListSubmissionsDto,
} from './dto';
import { FormSubmission, QuestionDefinition } from '@prisma/client';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  // ───── QuestionDefinition CRUD ─────

  createQuestionDef(dto: CreateQuestionDefinitionDto): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.create({ data: dto });
  }

  listQuestionDefs(): Promise<QuestionDefinition[]> {
    return this.prisma.questionDefinition.findMany();
  }

  getQuestionDef(questionId: string): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.findUniqueOrThrow({
      where: { questionId },
    });
  }

  updateQuestionDef(
    questionId: string,
    dto: UpdateQuestionDefinitionDto,
  ): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.update({
      where: { questionId },
      data: dto,
    });
  }

  removeQuestionDef(questionId: string): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.delete({
      where: { questionId },
    });
  }

  // ───── FormSubmission CRUD ─────

  createSubmission(dto: CreateSubmissionDto): Promise<FormSubmission> {
    const formTypeRel = dto.formTypeId
      ? { connect: { id: dto.formTypeId } }
      : {
          connectOrCreate: {
            where: { key: dto.formTypeKey! },
            create: { key: dto.formTypeKey!, label: dto.formTypeKey! },
          },
        };

    return this.prisma.formSubmission.create({
      data: {
        formType: formTypeRel,
        metadata: dto.metadata as any,
        responses: {
          create: dto.responses.map(r => ({
            questionId: r.questionId,
            response: r.response as any,
          })),
        },
      },
      include: {
        formType: true,
        responses: true,
      },
    });
  }

  listSubmissions(filter: ListSubmissionsDto = {}): Promise<FormSubmission[]> {
    const where: any = {};
    if (filter.formTypeId) where.formTypeId = filter.formTypeId;
    if (filter.formTypeKey) {
      where.formType = { is: { key: filter.formTypeKey } };
    }

    return this.prisma.formSubmission.findMany({
      where,
      include: {
        formType: true,
        responses: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  getSubmission(id: string): Promise<FormSubmission> {
    return this.prisma.formSubmission.findUniqueOrThrow({
      where: { id },
      include: {
        formType: true,
        responses: true,
      },
    });
  }

  updateSubmission(
    id: string,
    dto: UpdateSubmissionDto,
  ): Promise<FormSubmission> {
    return this.prisma.formSubmission.update({
      where: { id },
      data: {
        responses: dto.responses
          ? {
              deleteMany: {},
              create: dto.responses.map(r => ({
                questionId: r.questionId!,
                response: r.response as any,
              })),
            }
          : undefined,
      },
      include: {
        formType: true,
        responses: true,
      },
    });
  }

  removeSubmission(id: string): Promise<FormSubmission> {
    return this.prisma.formSubmission.delete({ where: { id } });
  }
}
