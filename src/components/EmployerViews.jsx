
import { Route, Routes } from "react-router-dom";
import Welcome from "./welcome/Welcome";
import { MyJobs } from "./jobs/MyJobs";
import { NewJob } from "./jobs/NewJob";
import { JobApplications } from "./jobs/JobApplications";
import { EditJob } from "./jobs/EditJob";
import { CompanyProfile } from "./companies/CompanyProfile";


export default function EmployerViews({ loggedInUser, setLoggedInUser }) {
    return (
        <Routes>
            <Route
                index
                element={<Welcome loggedInUser={loggedInUser} />}
            />
            <Route path="jobs">
                <Route
                    index
                    element={<MyJobs loggedInUser={loggedInUser} />}
                />
                <Route
                    path="new"
                    element={<NewJob loggedInUser={loggedInUser} />}
                />
                <Route path=":id">
                    <Route
                        index
                        element={<JobApplications loggedInUser={loggedInUser} />}
                    />
                    <Route
                        path="edit"
                        element={<EditJob loggedInUser={loggedInUser} />}
                    />
                </Route>
            </Route>
            <Route path="company">
                <Route
                    index
                    element={<CompanyProfile loggedInUser={loggedInUser} />}
                />
            </Route>
        </Routes>
    );
}   