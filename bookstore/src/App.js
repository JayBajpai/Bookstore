import './App.css';
import LoginSignup from './pages/CombineLoginSignUp/CombineLoginSignUp'

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      < Switch>
      <Route  path="/" component={LoginSignup} />    
       </Switch>
    </BrowserRouter>


  );
}

export default App;
