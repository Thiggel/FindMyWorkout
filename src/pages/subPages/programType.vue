<template>
  <div class="filter-group">
    <h2>Program Type</h2>
    <button class="small"
            @click="
                  arrayEquals(selectedTrainingTypes, trainingTypes.map(el => el.value))
                  ? selectedTrainingTypes = [] : selectedTrainingTypes = trainingTypes.map(el => el.value)"
    >
      <span v-if="arrayEquals(selectedTrainingTypes, trainingTypes.map(el => el.value))">Deselect all</span>
      <span v-else>Select all</span>
    </button>
    <FormulateInput
        type="checkbox"
        label="What type of program do you want?"
        v-model="selectedTrainingTypes"
        :options="trainingTypes"
    />
  </div>
</template>

<script>
  import { getState } from '@/store/getState';
  import { globals } from '@/assets/js/globals';

  export default {
    computed: {
      selectedTrainingTypes: getState.selectedTrainingTypes,
      trainingTypes: getState.trainingTypes
    },
    methods: {
      arrayEquals: globals.arrayEquals
    }
  }
</script>