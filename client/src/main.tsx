import { render } from 'preact'
import { Map } from './page/Map/Map.tsx'
import App from './page/App/App.tsx';
import Wikia from './page/Wikia/Wikia.tsx';
import Page from './page/Wikia/Page/Page.tsx';
import SrcMap from './page/SrcMap.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/map",
    element: <Map/>,
  },
  {
    path: "/wikia",
    element: <Wikia/>,
  },
  {
    path: "/wikia/:pageName",
    element: <Page/>,
  },
  {
    path: "/wikia/:pageName/edit",
    element: <Page edit={true}/>
  },
  {
    path: "/srcMap",
    element: <SrcMap />
  }
]);

render(<RouterProvider router={router} />, document.getElementById('app')!)
