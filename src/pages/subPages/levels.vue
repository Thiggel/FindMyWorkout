<template>
  <div class="filter-group">
    <h2>Levels</h2>

    <FormulateInput
        v-model="selectedLevels"
        :options="levels"
        type="select"
        placeholder="Select an option"
        label="On which athletic level are you?"
    />
  </div>
</template>

<script>
  import { getState } from '@/store/getState';

  export default {
    computed: {
      selectedLevels: getState.selectedLevels,
      levels: getState.levels
    }
  }
</script>