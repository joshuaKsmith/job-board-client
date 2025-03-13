const _apiUrl = "/api/application";

export const getApplicationsByJobId = (jobId) => {
    return fetch(_apiUrl + "/" + jobId).then((res) => res.json());
}

export const createNewApplication = (jobId) => {
    return fetch(_apiUrl + "/" + jobId, {
        method: "POST"
    })
}

export const cancelApplication = (jobId) => {
    return fetch(_apiUrl + "/" + jobId, {
        method: "DELETE"
    })
}

export const getUserApplications = () => {
    return fetch(_apiUrl + "/my").then((res) => res.json());
}