import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { getEmployeeList } from '../slice/dashboardSlice';

function AddEmployee(props) {
    const dispatch = useDispatch();
    const { updateEmployeeId, setUpdateEmployeeId } = props;
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('Software Developer');
    const [department, setDepartment] = useState('Engineering');
    const [joinDate, setJoinDate] = useState(new Date());
    const [address, setAddress] = useState('');
    const [employeeData, setEmployeeData] = useState(null)

    useEffect(() => {
        getUpdatingDate();
    }, [updateEmployeeId])

    const getUpdatingDate = async () => {
        if (updateEmployeeId) {
            const response = await axios.put(`http://localhost:3001/employeedetails/${updateEmployeeId}`);
            if (response && response.data) {
                setEmployeeData(response.data);

            }
        }
    }

    useEffect(() => {
        if (employeeData) {
            setName(employeeData.name);
            setDesignation(employeeData.designation);
            setDepartment(employeeData.department);
            setJoinDate(new Date(employeeData.dateOfJoining));
            setAddress(employeeData.address);
        }
    }, [employeeData]);

    const clearState = () => {
        setName("");
        setDesignation('');
        setDepartment('');
        setJoinDate(new Date());
        setAddress('');
        setEmployeeData(null);
        setUpdateEmployeeId("")
    }

    const handleInputChange = (value, field) => {
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'designation':
                setDesignation(value);
                break;
            case 'department':
                setDepartment(value);
                break;
            case 'date':
                setJoinDate(value);
                break;
            case 'address':
                setAddress(value);
                break;
            default:
                break;
        }
    };

    const handleSelectChange = (e, field) => {
        handleInputChange(e.target.value, field);
    };

    const handleClose = () => {
        clearState()
        props.onHide()
    }

    const handleUpdate = () => {
        try {
            const payLoad = {
                name,
                designation,
                department,
                "dateOfJoining": joinDate,
                address
            }
            const postEmployee = axios.put(`http://localhost:3001/employeedetails/${updateEmployeeId}`, payLoad);
            if (postEmployee) props.onHide();
            dispatch(getEmployeeList());
        } catch (err) {
            console.log("err", err);
            props.onHide();
        }
    }

    const handleSave = () => {
        try {
            const payLoad = {
                name,
                designation,
                department,
                "dateOfJoining": joinDate,
                address
            }
            const postEmployee = axios.post('http://localhost:3001/employeedetails', payLoad);
            if (postEmployee) props.onHide();
            dispatch(getEmployeeList());
        } catch (err) {
            console.log("err", err);
            props.onHide();
        }
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        AddEmployee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" name='name' value={name} onChange={(e) => handleInputChange(e.target.value, "name")} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Designation</Form.Label>
                            <Form.Select aria-label="Default select example" value={designation} onChange={(e) => handleSelectChange(e, "designation")}>
                                <option value="Software Developer">Software Developer</option>
                                <option value="Front End Developer">Front End Developer</option>
                                <option value="Back End Developer">Back End Developer</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Department</Form.Label>
                            <Form.Select aria-label="Default select example" value={department} onChange={(e) => handleSelectChange(e, "department")}>
                                <option value="Engineering">Engineering</option>
                                <option value="Arts">Arts</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Select Join Date</Form.Label>
                            <DatePicker selected={joinDate} onChange={(date) => handleInputChange(date, "date")} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} value={address} name='address' onChange={(e) => handleInputChange(e.target.value, "address")} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {employeeData ? <Button onClick={() => handleUpdate()}>Update</Button> : <Button onClick={() => handleSave()}>Save</Button>}

                    <Button onClick={() => handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddEmployee