import * as Yup from 'yup'

const VALIDATION_SCHEMA = Yup.object({
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

export { VALIDATION_SCHEMA }
