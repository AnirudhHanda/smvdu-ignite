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
import {PersonIcon, HamburgerMenuIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "@/redux/auth/Action";

const Navbar = () => {
    const {auth} = useSelector(store=>store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    }
    console.log("USER: ", auth.user?.firstName);

    return (
        <div className="border-b py-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="wrap" onClick={()=>navigate("/")}>
                    <img className="logoImage" src={logoImage} alt="Logo"/>
                    <div className="logoText">
                        <p className="smallName">SMVDU</p>
                        <h1 className="logoName">IGNITE</h1>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-3 items-center">
                {/* Show About link inline on larger screens */}
                <div className="hidden sm:block mr-8">
                    <p onClick={()=>navigate("/about")} className="cursor-pointer about">About/Contact</p>
                </div>

                {/* Dropdown menu for small screens */}
                <div className="block sm:hidden ml-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500">
                                <HamburgerMenuIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => navigate("/about")}>About/Contact</DropdownMenuItem>
                            {/* <DropdownMenuItem onClick={handleLogout}></DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* User profile icon and name */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500">
                            <PersonIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>{auth.user?.firstName} {auth.user?.lastName}</p>
            </div>
        </div>
    )
}
export default Navbar;
