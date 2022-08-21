import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

const Appointment = lazy(() => import("@/pages/appointment"));
const Home = lazy(() => import("@/pages/home"));

function App() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />

        {/* appointment */}
        <Route path="/appointment" component={Appointment} />

        {/* Client */}
        <Route path="/client/register">
          <p>no he creado esta pagina</p>
        </Route>

        {/* Employee */}
        <Route path="/employee/login">
          <p>no he creado esta pagina</p>
        </Route>
        <Route>
          <span>404, Not Found!</span>
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
