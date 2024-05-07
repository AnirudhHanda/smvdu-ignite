import React from 'react'
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import "./Navbar.css";
import logoImage from "../../assets/logoImage3.svg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PersonIcon} from "@radix-ui/react-icons";

const Navbar = () => {
    return (
        <div className="border-b py-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="wrap">
                    <img className="logoImage" src={logoImage} alt="Logo"/>
                    <div className="logoText">
                        <p className="smallName">SMVDU</p>
                        <h1 className="logoName">IGNITE</h1>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500" >
                            <PersonIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>walter akaza</p>
            </div>
        </div>
    )
}
export default Navbar
