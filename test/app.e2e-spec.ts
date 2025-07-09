import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { execSync } from 'child_process';
import { AppModule } from '../src/app.module';

describe('App E2E', () => {
  let app: INestApplication;
  let server: any;
  let token = '';
  let formType: any;
  let submission: any;

  beforeAll(async () => {
    try {
      execSync('npx prisma migrate deploy');
    } catch (e) {
      console.error('migrate failed', e);
    }
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    it('should login successfully', async () => {
      const res = await request(server)
        .post('/auth/login')
        .send({ username: 'PorkColombia', password: 'Pork@admin' })
        .expect(200);
      expect(res.body).toEqual({ success: true, token: 'porkcolombia-token' });
      token = res.body.token;
    });

    it('should reject invalid credentials', () => {
      return request(server)
        .post('/auth/login')
        .send({ username: 'bad', password: 'bad' })
        .expect(401);
    });
  });

  describe('FormType CRUD', () => {
    it('list should be empty', async () => {
      const res = await request(server).get('/form-types').expect(200);
      expect(res.body).toEqual([]);
    });

    it('create', async () => {
      const res = await request(server)
        .post('/form-types')
        .send({ key: 'test', label: 'Test' })
        .expect(201);
      formType = res.body;
      expect(formType).toHaveProperty('id');
    });

    it('get one', async () => {
      const res = await request(server)
        .get(`/form-types/${formType.id}`)
        .expect(200);
      expect(res.body.id).toBe(formType.id);
    });

    it('update', async () => {
      const res = await request(server)
        .put(`/form-types/${formType.id}`)
        .send({ label: 'Updated' })
        .expect(200);
      expect(res.body.label).toBe('Updated');
    });

    it('delete', async () => {
      await request(server).delete(`/form-types/${formType.id}`).expect(200);
      await request(server).get(`/form-types/${formType.id}`).expect(404);
    });
  });

  describe('FormSubmission CRUD', () => {
    it('create submission', async () => {
      const res = await request(server)
        .post('/submissions')
        .send({
          formTypeKey: 'test',
          metadata: { name: 'meta' },
          responses: [],
        })
        .expect(201);
      submission = res.body;
      expect(submission).toHaveProperty('id');
    });

    it('list all', async () => {
      const res = await request(server).get('/submissions').expect(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('list filtered', async () => {
      const res = await request(server)
        .get(`/submissions?formTypeKey=test`)
        .expect(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('get one', async () => {
      const res = await request(server)
        .get(`/submissions/${submission.id}`)
        .expect(200);
      expect(res.body.id).toBe(submission.id);
    });

    it('update', async () => {
      const res = await request(server)
        .put(`/submissions/${submission.id}`)
        .send({ responses: [] })
        .expect(200);
      expect(res.body.id).toBe(submission.id);
    });

    it('delete', async () => {
      await request(server).delete(`/submissions/${submission.id}`).expect(200);
      await request(server).get(`/submissions/${submission.id}`).expect(404);
    });
  });

  describe('Protected dashboard', () => {
    it('should reject without token', async () => {
      await request(server).get('/admin/submissions').expect(401);
    });

    it('should allow with token', async () => {
      await request(server)
        .get('/admin/submissions')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('pdf endpoint', async () => {
      await request(server)
        .get(`/admin/submissions/${submission.id}/pdf`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
});
