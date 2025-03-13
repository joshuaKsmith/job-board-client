import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { editJob, getJobById } from "../../managers/jobManager";

const cardStyle = {
  maxWidth: "800px",
  margin: "0 auto",
};

export const EditJob = ({ loggedInUser }) => {
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    closesDate: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id: jobId } = useParams();

  useEffect(() => {
    if (jobId) {
      loadJob(jobId);
    } else {
      setIsLoading(false);
      setErrorMessage("No job ID provided");
    }
  }, [jobId]);

  const loadJob = (id) => {
    setIsLoading(true);
    getJobById(id)
      .then(data => {
        setJob(data);
        
        const formattedDate = data.closesDate ? 
          new Date(data.closesDate).toISOString().split('T')[0] : 
          "";
        
        setFormData({
          description: data.description || "",
          closesDate: formattedDate
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching job:", error);
        setIsLoading(false);
        setErrorMessage("Failed to load job details");
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
    
    const updatedJob = {
      ...job,
      description: formData.description,
      closesDate: formData.closesDate
    };
    
    editJob(job.id, updatedJob)
      .then(() => {
        setIsLoading(false);
        navigate(`/jobs`);
      })
      .catch(error => {
        navigate(`/jobs`)
      });
  };

  const canEditJob = () => {
    if (!loggedInUser || !job ) return false;
    return loggedInUser.id === job.company?.id;
  };

  if (isLoading) {
    return (
      <Container>
        <div className="text-center my-5">Loading job details...</div>
      </Container>
    );
  }

  if (!loggedInUser) {
    return (
      <Container>
        <div className="text-center my-5">
          <h4>Please log in to edit jobs</h4>
          <Button color="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </Container>
    );
  }

//   if (!canEditJob()) {
//     return (
//       <Container>
//         <div className="text-center my-5">
//           <h4>You don't have permission to edit this job</h4>
//           <Button color="primary" onClick={() => navigate("/jobs/manage")}>
//             Back to My Jobs
//           </Button>
//         </div>
//       </Container>
//     );
//   }

  return (
    <Container>
      <Card style={cardStyle}>
        <CardBody>
          <CardTitle>
            <h2>Edit Job</h2>
            {job && (
              <div>
                <h5>{job.title}</h5>
                <h6>Posted: {new Date(job.postedDate).toLocaleDateString()}</h6>
              </div>
            )}
          </CardTitle>
          
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          
          <Form onSubmit={handleSubmit}>
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
              <Button color="secondary" onClick={() => navigate("/jobs/")}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};