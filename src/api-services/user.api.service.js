import { http } from "../util/tools";

class userApiService {
  constructor() {}

  updateProfile(data) {
    return http.post(`/Users/updateProfile`, data);
  }

  getProfile() {
    return http.post(`/Users/getProfile`);
  }

  userOrder() {
    return http.post(`/Users/order`);
  }
}

export default new userApiService();
