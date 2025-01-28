import axios, { AxiosResponse } from "axios";

class HttpService {
  static instance = axios.create({
    baseURL:
      import.meta.env.MODE === "development"
        ? import.meta.env.VITE_APP_baseApiURL
        : import.meta.env.VITE_APP_baseApiURLProd,
    timeout: 180000,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
    },
  });
  static isRefreshing = false;
  static refreshMethod: Promise<AxiosResponse<any, any>>;
  static commonParams() {
    return {
      // create_user: localStorage.getItem("userId"),
      // update_user: localStorage.getItem("userId"),
    };
  }
  static getLocalToken() {
    return localStorage.getItem("accessToken");
  }
  static getLocalRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  static getUsername() {
    return localStorage.getItem("username");
  }
  static setToken(token: string) {
    HttpService.instance.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("accessToken", token);
  }
  static setLocalRefToken(token: string) {
    localStorage.setItem("refreshToken", token);
  }
  static initialize() {
    const token = HttpService.getLocalToken();
    // console.log("token", token);
    if (token) {
      HttpService.setToken(token);
    }
    HttpService.instance.interceptors.request.use((request) => {
      // console.log("CALL API", JSON.stringify(request));
      return request;
    });
    const refreshToken = () => {
      if (HttpService.isRefreshing) {
        return HttpService.refreshMethod;
      }
      //console.log('get new token using refresh token', HttpService.getLocalRefreshToken())
      HttpService.isRefreshing = true;
      HttpService.refreshMethod = this.doPostRequest(
        "/auth/refresh",
        {
          username: this.getUsername(),
          refreshToken: this.getLocalRefreshToken(),
        },
        false
      );
      return HttpService.refreshMethod;
    };
    HttpService.instance.interceptors.response.use(
      (response) => {
        // console.log(response);
        return response;
      },
      async (error) => {
        // console.log("http error.response", error.response);
        const { data } = error.response;
        if (
          data.message === "Invalid access token!" &&
          data.error !== "Invalid refresh token!"
        ) {
          try {
            console.log("call Refresh");
            const rs = await refreshToken();
            if (rs.status === 200) {
              const { accessToken } = rs.data.data;
              if (HttpService.isRefreshing) {
                HttpService.setToken(accessToken);
                HttpService.isRefreshing = false;
              }
              const config = error.config;
              config.headers["Authorization"] = `Bearer ${accessToken}`;
              return await HttpService.instance.request(config);
            } else {
              return Promise.reject(rs);
            }
          } catch (error) {
            return Promise.reject(error);
          }
        } else {
          //const response = error.response ? error.response.data : error
          return Promise.reject(error);
        }
      }
    );
  }
  static async doPrintRequest(url: string, data: any) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    //const params={...Object(data)}
    //const response= HttpService.instance.post(url, params)
    return result;
  }
  static async doUploadRequest(url: string, data: any) {
    delete HttpService.instance.defaults.headers["Content-Type"];
    delete HttpService.instance.defaults.headers["Accept"];
    return HttpService.instance.post(url, data, {
      headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
    });
  }
  static async doPostRequest(url: string, data: any, withAccessToken = true) {
    if (!withAccessToken) {
      delete HttpService.instance.defaults.headers["Authorization"];
      return HttpService.instance.post(url, data);
    } else {
      const params = { ...Object(data), ...this.commonParams() };
      const response = HttpService.instance.post(url, params);
      return response;
    }
  }

  static async doGetRequest(url: string, data: any) {
    const params = { ...Object(data), ...this.commonParams() };
    return HttpService.instance.get(url, { params: params });
  }

  static async doPatchRequest(url: string, data: any) {
    const params = { ...Object(data), ...this.commonParams() };
    return HttpService.instance.patch(`${url}`, params);
  }

  static async doPutRequest(url: string, data: any) {
    const params = { ...Object(data), ...this.commonParams() };
    return HttpService.instance.put(url, params);
  }

  static async doDeleteRequest(url: string, data: any) {
    const params = { ...Object(data), ...this.commonParams() };
    return HttpService.instance.delete(`${url}`, { data: params });
  }
}
export { HttpService };
