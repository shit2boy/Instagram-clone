import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from './pages/Login'
import * as ROUTES from "./constants/routes";
import UserContext from "./context/User";
import useAuthListener from "./Hooks/use-auth-listener";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            {/* <Route path={ROUTES.LOGIN} exact component={Login} /> */}
            <Route path={ROUTES.LOGIN} exact component={Login} />
            <Route path={ROUTES.SIGN_IN} exact component={Signup} />
            <Route path={ROUTES.DASHBOARD} exact component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
