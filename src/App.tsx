import { Route } from "wouter";

import { Appointment } from "./pages/appointment";
import { Home } from "./pages/home";

function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/appointment" component={Appointment} />
    </>
  );
}

export default App;
