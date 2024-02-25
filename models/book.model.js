export class Book {
    index = 0;
    student = 0;
    title = '';
    author = '';
    date = '';

    constructor(id, student, title, author, date) {
        this.index = id;
        this.student = student;
        this.title = title;
        this.author = author;
        this.date = date;
    }

    static async getAllForStudent(db, student) {
        console.log(`Requesting books for student: ${student}`);
        let result = await db.getBooksForStudent(student);
        return result.map(row => {
            return new Book(parseInt(row.index), parseInt(row.student), row.title, row.author, row.date);
        });
    }
}