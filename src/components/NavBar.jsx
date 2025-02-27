import { useState } from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import {
    Button,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div>
            <Navbar color="light" light fixed="true" expand="lg">
                <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
                    Job Opening Board
                </NavbarBrand>
                {loggedInUser ? (<>
                    <NavbarToggler onClick={toggleNavbar} />
                    <Collapse isOpen={open} navbar>
                        <Nav navbar>
                            {loggedInUser.location ? (<>
                                {/* EMPLOYER */}
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <Button color="primary">My Jobs</Button>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <Button color="primary">New Job</Button>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <Button color="primary">Company Profile</Button>
                                    </NavLink>
                                </NavItem>
                            </>) : (<>
                                {/* APPLICANT */}
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <Button color="primary">Job Postings</Button>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <Button color="primary">My Apps</Button>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        <Button color="primary">My Profile</Button>
                                    </NavLink>
                                </NavItem>
                            </>)}
                        </Nav>
                    </Collapse>
                    <Button
                        color="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            logout().then(() => {
                                setLoggedInUser(null);
                                setOpen(false);
                            });
                        }}
                    >
                        Logout
                    </Button>
                </>) : (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    );
}