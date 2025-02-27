import { Route, Routes } from "react-router-dom";
import Welcome from "./welcome/Welcome";
import { JobPostings } from "./jobs/JobPostings";
import { MyApps } from "./applications/MyApps";
import { MyProfile } from "./profile/MyProfile";


export default function ApplicantViews({ loggedInUser, setLoggedInUser }) {
    return (
        <Routes>
            <Route
                index
                element={<Welcome loggedInUser={loggedInUser} />}
            />
            <Route path="jobs">
                <Route
                    index
                    element={<JobPostings loggedInUser={loggedInUser} />}
                />
            </Route>
            <Route path="applications">
                <Route
                    index
                    element={<MyApps loggedInUser={loggedInUser} />}
                />
            </Route>
            <Route path="profile">
                <Route
                    index
                    element={<MyProfile loggedInUser={loggedInUser} />}
                />
            </Route>
        </Routes>
    );
}