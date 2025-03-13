import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../../managers/jobManager";
import { Card, CardTitle, Col, Container, Row } from "reactstrap";
import { getApplicationsByJobId } from "../../managers/applicationManager";


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

export const JobApplications = ({ loggedInUser }) => {
    const [job, setJob] = useState({});
    const [applications, setApplications] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        getJobById(id).then((data) => {
            setJob(data);
        });
        getApplicationsByJobId(id).then((data) => {
            setApplications(data);
        })
    }, [loggedInUser, id])

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    return (<>
        <Container>
            <div>
                <h2>{job.title}</h2>
                <div>
                    <div>{job.description}</div>
                    <div>
                        <div>Posted On: {formatDate(job.postedDate)}</div>
                        <div>Closes On: {formatDate(job.closesDate)}</div>
                    </div>
                </div>
            </div>
            <Row>
                {applications.map((app) => (
                    <Col md={6} key={app.applicant?.id} className="mb-4">
                        <Card style={cardBodyStyle}>
                            <CardTitle tag="h5">{app.applicant?.firstName} {app.applicant?.lastName}</CardTitle>
                            <div>APPLICANT EMAIL</div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>)
}