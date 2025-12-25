import axios from "axios";

export const api =axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials:true,
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // مثلاً توجيه المستخدم لصفحة تسجيل الدخول
      window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  }
);
