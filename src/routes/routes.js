const ROUTES = {
   SIGN_IN: '/sign-in',
   SIGN_UP_CLIENT: '/sign-up-client',
   SIGN_UP_VENDOR: '/sign-up-vendor',

   ADMIN: {
      INDEX: '/admin',
      TEST: 'test',
      ID: 'id',
   },
   VENDOR: {
      INDEX: '/vendor',
      ID: 'id',
   },
   USER: {
      INDEX: '/user',
      ID: 'id',
   },
}

const ROLES = {
   ADMIN: 'ADMIN',
   CLIENT: 'CLIENT',
   VENDOR: 'VENDOR',
   GUEST: 'GUEST',
}

export { ROUTES, ROLES }
