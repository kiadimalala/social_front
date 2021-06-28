import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/output.css";
import * as ROUTES from "./constants/routes";

import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

import { useAuthContext } from "./context/authContext";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Suspense fallback={<p>loading...</p>}>
        <Switch>
          <IsUserLoggedIn
            user={user}
            loggedInPath={ROUTES.DASHBOARD}
            path={ROUTES.LOGIN}
          >
            <Login />
          </IsUserLoggedIn>
          <IsUserLoggedIn
            user={user}
            loggedInPath={ROUTES.DASHBOARD}
            path={ROUTES.SIGN_UP}
          >
            <SignUp />
          </IsUserLoggedIn>
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <Dashboard />
          </ProtectedRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
