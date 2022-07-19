import axios from "axios";

class AuthService {

  register = async ({fullname, email, password}) => {
    try {
      await axios.post(
        "https://api.dotenx.com/user/management/project/noelOND7MdGyoUDU/register",
        {
          fullname,
          email,
          password,
        }
      );
    } catch (error) {
      throw new Error(`Failed to sign up: ${error.message}`);
    }
  };

  login = async ({email, password}) => {
    try {
      const response = await axios.post(
        "https://api.dotenx.com/user/management/project/noelOND7MdGyoUDU/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("expirationTime", response.data.expirationTime + Date.now());
    } catch (error) {
      throw new Error(`Failed to log in: ${error.message}`);
    }
  };

  logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
  };

  getToken = () => {
    return localStorage.getItem("accessToken");
  };

  isLoggedIn = () => {
    // return localStorage.getItem("accessToken") ? true : false;
    // check if the token is expired
    if (localStorage.getItem("expirationTime")) {
      const expirationTime = localStorage.getItem("expirationTime");
      if (expirationTime < Date.now()) {
        return false;
      }
      return true;
    }
    return false;
  };
}

export default AuthService;