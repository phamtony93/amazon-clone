import React from "react";
import { Route, useHistory, Redirect } from "react-router-dom";
import { useStateValue } from "../StateProvider";

// function ProtectedRoute({ path, ...rest }) {
//   const history = useHistory();
//   const [{ user }, dispatch] = useStateValue();
//   if (user) {
//     return <Route path={path}>{children}</Route>;
//   } else {
//     history.push("/login");
//   }
// }

function ProtectedRoute({ children, ...rest }) {
  const hisotry = useHistory();
  const [{ user }, dispatch] = useStateValue();
  console.log("inside pr. user is >>>> ", user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
