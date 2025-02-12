class ProductModel {
  _id: string;
  name: string;
  subName: string;
  description: string;
  price: string;
  imageSrc: string;
  constructor(
    _id: string,
    name: string,
    subName: string,
    description: string,
    price: string,
    imageSrc: string
  ) {
    this._id = _id;
    this.name = name;
    this.subName = subName;
    this.description = description;
    this.price = price;
    this.imageSrc = imageSrc;
  }
  static initial() {
    return {
      _id: "",
      name: "",
      subName: "",
      description: "",
      price: "",
      imageSrc: "",
    };
  }
}

class AppModel {
  id: string;
  logo: string;
  backgroundColor: string;
  textHeaderColor: string;
  highlightColor: string;
  textTitleColor: string;
  textColor: string;
  textDescColor: string;
  borderColor: string;
  codeSecurity: string;
  products: ProductModel[];
  stories: {
    banner: string;
    content: string;
  };
  twoFa: {
    twofa_otp: boolean;
    secret: string;
    two_fa_qr_url: string;
  };
  banner: string[];

  constructor(
    id: string,
    logo: string,
    backgroundColor: string,
    textHeaderColor: string,
    highlightColor: string,
    textTitleColor: string,
    textColor: string,
    textDescColor: string,
    borderColor: string,
    codeSecurity: string,
    products: ProductModel[],
    stories: {
      banner: string;
      content: string;
    },
    banner: string[],
    twoFa: {
      twofa_otp: boolean;
      secret: string;
      two_fa_qr_url: string;
    }
  ) {
    this.id = id;
    this.logo = logo;
    this.backgroundColor = backgroundColor;
    this.textHeaderColor = textHeaderColor;
    this.highlightColor = highlightColor;
    this.textTitleColor = textTitleColor;
    this.textColor = textColor;
    this.textDescColor = textDescColor;
    this.borderColor = borderColor;
    this.codeSecurity = codeSecurity;
    this.products = products;
    this.stories = stories;
    this.banner = banner;
    this.twoFa = twoFa;
  }
  static initial() {
    return {
      id: "",
      logo: "",
      backgroundColor: "",
      textHeaderColor: "",
      highlightColor: "",
      textTitleColor: "",
      textColor: "",
      textDescColor: "",
      borderColor: "",
      codeSecurity: "",
      products: [],
      stories: {
        banner: "",
        content: "",
      },
      banner: [],
      twoFa: {
        twofa_otp: false,
        secret: "",
        two_fa_qr_url: "",
      },
    };
  }
}
export { AppModel, ProductModel };
