<template>
  <div class="filter-group">
    <h2>Extras</h2>

    <button class="small"
            @click="
                  arrayEquals(selectedExtras, extras.map(el => el.value))
                  ? selectedExtras = [] : selectedExtras = extras.map(el => el.value)"
    >
      <span v-if="arrayEquals(selectedExtras, extras.map(el => el.value))">Deselect all</span>
      <span v-else>Select all</span>
    </button>

    <FormulateInput
        type="checkbox"
        label="What extras do you want?"
        v-model="selectedExtras"
        :options="extras"
    />
  </div>
</template>

<script>
  import { getState } from '@/store/getState';
  import { globals } from '@/assets/js/globals';

  export default {
    computed: {
      selectedExtras: getState.selectedExtras,
      extras: getState.extras
    },
    methods: {
      arrayEquals: globals.arrayEquals
    }
  }
</script>