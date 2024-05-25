import Home from './components/Home'
//import Landing from './components/Landing';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
//import Services from './components/Services';
import Services from './components/Booking';
import Contact from './components/Contact';
import Blogs from './components/Blogs'
//import Payment from './components/Payment';
import ServicesComponent from './components/Services';
import SubscribeForm from './components/Forms'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/booking',
    element: < Services/>,
  },
  {
    path: 'contact',
    element: <Contact/>
  },
  {
    path: '/blogs',
    element: <Blogs/>
  },
  {
    path: '/services',
    element: <ServicesComponent/>
  },
  //{
    //path:'/payment',
    //element: <Payment/>
  //},
  {
    path: '/form',
    element: <SubscribeForm/>
  }
]);

/*createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);*/


function App() {
  
  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App