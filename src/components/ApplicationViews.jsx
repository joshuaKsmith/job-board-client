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
            <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="register" element={<Register setLoggedInUser={setLoggedInUser} />} />
            <Route path="registerapplicant" element={<RegisterApplicant setLoggedInUser={setLoggedInUser} />} />
            
            <Route path="/*" element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                    {loggedInUser?.location ? (
                        <EmployerViews 
                            loggedInUser={loggedInUser} 
                            setLoggedInUser={setLoggedInUser} 
                        />
                    ) : (
                        <ApplicantViews 
                            loggedInUser={loggedInUser} 
                            setLoggedInUser={setLoggedInUser} 
                        />
                    )}
                </AuthorizedRoute>
            } />
            
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
}