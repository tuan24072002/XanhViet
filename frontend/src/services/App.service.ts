import { AppModel } from "@/model/App.model";
import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonHttpResult";
export const AppService = {
  listFromJson(data: any) {
    const list: AppModel[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      list.push({
        id: element._id,
        logo: element.logo,
        backgroundColor: element.backgroundColor,
        textHeaderColor: element.textHeaderColor,
        highlightColor: element.highlightColor,
        textTitleColor: element.textTitleColor,
        textColor: element.textColor,
        textDescColor: element.textDescColor,
        borderColor: element.borderColor,
        codeSecurity: element.codeSecurity,
      });
    }
    return list;
  },
  itemFromJson(data: any) {
    const item = {
      id: data._id,
      logo: data.logo,
      backgroundColor: data.backgroundColor,
      textHeaderColor: data.textHeaderColor,
      highlightColor: data.highlightColor,
      textTitleColor: data.textTitleColor,
      textColor: data.textColor,
      textDescColor: data.textDescColor,
      borderColor: data.borderColor,
      codeSecurity: data.codeSecurity,
    };
    return item;
  },
  async getSetting(data: any) {
    const res = await HttpService.doGetRequest(`/app/get-setting`, data);
    return parseCommonHttpResult(res);
  },
  async postInit(data: any) {
    const res = await HttpService.doPostRequest(`/app/init`, data);
    return parseCommonHttpResult(res);
  },
  async getCode(data: any) {
    const res = await HttpService.doGetRequest(`/app/get-code`, data);
    return parseCommonHttpResult(res);
  },
  async checkCode(data: any) {
    const res = await HttpService.doPostRequest(`/app/check-code`, data);
    return parseCommonHttpResult(res);
  },
  async changeSetting(data: any) {
    const response = await HttpService.doPostRequest(
      `/app/change-setting`,
      data
    );
    return parseCommonHttpResult(response);
  },
  async initSetting(data: any) {
    const response = await HttpService.doPostRequest(`/app/init`, data);
    return parseCommonHttpResult(response);
  },
};
