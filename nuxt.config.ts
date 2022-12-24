// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ['vuetify/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    dbPassword: process.env.NUXT_DB_PASSWORD,
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      title: 'Linker - zielinus.xyz',
    },
  },
});
