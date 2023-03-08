import { client } from "../index.js";

export async function assigningMentor(request, id) {
    const data = request.body;

    let student = await client.db("day41task").collection("student").findOne({ "id": 100 });

    let result = await client.db("day41task").collection("student").updateOne({ "id": +id }, { $set: { "mentor": +data.mentor } });

    let mentor = await client.db("day41task").collection("mentor").findOne({ "id": data.mentor });

    let mentorResult = await client.db("day41task").collection("mentor").updateOne({ "id": data.mentor }, { $set: { "student": [...mentor.student, +id] } });

    return result;
}
export async function studentsForMentor(id, response) {
    const mentor = await client.db("day41task").collection("mentor").findOne({ "id": +id });

    if (mentor.student.length == 0) {
        response.send("No students were assigned for this mentor");
    }

    else {

        let result = mentor.student.map(async (val) => {
            return await client.db("day41task").collection("student").findOne({ "id": val });
        });

        Promise.all(result)
            .then((val) => {
                response.send(val);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
export async function addingStudent({ data, id }) {

    const mentor = await client.db("day41task").collection("mentor").findOne({ "id": id });

    data.student.map(async (val) => {
        console.log(val);
        let student = await client.db("day41task").collection("student").findOne({ "id": val });
        console.log(student);
        if (student.mentor != val && (!mentor.student.includes(val))) {
            let result = await client.db("day41task").collection("mentor").updateOne({ "id": +id }, { $set: { "student": [...mentor.student, val] } });

            student = await client.db("day41task").collection("student").updateOne({ "id": val }, { $set: { "mentor": +id } });
            return result;
        }
    });

    console.log(data);

    return mentor;
}
export async function studentDetails() {
    return await client
        .db("day41task")
        .collection("student")
        .find({})
        .toArray();
}
export async function createStudent(data) {
    return await client
        .db("day41task")
        .collection("student")
        .insertOne(data);
}
export async function mentorDetails() {
    return await client
        .db("day41task")
        .collection("mentor")
        .find({})
        .toArray();
}
export async function createMentor(data) {
    return await client
        .db("day41task")
        .collection("mentor")
        .insertOne(data);
}
