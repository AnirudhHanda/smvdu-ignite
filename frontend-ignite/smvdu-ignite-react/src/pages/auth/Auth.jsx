import React, { useState } from 'react';
import Signup from "@/pages/auth/Signup.jsx";
import Login from "@/pages/auth/Login.jsx";
import AdminLogin from "@/pages/auth/AdminLogin.jsx"; // Import the AdminLogin component
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import loginImage from '../../assets/ignite-login.png';
import './Auth.css';
import { useSelector } from 'react-redux';

const Auth = () => {
    const [active, setActive] = useState(true);
    const [adminLogin, setAdminLogin] = useState(false); // State to track if admin login is active
    const { auth } = useSelector(store => store);

    const handleSignupSuccess = () => {
        if (auth.error) {
            setActive(false); // Switch to the login form
        }
    };

    const handleAdminLogin = () => {
        setAdminLogin(true); // Set admin login to active
        setActive(false); // Ensure other forms are hidden
    };

    return (
        <div className="flex flex-col md:flex-row gap-5 h-screen ml-3 mr-5">
            <div className="hidden md:flex items-center justify-center gap-5 w-[40%]">
                <img className="loginImage" src={loginImage} alt="Logo" />
            </div>
            <div className="flex justify-center pt-4 items-center h-[90vh]">
                <Card className="flex justify-center items-center mx-auto">
                    <div>
                        {adminLogin ? (
                            <AdminLogin />
                        ) : (
                            active ? <Signup onSuccess={handleSignupSuccess} /> : <Login />
                        )}
                    </div>
                    <Card className="flex flex-col items-center justify-center pl-8 pr-8 border-0 mt-8">
                        {adminLogin ? (
                            <React.Fragment>
                                <span className="text-white text-2xl font-bold pb-5">Not an admin?</span>
                                <Button onClick={() => setAdminLogin(false)}>Back to User Login</Button>
                            </React.Fragment>
                        ) : (
                            active ? (
                                <React.Fragment>
                                    <span className="text-white text-2xl font-bold pb-5">Already have an account?</span>
                                    <Button onClick={() => setActive(!active)}>{active ? "Sign in" : "Sign up"}</Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <span className="text-white text-2xl font-bold pb-5">Create your account!</span>
                                    <Button onClick={() => setActive(!active)}>{active ? "Sign in" : "Sign up"}</Button>
                                </React.Fragment>
                            )
                        )}
                        {!adminLogin && (
                            <Button className="mt-4" onClick={handleAdminLogin}>Login as Admin</Button>
                        )}
                    </Card>
                </Card>
            </div>
        </div>
    );
};

export default Auth;
