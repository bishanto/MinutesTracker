import * as model from '../models/student.model.js';

export default class StudentController {
    db;
    constructor(db) {
        this.db = db;
    }

    async getStudent(req, res){
        res.send(await model.Student.get(this.db, req.params.id));
    }

    async getBooks(req, res) {
        let student = await model.Student.get(this.db, req.params.id);
        if (student === null) {
            res.status(404).send({error: 'Student not found'});
            return;
        }
        res.send(await student.books(this.db));
    }
}