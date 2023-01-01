<script lang="ts">
type Response = {
  success: boolean;
  message: string;
  validPassword: boolean;
};

type CreateLink = {
  data: Response;
  pending: boolean;
};

const createLink = async (
  alias: string,
  target: string,
  pub: any,
  password: string
): Promise<CreateLink> => {
  const { data, pending } = await useFetch('/api/create', {
    method: 'POST',
    body: {
      alias,
      original: target,
      public: pub === 'Public',
      password,
    },
  });

  return {
    data: data.value as Response,
    pending: pending as unknown as boolean,
  };
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
    pub: false,
    loading: true,
    disabled: true,
    response: '',
    success: false,
    validPassword: false,
  }),
  methods: {
    async validate() {
      const { valid } = await (this.$refs.form as any).validate();

      if (!valid) return;
      createLink(this.alias, this.target, this.pub, this.password).then(
        (res) => {
          this.disabled = false;
          this.response = res.data.message;
          this.success = JSON.stringify(res.data.success) === 'true';
          this.validPassword =
            JSON.stringify(res.data.validPassword) === 'true';
          this.loading = res.pending;
        }
      );
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
          v-model="pub"
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
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-linear>
          <div v-else>
            <span
              v-if="validPassword"
              :class="success ? 'text-green' : 'text-red'"
            >
              {{ $data.response.split("'")[0] }}
              <NuxtLink
                :class="success ? 'text-green' : 'text-red'"
                class="text-decoration-underline"
                :to="`/${$data.alias}`"
              >
                <b>{{ $data.response.split("'")[1] }}</b>
              </NuxtLink>
              {{ $data.response.split("'")[2] }}
            </span>
            <span v-else class="text-red"> {{ $data.response }} </span>
          </div>
        </v-layout>
      </v-form>
    </v-card>
  </v-container>
</template>
