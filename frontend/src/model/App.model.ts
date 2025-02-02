class ProductModel {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  constructor(
    _id: string,
    name: string,
    description: string,
    price: string,
    imageSrc: string
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageSrc = imageSrc;
  }
  static initial() {
    return {
      _id: "",
      name: "",
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
  stories: string;
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
    stories: string
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
      stories: "",
    };
  }
}
export { AppModel, ProductModel };
