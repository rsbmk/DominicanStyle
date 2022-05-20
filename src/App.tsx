import { lazy, Suspense } from "react";
import { Route } from "wouter";

const Appointment = lazy(() => import("./pages/appointment"));
const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <Suspense fallback={null}>
      <Route path="/" component={Home} />
      <Route path="/appointment" component={Appointment} />
    </Suspense>
  );
}

export default App;
