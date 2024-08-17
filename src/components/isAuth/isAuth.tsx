import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType
): React.FC<P> => {
    return () => {
        const navigate = useNavigate();

        // Check for the access token
        const accessToken = localStorage.getItem('accessToken');


        useEffect(() => {
            if (!accessToken) {
                // If the access token is not present, redirect to the login page
                navigate('/');
            }
        }, [accessToken, navigate])

        // If the access token is present, render the wrapped component
        return <WrappedComponent/>;
    };
};

export default withAuth;