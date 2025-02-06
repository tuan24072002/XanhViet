import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { store } from './app/store.ts'
import { Provider } from 'react-redux'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}> <App /> </Provider>
)
