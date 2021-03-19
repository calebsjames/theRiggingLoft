import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"
import { ApplicationViews } from "./ApplicationViews"
import { Header } from "./components/Header"
import { NavBar } from "./components/navbar/NavBar"


export const TheRiggingLoft = () => (
<>
<Route render={() => {
    if (sessionStorage.getItem(userStorageKey)) {
      return (
        <>
          <Header />
          <NavBar />
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