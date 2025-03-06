const _apiUrl = "api/application";

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