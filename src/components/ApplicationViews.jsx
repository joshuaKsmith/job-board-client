import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import RegisterApplicant from "./auth/RegisterApplicant";
import EmployerViews from "./EmployerViews";
import ApplicantViews from "./ApplicantViews";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>
                            {loggedInUser?.location ? (
                                <EmployerViews />
                            ) : (
                                <ApplicantViews />
                            )}
                        </AuthorizedRoute>
                    }
                />
                <Route
                    path="login"
                    element={<Login setLoggedInUser={setLoggedInUser} />}
                />
                <Route
                    path="register"
                    element={<Register setLoggedInUser={setLoggedInUser} />}
                />
                <Route
                    path="registerapplicant"
                    element={<RegisterApplicant setLoggedInUser={setLoggedInUser} />}
                />
            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
}
