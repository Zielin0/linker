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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
      meta: [
        { name: 'theme-color', content: '#789b3c' },
        { property: 'og:image', content: 'https://s.zielinus.xyz/favicon.png' },
        { property: 'og:url', content: 'https://s.zielinus.xyz' },
        { property: 'og:title', content: 'Linker' },
        { property: 'og:site_name', content: 's.zielinus.xyz' },
        { property: 'og:description', content: 'Linker - zielinus.xyz' },

        { name: 'description', content: 'Linker - zielinus.xyz' },
        { name: 'author', content: 'Zielino' },
      ],
    },
  },
});
