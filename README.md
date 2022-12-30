# Linker

![repo-size-badge](https://img.shields.io/github/repo-size/Zielin0/linker?style=flat-square)
![license-badge](https://img.shields.io/github/license/Zielin0/linker?style=flat-square)
![stars-badge](https://img.shields.io/github/stars/Zielin0/linker?style=flat-square)
![activity-badge](https://img.shields.io/github/commit-activity/m/Zielin0/linker?style=flat-square)
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=linker&style=flat-square)

## URL Shortener for Zielino

## Table of contents
1. [General Info](#general-info)
2. [Features](#features)
3. [Running](#running)
4. [Dependencies](#dependencies)
5. [License](#license)

## General Info

Nuxt + Prisma + Vuetify App

I just wanted to create a URL shortener or just have custom URLs for things.

Deployment: [s.zielinus.xyz](https://s.zielinus.xyz)

## Features

- Connect with Prisma client
- Show all public links on the index
- Redirect to target URL on s.zielinus.xyz/:alias (If doesn't exist throw a 404 error)
- Create a new Link
  
## Running

1. Set up Postgres database with [docker](https://www.docker.com/).

  ```shell
  $ docker-compose up -d
  ```

2. Install all dependencies with [node](https://nodejs.org/en/).
  
  ```shell
  $ npm i
  ```

3. Generate and migrate database with prisma.

  ```shell
  $ npx prisma generate
  $ npx prisma migrate dev --name init
  ```

4. Build and run the app.

  ```shell
  $ npm run build
  $ npm run preview
  ```

5. App should be up on [localhost:3000](http://localhost:3000)

## Dependencies

- [Nuxt](https://nuxt.com/)
- [Vue](https://vuejs.org/)
- [Prisma](https://www.prisma.io/)
- [Vuetify](https://next.vuetifyjs.com/en/)

## License
This project is under the [MIT](./LICENSE) License.