import Cookies from "js-cookie";

export const login = (token) => {
    Cookies.set("token", token, { expires: 7, path: "/" }); // Store token for 7 days
    window.location.replace("/dashboard"); // Redirect after login
};

export const logout = () => {
    Cookies.remove("token");
    window.location.replace("/login"); // Redirect after logout
};
