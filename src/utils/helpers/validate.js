import * as Yup from 'yup'

const VALIDATION_SCHEMA_VENDOR = Yup.object({
   firstName: Yup.string()
      .trim()
      .min(2, 'Имя должно содержать не менее 2 символов')
      .required('Имя обязательно для заполнения'),

   lastName: Yup.string()
      .trim()
      .min(2, 'Фамилия должна содержать не менее 2 символов')
      .required('Фамилия обязательна для заполнения'),

   phoneNumber: Yup.string()
      .matches(
         /^\+996\d{9}$/,
         'Номер телефона должен быть в формате +996 (XXX) XXX-XX-XX'
      )
      .required('Номер телефона обязателен для заполнения'),

   email: Yup.string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),

   password: Yup.string()
      .min(6, 'Пароль должен содержать не менее 6 символов')
      .required('Пароль обязателен для заполнения'),

   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
})

const VALIDATION_SCHEMA_CLIENT = Yup.object({
   firstName: Yup.string()
      .trim()
      .min(2, 'Имя должно содержать не менее 2 символов')
      .required('Имя обязательно для заполнения'),
   email: Yup.string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
   password: Yup.string()
      .min(6, 'Пароль должен содержать не менее 6 символов')
      .required('Пароль обязателен для заполнения'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
})

const VALIDATION_SCHEMA_SIGN_IN = Yup.object({
   email: Yup.string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
   password: Yup.string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .required('Пароль обязателен для заполнения'),
})

const VALIDATION_SCHEMA_RESET = Yup.object({
   newPassword: Yup.string()
      .min(6, 'Новый пароль должен содержать не менее 6 символов')
      .required('Новый пароль обязателен для заполнения'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают')
      .required('Подтвердите новый пароль'),
})

const VALIDATION_SCHEMA_FORGOT = Yup.object({
   email: Yup.string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
})
export {
   VALIDATION_SCHEMA_VENDOR,
   VALIDATION_SCHEMA_CLIENT,
   VALIDATION_SCHEMA_SIGN_IN,
   VALIDATION_SCHEMA_RESET,
   VALIDATION_SCHEMA_FORGOT,
}
