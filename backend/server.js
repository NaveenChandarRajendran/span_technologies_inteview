const User = require('./schema/signup');
const cors = require('cors')
const Employee = require('./schema/employee');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3000" }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const url = "Please Replace it with your MongoDB URL";
mongoose.connect(url);

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser); // 201 Created
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/signup', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/employeedetails', async (req, res) => {
    if (req.body) {
        try {
            const employee = new Employee(req.body);
            const savedEmployee = await employee.save();
            res.status(201).json(savedEmployee); // 201 Created
        } catch (error) {
            console.error("Error saving employee details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ error: "Bad Request - No data provided" });
    }
});


app.get('/employeedetails', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees); // 200 OK
    } catch (error) {
        console.error("Error retrieving employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.put('/employeedetails/:id', async (req, res) => {
    const id = req.params.id;
    const { name, designation, department, dateOfJoining, address } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            name,
            designation,
            department,
            dateOfJoining,
            address
        }, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json(updatedEmployee); // 200 OK
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});




