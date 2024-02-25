import request from "supertest";
import express from "express";
import Student from "../controllers/student.controller.js";
import {Database, db} from "./database.mock.js";

const app = new express();

describe('student', () => {
    describe('responds to /student/:id/books', () => {
        beforeEach(() => {
            app.get('/student/:id/books', async (req, res) => {
                let student = new Student(new Database());
                await student.getBooks(req, res);
            });
            // testSession = session(app);
        });
        it('returns list of books for existing student', async () => {
            const res = await request(app).get('/student/10/books');

            expect(res.status).toBe(200);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.text).toEqual(JSON.stringify([db.books[0]]));
        });
        it('returns 404 when student is not found', async () => {
            const res = await request(app).get('/student/42/books');

            expect(res.status).toBe(404);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.text).toEqual(JSON.stringify({error: 'Student not found'}));
        });
    });
});
