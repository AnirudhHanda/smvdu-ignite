import React, { useState } from 'react';
import Signup from "@/pages/auth/Signup.jsx";
import Login from "@/pages/auth/Login.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import {SectionIcon} from "@radix-ui/react-icons";
import logoImage from "@/assets/logoImage3.svg";
import loginImage from '../../assets/ignite-login.png';
import './Auth.css';

const Auth = () => {
    const [active, setActive] = useState(true);

    return (
        <div className="flex gap-5">
            <div className="hidden md:flex items-center justify-center gap-5 w-[40%]">
                <img className="loginImage" src={loginImage} alt="Logo"/>
            </div>
            <div className="flex justify-center pt-4 items-center h-[90vh]">
                <Card className="flex justify-center items-center mx-auto">
                    <div>
                        {active ? <Signup/> : <Login/>}
                    </div>
                    <Card className="flex flex-col items-center justify-center pl-8 pr-8 border-0 mt-8">
                        {active ? (
                            <React.Fragment>
                                <span className="text-white text-2xl font-bold pb-5">Already have an account?</span>
                                <Button onClick={() => setActive(!active)}>{active ? "Sign in" : "Sign up"}</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="text-white text-2xl font-bold pb-5">Create your account !</span>
                                <Button onClick={() => setActive(!active)}>{active ? "Sign in" : "Sign up"}</Button>
                            </React.Fragment>
                        )}
                    </Card>
                </Card>
            </div>
        </div>
    );
};

export default Auth;