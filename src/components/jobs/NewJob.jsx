import { useState } from "react";
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../managers/jobManager";

const cardStyle = {
    maxWidth: "800px",
    margin: "0 auto",
};

export const NewJob = ({ loggedInUser }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        closesDate: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

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
        
        const newJob = {
            title: formData.title,
            description: formData.description,
            closesDate: formData.closesDate,
            postedDate: new Date().toISOString(),
            userProfileId: loggedInUser.id
        };
        
        createJob(newJob)
            .then(() => {
                setIsLoading(false);
                navigate("/jobs");
            })
            .catch(error => {
                console.error("Error creating job:", error);
                setIsLoading(false);
                setErrorMessage("Failed to create job. Please try again.");
            });
    };

    if (isLoading) {
        return (
            <Container>
                <div className="text-center my-5">Creating job...</div>
            </Container>
        );
    }

    if (!loggedInUser) {
        return (
            <Container>
                <div className="text-center my-5">
                    <h4>Please log in to create jobs</h4>
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
                        <h2>Create New Job</h2>
                    </CardTitle>
                    
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Job Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="description">Job Description</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                rows="6"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="closesDate">Closing Date</Label>
                            <Input
                                type="date"
                                name="closesDate"
                                id="closesDate"
                                value={formData.closesDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]} // Cannot choose dates in the past
                                required
                            />
                        </FormGroup>
                        
                        <div className="d-flex justify-content-between mt-4">
                            <Button color="secondary" onClick={() => navigate("/jobs")}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Create Job
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};