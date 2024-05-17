import React, { useState } from 'react'
import AddEmployee from './AddEmployee';

const EmployeeDetails = () => {
    const [modalShow, setModalShow] = useState(true);

    return (
        <div>
            <AddEmployee show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default EmployeeDetails;