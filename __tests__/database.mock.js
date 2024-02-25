import {Book} from "../models/book.model.js";
import {Student} from "../models/student.model.js";

export let db = {
    students: [
        new Student(10, "John", "Hancock", "5", "Johnson")
    ],
    books: [
        new Book(1, 10, 'Book', 'Author', '2024-02-24')
    ]
}
export class Database {

    async getStudent(id){
        return new Promise((resolve, reject) => {
           let result = db.students.filter(student => {
               console.log(student, id);
               return student.id === parseInt(id);
           });
           // console.log(result);
           resolve(result);
        });
    }

    async getBooksForStudent(student){
        return new Promise((resolve, reject) => {
            resolve(db.books.filter(book => {return book.student === parseInt(student)}));
        });
    }
}
