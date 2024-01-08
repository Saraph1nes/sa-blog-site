import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from '@/app/App'
import { inject } from '@vercel/analytics';

import './index.scss'

inject();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
)
