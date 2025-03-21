import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getApplicantProfileById, updateApplicantProfile } from "../../managers/profileManager";

const cardStyle = {
    maxWidth: "800px",
    margin: "0 auto",
};

export const MyProfile = ({ loggedInUser }) => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            loadApplicantProfile(loggedInUser.id);
        } else {
            setIsLoading(false);
            setErrorMessage("No user logged in");
        }
    }, [loggedInUser]);

    const loadApplicantProfile = (id) => {
        setIsLoading(true);
        getApplicantProfileById(id)
            .then(data => {
                setProfile(data);
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || ""
                });
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching applicant profile:", error);
                setIsLoading(false);
                setErrorMessage("Failed to load applicant profile");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const updatedProfile = {
            ...profile,
            firstName: formData.firstName,
            lastName: formData.lastName
        };
        
        updateApplicantProfile(profile.id, updatedProfile)
            .then(() => {
                setIsLoading(false);
                navigate(`/jobs`);
            })
            .catch(error => {
                console.error("Error updating profile:", error);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return (
            <Container>
                <div className="text-center my-5">Loading profile details...</div>
            </Container>
        );
    }

    if (!loggedInUser) {
        return (
            <Container>
                <div className="text-center my-5">
                    <h4>Please log in to edit your profile</h4>
                    <Button color="primary" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <Card style={cardStyle}>
                <CardBody>
                    <CardTitle>
                        <h2>My Profile</h2>
                    </CardTitle>
                    
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="email">Email Address</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled
                            />
                            <small className="text-muted">Email cannot be changed</small>
                        </FormGroup>
                        
                        <div className="d-flex justify-content-between mt-4">
                            <Button color="secondary" onClick={() => navigate("/dashboard")}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Update Profile
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};