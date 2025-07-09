import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionDefinition, FormSubmission } from '../../generated/prisma';
import {
  CreateQuestionDefinitionDto,
  UpdateQuestionDefinitionDto,
  CreateSubmissionDto,
  UpdateSubmissionDto,
  ListSubmissionsDto,
} from './dto';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  // Question definitions
  createQuestionDef(dto: CreateQuestionDefinitionDto): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.create({ data: dto });
  }

  listQuestionDefs(): Promise<QuestionDefinition[]> {
    return this.prisma.questionDefinition.findMany();
  }

  getQuestionDef(id: string): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.findUnique({ where: { id } });
  }

  updateQuestionDef(id: string, dto: UpdateQuestionDefinitionDto): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.update({ where: { id }, data: dto });
  }

  removeQuestionDef(id: string): Promise<QuestionDefinition> {
    return this.prisma.questionDefinition.delete({ where: { id } });
  }

  // Submissions
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
        metadata: dto.metadata,
        responses: {
          create: dto.responses.map((r) => ({ questionId: r.questionId, response: r.response as any })),
        },
      },
      include: { formType: true, responses: true },
    });
  }

  listSubmissions(filter: ListSubmissionsDto = {}): Promise<FormSubmission[]> {
    const where: any = {};
    if (filter.formTypeId) where.formTypeId = filter.formTypeId;
    if (filter.formTypeKey) where.formType = { is: { key: filter.formTypeKey } };
    return this.prisma.formSubmission.findMany({
      where,
      include: { formType: true, responses: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  getSubmission(id: string): Promise<FormSubmission> {
    return this.prisma.formSubmission.findUnique({ where: { id }, include: { responses: true } });
  }

  updateSubmission(id: string, dto: UpdateSubmissionDto): Promise<FormSubmission> {
    return this.prisma.formSubmission.update({
      where: { id },
      data: {
        responses: dto.responses
          ? {
              deleteMany: {},
              create: dto.responses.map((r) => ({ questionId: r.questionId!, response: r.response as any })),
            }
          : undefined,
      },
      include: { formType: true, responses: true },
    });
  }

  removeSubmission(id: string): Promise<FormSubmission> {
    return this.prisma.formSubmission.delete({ where: { id } });
  }
}
