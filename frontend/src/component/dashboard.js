import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getEmployeeList } from "../slice/dashboardSlice";
import AddEmployee from './AddEmployee';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
    const dispatch = useDispatch();
    // const [employeeList, setEmployeeList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [updateEmployeeId, setUpdateEmployeeId] = useState("")

    const { enities } = useSelector((state) => state.employee)

    useEffect(() => {
        dispatch(getEmployeeList())
    }, [])

    const handleUpdate = (id) => {
        setModalShow(true);
        setUpdateEmployeeId(id);
    }

    return (
        <div>

            <Button onClick={() => setModalShow(true)}>Add</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Address</th>
                        <th>Date of joining</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {enities && enities.length > 0 ?
                        enities.map((employee, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.address}</td>
                                    <td>{moment(employee.dateOfJoining).format("Do MMM YY")}</td>
                                    <td><Button onClick={() => handleUpdate(employee._id)}>Update</Button></td>
                                </tr>
                            )
                        })
                        :
                        "No Data Found"}

                </tbody>
            </Table>
            {
                modalShow && <AddEmployee show={modalShow} onHide={() => setModalShow(false)} updateEmployeeId={updateEmployeeId} setUpdateEmployeeId={setUpdateEmployeeId} />
            }

        </div>
    )
}

export default Dashboard