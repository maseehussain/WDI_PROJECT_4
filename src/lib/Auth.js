import Axios from 'axios';

class Auth {
  static setToken(token) {
    return localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    const payload = this.getPayload();
    if(!payload) return false;
    const now = (new Date()).getTime() / 1000;
    return payload.exp > now;
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

  // static async getCurrentUser() {
  //   const token = this.getToken();
  //   if(!token) return null;
  //   const payload = JSON.parse(atob(token.split('.')[1]));
  //   if (payload && payload.userId) {
  //     const { data } = await Axios.get(`/api/users/${payload.userId}`);
  //     return data;
  //   }
  // }
  static async getCurrentUser() {
    const token = this.getToken();
    if(!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload && payload.userId) {
      const { data } = await Axios.get(`/api/users/${payload.userId}`);
      return data;
    }
  }
}

export default Auth;
