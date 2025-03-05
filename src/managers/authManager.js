const _apiUrl = "/api/auth";

export const login = (email, password) => {
    return fetch(_apiUrl + "/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
    }).then((res) => {
        if (res.status !== 200) {
            return Promise.resolve(null);
        } else {
            return Promise.all([
                tryGetLoggedInUser().catch(() => null),
                tryGetLoggedInApplicant().catch(() => null)
            ]).then((data) => {
                if (data[0].id) {
                    return tryGetLoggedInUser();
                } else {
                    return tryGetLoggedInApplicant();
                }
            })
        }
    });
};

export const logout = () => {
  return fetch(_apiUrl + "/logout");
};

export const tryGetLoggedInUser = () => {
  return fetch(_apiUrl + "/me").then((res) => {
    return res.status === 401 ? Promise.resolve(null) : res.json();
  });
};

export const tryGetLoggedInApplicant = () => {
    return fetch(_apiUrl + "/applicant").then((res) => {
        return res.status === 401 ? Promise.resolve(null) : res.json();
    });
};

export const register = (userProfile) => {
  userProfile.password = btoa(userProfile.password);
  return fetch(_apiUrl + "/register", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  }).then(() => tryGetLoggedInUser());
};

export const registerApplicant = (applicantProfile) => {
    applicantProfile.password = btoa(applicantProfile.password);
    return fetch(_apiUrl + "/registerapplicant", {
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(applicantProfile)
    }).then(() => tryGetLoggedInApplicant());
}