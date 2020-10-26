<template>
  <div class="filter-group">
    <h2>Languages</h2>
    <button class="small"
            @click="
                  arrayEquals(selectedLanguages, languages.map(el => el.value))
                  ? selectedLanguages = [] : selectedLanguages = languages.map(el => el.value)"
    >
      <span v-if="arrayEquals(selectedLanguages, languages.map(el => el.value))">Deselect all</span>
      <span v-else>Select all</span>
    </button>
    <FormulateInput
        type="checkbox"
        label="What language do you want the program to be in?"
        v-model="selectedLanguages"
        :options="languages"
    />
  </div>
</template>

<script>
  import { getState } from '@/store/getState';
  import { globals } from '@/assets/js/globals';

  export default {
    computed: {
      selectedLanguages: getState.selectedLanguages,
      languages: getState.languages
    },
    methods: {
      arrayEquals: globals.arrayEquals
    }
  }
</script>