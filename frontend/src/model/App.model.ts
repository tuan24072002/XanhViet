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
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    imageSrc: string;
  }[];
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
    products: {
      id: string;
      name: string;
      description: string;
      price: string;
      imageSrc: string;
    }[]
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
    };
  }
}
export { AppModel };
