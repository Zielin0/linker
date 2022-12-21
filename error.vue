<script lang="ts" setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

useHead({
  title: `Error ${props.error.statusCode}`,
});

const redirectError = () => clearError({ redirect: '/' });
</script>

<template>
  <v-container class="w-75 mt-16">
    <v-layout class="d-flex justify-center text-center">
      <h1>Error {{ props.error.statusCode }}</h1>
    </v-layout>
    <v-layout class="mt-5 d-flex justify-center text-center">
      <h3>{{ props.error.statusMessage }}</h3>
    </v-layout>
    <v-layout class="mt-5 mb-2 d-flex justify-center text-center">
      <v-btn color="primary" @click.prevent="redirectError">Go Back</v-btn>
    </v-layout>
  </v-container>
</template>
