import axios from 'axios';

const API_URL  = process.env["VUE_APP_API"];

class AuthService {
  login(user) {
    const formData = {
      email: user.email,
      password: user.password
    };
    return axios
      .post( API_URL + 'login', formData)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('JWT', JSON.stringify(response.data.accessToken));
        }

        return response.data;
      });
  }

  logout() {
      axios.post( API_URL + 'logout',{},
      {
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('JWT'))}`
        }
      })
      .then(() => {
        localStorage.removeItem('JWT');
      });
  }
}

export default new AuthService();
