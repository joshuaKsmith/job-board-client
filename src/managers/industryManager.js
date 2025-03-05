const _apiUrl = "api/industry";

export const getIndustries = () => {
    return fetch(_apiUrl).then((res) => res.json());
}