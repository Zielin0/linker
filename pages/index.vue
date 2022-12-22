<template>
  <v-container class="h-100" fluid>
    <v-layout class="mt-10 d-flex justify-center text-center">
      <h1>All Public Links</h1>
    </v-layout>
    <!-- Table goes in here -->
    <v-layout class="mt-10 d-flex justify-center text-center">
      <v-hover v-slot="{ isHovering, props }">
        <NuxtLink
          class="text-decoration-none mr-2"
          :class="
            isHovering ? 'text-primary text-decoration-underline' : 'text-white'
          "
          v-bind="props"
          to="https://www.zielinus.xyz"
        >
          zielinus.xyz
        </NuxtLink>
      </v-hover>

      <v-hover v-slot="{ isHovering, props }">
        <NuxtLink
          class="text-decoration-none"
          :class="isHovering ? 'text-primary' : 'text-white'"
          v-bind="props"
          to="https://github.com/Zielin0/linker"
        >
          <v-icon icon="mdi-github"></v-icon>
        </NuxtLink>
      </v-hover>
    </v-layout>
  </v-container>
</template>
