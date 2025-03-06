import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { cancelApplication, getUserApplications } from "../../managers/applicationManager";
import { useNavigate } from "react-router-dom";

const cardStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const cardBodyStyle = {
  flex: "1 1 auto",
};

export const MyApps = ({ loggedInUser }) => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
  }, [loggedInUser]);

  const loadApplications = () => {
    setIsLoading(true);
    if ( loggedInUser ) {
      getUserApplications()
        .then(data => {
          setApplications(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching applications:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const handleWithdraw = (jobId) => {
    cancelApplication(jobId)
      .then(() => {
        loadApplications();
      })
      .catch(error => {
        console.error("Error withdrawing application:", error);
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Container>
        <h2>My Applications</h2>
        <div className="text-center my-5">Loading your applications...</div>
      </Container>
    );
  }

  if (!loggedInUser) {
    return (
      <Container>
        <div className="text-center my-5">
          <h4>Please log in to view your applications</h4>
          <Button color="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <div className="text-center my-5">
          <h4>You haven't applied to any jobs yet</h4>
          <Button color="primary" onClick={() => navigate("/jobs")}>
            Browse Jobs
          </Button>
        </div>
      ) : (
        <Row>
          {applications.map((application) => (
            <Col md={6} key={application.id} className="mb-4">
              <Card style={cardStyle}>
                <CardBody style={cardBodyStyle}>
                  <CardTitle tag="h5">
                    <h5>{application.job?.title}</h5>
                    <h6>{application.job?.company?.name}</h6>
                  </CardTitle>
                  <div>
                    <div className="mb-3">
                      <div>{application.job?.description}</div>
                      <div>Posted On: {formatDate(application.job.postedDate)}</div>
                      <div>Closes On: {formatDate(application.job.closesDate)}</div>
                    </div>
                    <Button 
                        onClick={() => handleWithdraw(application.id)} 
                        color="danger"
                        size="sm"
                    >
                        Withdraw Application
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};