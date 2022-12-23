<script lang="ts">
type Response = {
  success: boolean;
  message: string;
};

const createLink = async (
  alias: string,
  target: string,
  pub: any
): Promise<Response> => {
  const { data } = await useFetch('/api/create', {
    method: 'POST',
    body: {
      alias,
      original: target,
      public: pub === 'Public',
    },
  });
  return data.value as Response;
};

export default {
  data: () => ({
    valid: true,
    alias: '',
    aliasRules: [
      (v: any) => !!v || 'Alias is required',
      (v: any) =>
        (v && v.length <= 15) || 'Alias must be less than 15 characters',
      (v: any) => /^[\w-]*$/gi.test(v) || 'Invalid Alias',
    ],
    target: '',
    targetRules: [
      (v: any) => !!v || 'Target is required',
      (v: any) =>
        /^(http(?:s?):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/gi.test(
          v
        ) || 'Target must be a valid url',
    ],
    password: '',
    passwordRules: [(v: any) => !!v || 'Password is required'],
    public: false,
    disabled: true,
    response: '',
    success: false,
  }),
  methods: {
    async validate() {
      const { valid } = await (this.$refs.form as any).validate();

      if (!valid) return;
      createLink(this.alias, this.target, this.public).then((res) => {
        this.disabled = false;
        this.response = res.message;
        this.success = JSON.stringify(res.success) === 'true';
      });

      // Check if all data is successfully inserted into db
      // Then show a span or something with link to shorted url
      // Maybe add a loading circle with short spin time
      // Error: class="text-red"
      // Success: class="text-green"
      // Optional: replace with text-success or text-error if possible
    },
  },
};
</script>

<template>
  <v-container class="h-75" fluid>
    <v-card class="mt-16 w-50 mx-auto px-6 py-8">
      <v-layout class="d-flex justify-center text-center">
        <h1 class="pb-7">Shorten URL</h1>
      </v-layout>

      <v-form ref="form" v-model="valid" class="pt-5" lazy-validation>
        <v-text-field
          v-model="alias"
          :rules="aliasRules"
          class="mb-2"
          :counter="15"
          label="Alias"
          required
        ></v-text-field>
        <v-text-field
          v-model="target"
          :rules="targetRules"
          class="mb-2"
          label="Target"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="Password"
          required
        ></v-text-field>

        <v-checkbox
          v-model="public"
          label="Public"
          color="primary"
          value="Public"
          hide-details
        ></v-checkbox>

        <v-layout>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="success"
            size="large"
            type="submit"
            @click.prevent="validate"
            >Shorten</v-btn
          >
        </v-layout>
        <v-layout
          v-if="!disabled"
          class="d-flex justify-center text-center mt-6"
        >
          <span :class="success ? 'text-green' : 'text-red'">
            {{ $data.response.split("'")[0] }}
            <b class="text-decoration-underline">{{
              $data.response.split("'")[1]
            }}</b>
            {{ $data.response.split("'")[2] }}
          </span>
        </v-layout>
      </v-form>
    </v-card>
  </v-container>
</template>
