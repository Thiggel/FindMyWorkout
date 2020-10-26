<template>
  <div class="filter-group">
    <h2>Age groups</h2>
    <button class="small"
            @click="
                  arrayEquals(selectedAges, age.map(el => el.value))
                  ? selectedAges = [] : selectedAges = age.map(el => el.value)"
    >
      <span v-if="arrayEquals(selectedAges, age.map(el => el.value))">Deselect all</span>
      <span v-else>Select all</span>
    </button>
    <FormulateInput
        type="checkbox"
        label="What age group(s) do you belong to?"
        v-model="selectedAges"
        :options="age"
    />
  </div>
</template>

<script>
  import { getState } from '@/store/getState';
  import { globals } from '@/assets/js/globals';

  export default {
    computed: {
      selectedAges: getState.selectedAges,
      age: getState.age
    },
    methods: {
      arrayEquals: globals.arrayEquals
    }
  }
</script>