<template>
  <div class="filter-group">
    <h2>Time extent</h2>

    <FormulateInput
        v-model="timeNoPreference"
        type="checkbox"
        label="No preference"
    />
    <div v-if="!timeNoPreference">
      <p class="big-text"><b>{{ timesPerWeek }}</b> days a week for <b>{{ hoursPerDay }}</b> hours each.</p>
      <FormulateInput
          label="How many workout days a week?"
          type="range"
          name="range"
          min="1"
          max="7"
          value="3"
          validation="min:1|max:7"
          error-behavior="live"
          v-model="timesPerWeek"
      />
      <FormulateInput
          label="How many hours per workout?"
          type="range"
          name="range"
          min="1"
          max="8"
          value="1"
          validation="min:1|max:8"
          error-behavior="live"
          v-model="hoursPerDay"
      />
    </div>
  </div>
</template>

<script>
  import { getState } from '@/store/getState';

  export default {
    computed: {
      timeNoPreference: getState.timeNoPreference,
      hoursPerDay: getState.hoursPerDay,
      timesPerWeek: getState.timesPerWeek
    }
  }
</script>