const setAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
};

const getAccessToken = () => {
    return typeof localStorage !== "undefined" ? localStorage.getItem("accessToken") : "";
};

export {setAccessToken, getAccessToken};
