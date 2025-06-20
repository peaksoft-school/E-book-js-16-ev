import { Route, Routes } from 'react-router'
import { Suspense, lazy } from 'react'
import { ROLES } from './routes'
import PrivateRouter from './PrivateRouter'
import Loading from '../components/UI/Loading'
import Books from '../pages/admin/books/Books'
import AddBook from '../pages/admin/books/Addbook'

const SignUp = lazy(() => import('../pages/sign-up/SignUp'))
const SignIn = lazy(() => import('../pages/sign-in/SignIn'))
const Home = lazy(() => import('../layout/home/Home'))
const AdminLayout = lazy(() => import('../layout/admin/AdminLayout'))
const UserLayout = lazy(() => import('../layout/user/UserLayout'))
const VendorLayout = lazy(() => import('../layout/vendor/VendorLayout'))

const AppRouter = () => (
   <Routes>
      <Route
         path="/"
         element={
            <PrivateRouter
               roles={[ROLES.GUEST, ROLES.USER]}
               Component={
                  <Suspense fallback={<Loading />}>
                     <Home />
                  </Suspense>
               }
               fallbackPath={'/'}
            />
         }
      />

      <Route
         path="/sign-in"
         element={
            <Suspense fallback={<Loading />}>
               <SignIn />
            </Suspense>
         }
      />

      <Route
         path="/sign-up"
         element={
            <Suspense fallback={<Loading />}>
               <SignUp />
            </Suspense>
         }
      />

      <Route
         path="/admin"
         element={
            <PrivateRouter
               roles={[ROLES.ADMIN]}
               Component={
                  <Suspense fallback={<Loading />}>
                     <AdminLayout />
                  </Suspense>
               }
               fallbackPath={'/'}
            />
         }
      >
         <Route path="books" element={<Books />} />
          <Route path="books/addbook" element={<AddBook/>}/>
         
        
      </Route>

      <Route
         path="/user"
         element={
            <PrivateRouter
               roles={[ROLES.USER]}
               Component={
                  <Suspense fallback={<Loading />}>
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
                  <Suspense fallback={<Loading />}>
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

export default AppRouter
