import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getEmployerProfileById, updateEmployerProfile } from "../../managers/profileManager";

const cardStyle = {
    maxWidth: "800px",
    margin: "0 auto",
};

export const CompanyProfile = ({ loggedInUser }) => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            loadEmployerProfile(loggedInUser.id);
        } else {
            setIsLoading(false);
            setErrorMessage("No user logged in");
        }
    }, [loggedInUser]);

    const loadEmployerProfile = (id) => {
        setIsLoading(true);
        getEmployerProfileById(id)
            .then(data => {
                setProfile(data);
                setFormData({
                    name: data.name || "",
                    location: data.location || "",
                    email: data.email || ""
                });
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching employer profile:", error);
                setIsLoading(false);
                setErrorMessage("Failed to load employer profile");
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
            name: formData.name,
            location: formData.location
        };
        
        updateEmployerProfile(profile.id, updatedProfile)
            .then(() => {
                setIsLoading(false);
                navigate(`/`);
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
                        <h2>Company Profile</h2>
                    </CardTitle>
                    
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
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