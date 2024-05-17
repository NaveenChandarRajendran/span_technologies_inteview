import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    const isValidRoute = isRouteErrorResponse(error);
    return (
        <div>
            <h1>Error page</h1>
            <p>{isValidRoute ? 'Invalid Page' : 'Something went wrong'}</p>
        </div>
    )
}

export default ErrorPage;