import {Book} from './book.model.js'

export class Student {
    id = 0;
    firstName = '';
    lastName = '';
    grade = '';
    teacher = '';
    constructor(id, firstName, lastName, grade, teacher) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.teacher = teacher;
    }

    static async get(db, id) {
        try {
            let result = await db.getStudent(id);
            if (result.size === 0) return null;
            return new Student(
                parseInt(result[0].id),
                result[0].fname,
                result[0].lname,
                result[0].grade,
                result[0].teacher
            );
        } catch (error) {
            console.log("Cannot get Student from DB: ", error);
            return null;
        }
    }
    async books(db) {
        return await Book.getAllForStudent(db, this.id);
    }
}