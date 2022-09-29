import { http } from "../util/tools";

class userApiService {
  constructor() {}

  updateProfile(data) {
    return http.post(`/Users/updateProfile`, data);
  }

  getProfile() {
    return http.post(`/Users/getProfile`);
  }

  userOrder(data) {
    return http.post(`/Users/order`, data);
  }

  deleteOrder(data) {
    return http.post(`/Users/deleteOrder`, data);
  }
}

export default new userApiService();
