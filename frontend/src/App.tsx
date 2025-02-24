import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./views/Layout"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getSetting } from "./slice/app.slice";
import { failed, processing } from "./utils/alert";
import { isPhone } from "./utils/util";
import Authentication from "./components/admin/authen/Authentication";
import Reset2fa from "./views/admin/Reset2fa";

const Home = React.lazy(() => import('./views/home/Home'));
const Story = React.lazy(() => import('./views/story/Story'));
const Promotion = React.lazy(() => import('./views/promotion/Promotion'));
const Product = React.lazy(() => import('./views/product/Product'));
const ProductDetail = React.lazy(() => import('./views/productDetail/ProductDetail'));
const Cart = React.lazy(() => import('./views/cart/Cart'));
const InfoReceive = React.lazy(() => import('./views/cart/InfoReceive'));
const Success = React.lazy(() => import('./views/cart/Success'));
const Admin = React.lazy(() => import('./views/admin/Admin'));

function App() {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(state => state.app);
  const [isPhoneDevice, setIsPhoneDevice] = useState<boolean>(isPhone());
  useEffect(() => {
    const handleResize = () => {
      setIsPhoneDevice(isPhone());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const pageList = [
    {
      path: "/*",
      element: <Layout children={<Home />} target={'/'} title="Xanh Việt" />,
    },
    {
      path: "/promotion",
      element: <Layout children={<Promotion />} target={'/promotion'} title="Khuyến mãi" />,
    },
    {
      path: "/story",
      element: <Layout children={<Story />} target={'/story'} title="Câu chuyện" />,
    },
    {
      path: "/product",
      element: <Layout children={<Product />} target={'/product'} title="Sản phẩm" />,
    },
    {
      path: "/product/:id",
      element: <Layout children={<ProductDetail />} target={'/product/:id'} title="Sản phẩm" />,
    },
    {
      path: "/cart",
      element: <Layout children={<Cart />} target={'/cart'} title="Giỏ hàng" />,
    },
    {
      path: "/info-receive",
      element: <Layout children={<InfoReceive />} target={'/info-receive'} title="Thông tin nhận hàng" />,
    },
    {
      path: "/success",
      element: <Layout children={<Success />} target={'/success'} title="Xanh Việt" />,
    },
    {
      path: "/admin",
      element: !isPhoneDevice
        ? <Admin />
        : <Layout children={<Home />} target={'/'} title="Xanh Việt" />,
    },
    {
      path: "/getcode",
      element: !isPhoneDevice
        ? <Authentication />
        : <Layout children={<Home />} target={'/'} title="Xanh Việt" />,
    },
    {
      path: "/reset-2fa",
      element: !isPhoneDevice
        ? <Reset2fa />
        : <Layout children={<Home />} target={'/'} title="Xanh Việt" />,
    },
  ];

  useEffect(() => {
    switch (appState.status) {
      case 'failed':
        failed(appState.error);
        break;
      case "loading":
        processing();
        break;
      case "completed":

        break;
    }
  }, [appState.status])
  useEffect(() => {
    dispatch(getSetting());
  }, [])
  document.documentElement.style.setProperty('--color-background', appState.item?.backgroundColor);
  document.documentElement.style.setProperty('--color-textHeader', appState.item?.textHeaderColor);
  document.documentElement.style.setProperty('--color-highlight', appState.item?.highlightColor);
  document.documentElement.style.setProperty('--color-textTitle', appState.item?.textTitleColor);
  document.documentElement.style.setProperty('--color-border', appState.item?.borderColor);
  document.documentElement.style.setProperty('--color-text', appState.item?.textColor);
  document.documentElement.style.setProperty('--color-textDesc', appState.item?.textDescColor);
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          {pageList.map(page => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
