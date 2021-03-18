import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"
import { Home } from "./components/Home"
import { ApplicationViews } from "./ApplicationViews"


export const TheRiggingLoft = () => (
<>
<Route render={() => {
    if (sessionStorage.getItem(userStorageKey)) {
      return (
        <>
          <ApplicationViews />
        </>
      )
    } else {
      return <Redirect to="/login" />;
    }
}} />

<Route path="/login">
  <Login />
</Route>
<Route path="/register">
  <Register />
</Route>
</>
)