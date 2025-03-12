import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteJobById, getMyJobs } from "../../managers/jobManager";
import { Button, Card, CardTitle, Col, Container, Row } from "reactstrap";



const cardImageStyle = {
    height: "200px",
    objectFit: "cover",
    width: "100%",
};
  
const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
};
  
const cardBodyStyle = {
    flex: "1 1 auto",
};

export const MyJobs = ({ loggedInUser }) => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMyJobs().then(setJobs);
    }, [loggedInUser])


    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    const handleEdit = (e) => {
        navigate(`/jobs/${e.target.value}/edit`)
    }
    
    const handleDelete = (e) => {
        const jobId = e.target.value;
        
        if (window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
          deleteJobById(jobId)
            .then(() => {
              setJobs(jobs.filter(job => job.id !== parseInt(jobId)));
            })
            .catch(error => {
              console.error("Error deleting job:", error);
              alert("Failed to delete job. Please try again.");
            });
        }
      };

    return (<>
        <Container>
            <h2>My Jobs</h2>
            <Row>
                {jobs.map((job) => (
                    <Col md={6} key={job.id} className="mb-4">
                        <Card style={cardBodyStyle}>
                            <CardTitle tag="h5">
                                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                            </CardTitle>
                            <div>
                                <div>
                                    <div>{job.description}</div>
                                    <div>
                                        <div>Posted On: {formatDate(job.postedDate)}</div>
                                        <div>Closes On: {formatDate(job.closesDate)}</div>
                                    </div>
                                </div>
                                <div>
                                    <Button value={job.id} onClick={handleEdit} color="primary">
                                        Edit Posting
                                    </Button>
                                    <Button value={job.id} onClick={handleDelete} color="danger">
                                        DELETE
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>)
}