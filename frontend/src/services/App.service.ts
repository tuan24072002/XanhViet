import { AppModel, ProductModel } from "@/model/App.model";
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
        products: element.products.map((product: ProductModel) => ({
          _id: product._id,
          name: product.name,
          subName: product.subName,
          description: product.description,
          price: product.price,
          imageSrc: product.imageSrc,
        })),
        stories: element.stories,
        banner: element.banner,
        twoFa: element.twoFa,
      });
    }
    return list;
  },
  listProductFromJson(data: any) {
    const list: ProductModel[] = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      list.push({
        _id: element._id,
        name: element.name,
        subName: element.subName,
        description: element.description,
        price: element.price,
        imageSrc: element.imageSrc,
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
      products: data.products.map((product: ProductModel) => ({
        _id: product._id,
        name: product.name,
        subName: product.subName,
        description: product.description,
        price: product.price,
        imageSrc: product.imageSrc,
      })),
      stories: data.stories,
      banner: data.banner,
      twoFa: data.twoFa,
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
  async uploadLogo(data: any) {
    const response = await HttpService.doPostRequest(`/app/upload-logo`, data);
    return parseCommonHttpResult(response);
  },
  async getProducts(data: any) {
    const response = await HttpService.doGetRequest(`/app/get-product`, data);
    return parseCommonHttpResult(response);
  },
  async createProduct(data: any) {
    const response = await HttpService.doPostRequest(
      `/app/create-product`,
      data
    );
    return parseCommonHttpResult(response);
  },
  async updateProduct(data: any) {
    const response = await HttpService.doPostRequest(
      `/app/update-product`,
      data
    );
    return parseCommonHttpResult(response);
  },
  async deleteProduct(data: any) {
    const response = await HttpService.doDeleteRequest(
      `/app/delete-product/${data._id}`,
      data
    );
    return parseCommonHttpResult(response);
  },
  async updateStory(data: any) {
    const response = await HttpService.doPostRequest(`/app/update-story`, data);
    return parseCommonHttpResult(response);
  },
  async updateBanner(data: any) {
    const response = await HttpService.doPutRequest(`/app/update-banner`, data);
    return parseCommonHttpResult(response);
  },
  async updateBannerStory(data: any) {
    const response = await HttpService.doPutRequest(
      `/app/update-banner-story`,
      data
    );
    return parseCommonHttpResult(response);
  },
  async generate2fa(data: any) {
    const response = await HttpService.doPostRequest(`/app/generate-2fa`, data);
    return parseCommonHttpResult(response);
  },
  async verify2fa(data: any) {
    const response = await HttpService.doPostRequest(`/app/verify-2fa`, data);
    return parseCommonHttpResult(response);
  },
  async reset2fa(data: any) {
    const response = await HttpService.doPostRequest(`/app/reset-2fa`, data);
    return parseCommonHttpResult(response);
  },
};
