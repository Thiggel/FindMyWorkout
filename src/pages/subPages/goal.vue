<template>
  <div class="filter-group">
    <h2>Goal</h2>

    <button class="small"
            @click="
                  arrayEquals(selectedGoals, goals.map(el => el.value))
                  ? selectedGoals = [] : selectedGoals = goals.map(el => el.value)"
    >
      <span v-if="arrayEquals(selectedGoals, goals.map(el => el.value))">Deselect all</span>
      <span v-else>Select all</span>
    </button>
    <FormulateInput
        type="checkbox"
        label="What's your goal?"
        v-model="selectedGoals"
        :options="goals"
    />
  </div>
</template>

<script>
  import { getState } from '@/store/getState';
  import { globals } from '@/assets/js/globals';

  export default {
    computed: {
      selectedGoals: getState.selectedGoals,
      goals: getState.goals
    },
    methods: {
      arrayEquals: globals.arrayEquals
    }
  }
</script>