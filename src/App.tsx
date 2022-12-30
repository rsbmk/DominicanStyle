import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'

import { LINKS_PAGES } from './constants'

const Appointment = lazy(async () => await import('@/pages/appointment'))
const Home = lazy(async () => await import('@/pages/home'))
const RegisterClient = lazy(async () => await import('@/pages/register/client'))

function App () {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={LINKS_PAGES.home} component={Home} />

        {/* appointment */}
        <Route path={LINKS_PAGES.createAppointment} component={Appointment} />

        {/* Client */}
        <Route path={LINKS_PAGES.registerClient} component={RegisterClient} />

        {/* Employee */}
        <Route path={LINKS_PAGES.login}>
          <p>no he creado esta pagina</p>
        </Route>

        <Route>
          <span>404, Not Found!</span>
        </Route>
      </Switch>
    </Suspense>
  )
}

export default App
