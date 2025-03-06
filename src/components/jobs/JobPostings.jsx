import { useEffect } from "react";
import { useState } from "react"
import { getAllJobs } from "../../managers/jobManager";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { createNewApplication, getUserApplications } from "../../managers/applicationManager";
import { useNavigate } from "react-router-dom";


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

export const JobPostings = ({ loggedInUser }) => {
    const [jobs, setJobs] = useState([]);
    const [userApplications, setUserApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllJobs().then(setJobs);

        if (loggedInUser) {
            getUserApplications(loggedInUser.id).then(setUserApplications);
        }
    }, [loggedInUser])

    const handleApply = (e) => {
        createNewApplication(e.target.value).then((data) => {
            navigate("/applications")
        })
    }

    const hasApplied = (jobId) => {
        return userApplications.some(app => app.job?.id === jobId);
    }

    return (<>
        <Container>
            <h2>All Jobs</h2>
            <Row>
                {jobs.map((job) => (
                    <Col md={6} key={job.id} className="mb-4">
                        <Card style={cardStyle}>
                            <CardBody style={cardBodyStyle}>
                                <CardTitle tag="h5">
                                    <h5>{job.title}</h5>
                                    <h6>{job.company?.name}</h6>
                                </CardTitle>
                                <div>
                                    <div>
                                        <div>{job.description}</div>
                                        <div>
                                            <div>{job.postedDate}</div>
                                            <div>{job.closesDate}</div>
                                        </div>
                                    </div>
                                    {!hasApplied(job.id) ? (
                                        <Button value={job.id} onClick={handleApply} color="primary">
                                            Apply
                                        </Button>
                                    ) : (
                                        <span className="text-success">Applied</span>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>)
}