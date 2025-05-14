import { Route, Routes } from 'react-router'
import { Suspense, lazy } from 'react'
import { ROLES } from './routes'
import PrivateRouter from './PrivateRouter'
import SignIn from '../pages/sign-in/SignIn'
import SignUp from '../pages/sign-up/SignUp'
const Home = lazy(() => import('../layout/home/Home'))
const AdminLayout = lazy(() => import('../layout/admin/AdminLayout'))
const UserLayout = lazy(() => import('../layout/user/UserLayout'))
const VendorLayout = lazy(() => import('../layout/vendor/VendorLayout'))

const AppRouter = () => {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <PrivateRouter
                  roles={[ROLES.GUEST, ROLES.USER]}
                  Component={
                     <Suspense fallback="Loading">
                        <Home />
                     </Suspense>
                  }
                  fallbackPath={'/'}
               />
            }
         />

         <Route path="/sign-in" element={<SignIn />} />
         <Route path="/sign-up" element={<SignUp />} />

         <Route
            path="/admin"
            element={
               <PrivateRouter
                  roles={[ROLES.ADMIN]}
                  Component={
                     <Suspense fallback="Loading">
                        <AdminLayout />
                     </Suspense>
                  }
                  fallbackPath={'/'}
               />
            }
         />

         <Route
            path="/user"
            element={
               <PrivateRouter
                  roles={[ROLES.USER]}
                  Component={
                     <Suspense fallback="Loading">
                        <UserLayout />
                     </Suspense>
                  }
                  fallbackPath={'/'}
               />
            }
         />

         <Route
            path="/vendor"
            element={
               <PrivateRouter
                  roles={[ROLES.VENDOR]}
                  Component={
                     <Suspense fallback="Loading">
                        <VendorLayout />
                     </Suspense>
                  }
                  fallbackPath={'/'}
               />
            }
         />

         <Route path="*" element="Not found" />
      </Routes>
   )
}

export default AppRouter
