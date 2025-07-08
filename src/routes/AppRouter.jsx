import { Route, Routes } from 'react-router'
import { Suspense, lazy } from 'react'
import { ROLES, ROUTES } from './routes'
import PrivateRouter from './PrivateRouter'
import Loading from '../components/UI/Loading'
import Applications from '../pages/admin/aplications/Applications'
import InnerPageCard from '../pages/admin/aplications/InnerPageCard'
import Books from '../pages/admin/books/Books'
import AddBook from '../pages/admin/books/AddBook'
import UploadBook from '../pages/admin/books/UploadBook'
import ClientProfile from '../pages/user/ClientProfile'

const SignUpVendor = lazy(() => import('../pages/sign-up/SignUpVendor'))
const SignUpClient = lazy(() => import('../pages/sign-up/SignUpClient'))
const SignIn = lazy(() => import('../pages/sign-in/SignIn'))
const Home = lazy(() => import('../layout/home/Home'))
const AdminLayout = lazy(() => import('../layout/admin/AdminLayout'))
const UserLayout = lazy(() => import('../layout/user/UserLayout'))
const VendorLayout = lazy(() => import('../layout/vendor/VendorLayout'))
const ResetPassword = lazy(() => import('../pages/sign-in/ResetPassword'))

const AppRouter = () => (
   <Routes>
      <Route
         path="/"
         element={
            <PrivateRouter
               roles={[ROLES.GUEST, ROLES.CLIENT]}
               Component={
                  <Suspense fallback={<Loading />}>
                     <Home />
                  </Suspense>
               }
               fallbackPath={'/admin'}
            />
         }
      />

      <Route
         path={ROUTES.SIGN_IN}
         element={
            <Suspense fallback={<Loading />}>
               <SignIn />
            </Suspense>
         }
      />

      <Route
         path={ROUTES.SIGN_UP_CLIENT}
         element={
            <Suspense fallback={<Loading />}>
               <SignUpClient />
            </Suspense>
         }
      />
      <Route
         path={ROUTES.SIGN_UP_VENDOR}
         element={
            <Suspense fallback={<Loading />}>
               <SignUpVendor />
            </Suspense>
         }
      />
      <Route
         path="/resetPassword/:token"
         element={
            <Suspense fallback={<Loading />}>
               <ResetPassword />
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
         <Route index path="/admin/application" element={<Applications />} />

         <Route
            path="/admin/application/:bookItemId"
            element={<InnerPageCard />}
         />

         <Route path="books" element={<Books />} />

         <Route path="books/addbook" element={<AddBook />} />

         <Route path="books/uploadbook/:bookItemId" element={<UploadBook />} />
      </Route>

      <Route
         path="/user"
         element={
            <PrivateRouter
               roles={[ROLES.CLIENT]}
               Component={
                  <Suspense fallback={<Loading />}>
                     <UserLayout />
                  </Suspense>
               }
               fallbackPath={'/'}
            />
         }
      >
         <Route path="/user/profile" element={<ClientProfile />} />
      </Route>

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
