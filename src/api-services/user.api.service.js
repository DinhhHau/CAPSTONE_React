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
}

export default new userApiService();
