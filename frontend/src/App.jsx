import Home from './components/Home'
//import Landing from './components/Landing';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
import Signup from './components/Signup';
import Login from './components/Login';

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
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/login',
    element: <Login/>
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