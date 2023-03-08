import express from "express";
import { createMentor, mentorDetails, createStudent, studentDetails, addingStudent, studentsForMentor, assigningMentor } from "../service/assign.service.js";

const router = express.Router();


// 1. Creating a Mentor

router.post("/create-mentor", async function(request, response) {
    const data = {...request.body, "student" : [] };
    console.log(data);

    const res = await createMentor(data)
    response.send(res)
})

// Displaying mentor details

router.get("/mentor-details", async function(request, response) {

    const res = await mentorDetails();
    response.send(res)
})

// 2. Creating a Student

router.post("/create-student", async function(request, response) {
    const data = {...request.body, "mentor" : null };
    console.log(data);

    const res = await createStudent(data)
    response.send(res)
})

// Displaying student details

router.get("/student-details", async function(request, response) {

    const res = await studentDetails();
    response.send(res)
})

// 3. Adding student -> Actually we need to update the collections

router.put("/add-student/:id", async function(request, response) {

    const {id} = request.params;

    const data = request.body;

    const res = await addingStudent({data: data, id: +id});
    response.send(res)
})

// 4. To show all students for a particular mentor!

router.get("/student/mentor/:id", async function(request, response) {

    const {id} = request.params;

    const res = await studentsForMentor(id, response);
    return res;
})

// 5. Add or change the mentor for a student

router.put("/add-mentor/:id", async function(request, response) {

    const { id } = request.params;
    const res = await assigningMentor(request, id);

    response.send(res);
})

export default router



