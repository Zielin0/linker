<script lang="ts">
type Response = {
  success: boolean;
  message?: string;
  links?: any[];
};

const getPublicLinks = async (): Promise<Response> => {
  const { data } = await useFetch('/api/public');
  return data.value as Response;
};

const linkArr: any[] = [];

export default {
  data: () => ({
    links: linkArr,
    success: false,
  }),
  head: {
    meta: [
      { name: 'theme-color', content: '#789b3c' },
      { property: 'og:image', content: 'https://s.zielinus.xyz/favicon.png' },
      { property: 'og:url', content: 'https://s.zielinus.xyz' },
      { property: 'og:title', content: 'Linker' },
      { property: 'og:site_name', content: 's.zielinus.xyz' },
      { property: 'og:description', content: 'Linker - zielinus.xyz' },
    ],
  },
  created() {
    getPublicLinks().then((res) => {
      this.success = JSON.stringify(res.success) === 'true';
      this.links = res.links!;
    });
  },
};
</script>

<template>
  <v-container class="h-100" fluid>
    <v-layout class="mt-10 d-flex justify-center text-center">
      <h1>All Public Links</h1>
    </v-layout>

    <v-layout class="d-flex justify-center text-center mt-8">
      <v-table v-if="$data.success" class="w-auto">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Alias</th>
            <th class="text-left">Target URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in links" :key="link.alias">
            <td class="text-left">{{ link.id }}.</td>
            <td class="text-left">
              {{ link.alias }}
            </td>
            <td class="text-left">
              <NuxtLink class="text-white" :to="link.original">{{
                link.original
              }}</NuxtLink>
            </td>
          </tr>
        </tbody>
      </v-table>

      <span v-else class="text-red">Failed to fetch all public links.</span>
    </v-layout>

    <v-layout class="mt-10 d-flex justify-center text-center">
      <v-hover v-slot="{ isHovering, props }">
        <NuxtLink
          class="text-decoration-none mr-3"
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
