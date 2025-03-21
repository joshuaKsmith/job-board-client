const _apiUrl = "/api/profile";

export const getApplicantProfileById = (id) => {
    return fetch (_apiUrl + `/applicant/${id}`).then((res) => res.json());
}

export const updateApplicantProfile = (id, profile) => {
    return fetch(_apiUrl + `/applicant/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    }).then((res) => res.json());
}

export const getEmployerProfileById = (id) => {
    return fetch(_apiUrl + `/employer/${id}`).then((res) => res.json());
}

export const updateEmployerProfile = (id, profile) => {
    return fetch(_apiUrl + `/employer/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    }).then((res) => res.json());
}