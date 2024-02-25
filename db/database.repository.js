export class Database {
    pool;

    constructor(pool) {
        this.pool = pool;
    }

    async query(query, values){
        return new Promise((resolve, reject) => {
            return this.pool.query(query, values, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        })
    }

    async getStudent(id) {
        try {
            let result = await this.query(
                "SELECT ID as id, fname, lname, grade, teacher FROM `Student` WHERE ID = ?",
                [id]);
            if (result.size === 0) return null;
            return result;
        } catch (error) {
            console.log("Cannot get Student from DB: ", error);
            return null;
        }
    }

    async getBooksForStudent(student) {
        console.log(`Requesting books for student: ${student}`);
        try {
            return await this.query(
                "SELECT `index`, Student_Id AS student, title, author, date FROM `Books` WHERE Student_Id = ?",
                [student]);
        } catch (error) {
            console.log("Cannot get books from DB: ", error);
            return([]);
        }
    }

}