const _apiUrl = "api/job";

export const getAllJobs = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const getJobById = (id) => {
    return fetch(_apiUrl + "/" + id).then((res) => res.json());
}

export const editJob = (id, job) => {
    return fetch(_apiUrl + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
    }).then((res) => res.json());
}

export const getMyJobs = () => {
    return fetch(_apiUrl + "/my").then((res) => res.json());
}

export const deleteJobById = (id) => {
    return fetch(_apiUrl + "/" + id, {
        method: "DELETE"
    });
}

export const createJob = (job) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
    }).then((res) => res.json());
}