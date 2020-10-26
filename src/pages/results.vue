<template>
  <div class="app">
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <transition name="fade">
      <div v-if="filterPanelOpen">
        <div class="overlay" id="filter-panel">

          <div class="filter-list">
            <cSearchInput v-model="search" />

            <programType/>
            <timeExtent/>
            <levels/>
            <goal/>
            <extras/>
            <languages/>
            <ages/>
            <paymentType/>

          </div>

        </div>

        <div class="option-bar">
          <div class="option-bar-wrapper">
            <button @click="filterPanelOpen = false">Apply filters</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="wrapper">
      <i class="menu-opener las la-bars" @click="filterPanelOpen = !filterPanelOpen"></i>

      <cLogo/>

      <!-- Data not loaded yet -->
      <p v-if="!programs">loading...</p>

      <!-- If there are some... -->
      <div v-else class="program-list">

        <a v-for="program in filteredPrograms" :key="program.id" class="program-item" :href="program.link" target="_blank">
          <img class="image" :src="program.image && program.image.publicUrlTransformed ? program.image.publicUrlTransformed : ''">
          <h1 class="name">{{ program.name }}</h1>
          <div class="features">
            <div class="type">
              <i class="las la-warehouse"></i>
              <span>{{ getNameList(program.trainingTypes) }}</span>
            </div>
            <div class="time">
              <i class="las la-clock"></i>
              <span v-html="program.time"></span>
            </div>
            <div class="extras">
              <i class="las la-folder-plus"></i>
              <span>{{ getNameList(program.extras) }}</span>
            </div>
            <div class="goal">
              <i class="las la-running"></i>
              <span>{{ getNameList(program.goal) }}</span>
            </div>
            <div class="level">
              <i class="las la-level-up-alt"></i>
              <span>{{ getNameList(program.level) }}</span>
            </div>
            <div class="language">
              <i class="las la-language"></i>
              <span>{{ getNameList(program.languages) }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import { getState } from '@/store/getState';
import { globals } from '@/assets/js/globals';
import cSearchInput from "@/components/cSearchInput.vue";
import cLogo from "@/components/cLogo.vue";
import programType from "@/pages/subPages/programType.vue";
import timeExtent from "@/pages/subPages/timeExtent.vue";
import levels from "@/pages/subPages/levels.vue";
import goal from "@/pages/subPages/goal.vue";
import extras from "@/pages/subPages/extras.vue";
import languages from "@/pages/subPages/languages.vue";
import ages from "@/pages/subPages/ages.vue";
import paymentType from "@/pages/subPages/paymentType.vue";

export default {
  components: {
    cSearchInput, cLogo, programType, timeExtent, levels, goal, extras, languages, ages, paymentType
  },

  head: {
    title: 'Find My Workout',
    meta: [
      { hid: 'robots', name: 'robots', content: 'noindex' }
    ]
  },

  data() {
    return {
      filterPanelOpen: false,
      search: ''
    };
  },

  computed: {
    ...getState,

    filteredPrograms() {
      if(this.programs) {
        return this.filterSearch(this.filterTime(this.applyFilters(
            this.programs,
            [
              { selected: this.selectedTrainingTypes, key: 'trainingTypes' },
              { selected: this.selectedGoals, key: 'goal' },
              { selected: this.selectedLevels, key: 'level' },
              { selected: this.selectedExtras, key: 'extras' },
              { selected: this.selectedLanguages, key: 'languages' },
              { selected: this.selectedPaymentTypes, key: 'payment' },
              { selected: this.selectedAges, key: 'ages' },
            ]
        )));
      }
      return [];
    }
  },

  created() {
    // Get the programs on server side
    this.$store.dispatch('loadData');
  },

  methods: {
    ...globals,

    filterInclusive(arr, selected, key) {
      return arr.filter(el => this.intersect( el[key].map(i => i.name), selected));
    },

    applyFilters(arr, filters) {
      let res = arr;
      for(const i in filters) {
        res = this.filterInclusive(res, filters[i].selected, filters[i].key);
      }

      return res;
    },

    filterTime(arr) {
      if(this.timeNoPreference) return arr;
      return arr.filter(
          el => el.trainingDaysPerWeek == this.timesPerWeek && el.hoursPerDay == this.hoursPerDay
      );
    },

    filterSearch(arr) {
      if(!this.search.length) return arr;
      return arr.filter(el => el.name.toUpperCase().includes(this.search.toUpperCase()))
    },

    getNameList(arr) {
      return arr.map(el => el.name).join(", ");
    }
  },
};
</script>


<style lang="scss">
@import '../../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
@import '../assets/scss/globals';

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $greyTransparent;
  z-index: 999;
  backdrop-filter: blur(15px);
  overflow-y: scroll;
}

.option-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: $greyTransparent;
  backdrop-filter: blur(15px);
  padding: 40px;
}

.option-bar-wrapper {
  display: block;
  max-width: 1250px;
  margin: 0 auto;

  button {
    margin: 0 auto;
    width: 100%;
  }
}

.menu-opener {
  font-size: 34px;
  cursor: pointer;
  color: $mint;
  position: absolute;
  top: 58px;
  left: max(calc((100vw - 1250px) / 2), 24px);
  z-index: 1000;
  background: $greyTransparent;
  backdrop-filter: blur(15px);
  border-radius: 10px;
  padding: 12px;
  padding-bottom: 36px;

  &:after {
    content: "Adjust filters";
    color: $mint;
    font-size: 11px;
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Roboto", "Open Sans", "Helvetica Neue", "Arial";
    width: 80px;
    text-align: center;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 15px;
  }
}

.filter-list {
  width: 100%;
  max-width: 1250px;
  display: block;
  width: auto;
  margin: 150px auto 40px;
  padding-bottom: 120px;
}

.filter-group {
  background: $lightGrey;
  padding: 24px;
  border-radius: 10px;
  margin: 24px 0;
  width: calc(100% - 48px);
}

.program-list {
  max-width: 1250px;
  display: block;
  width: auto;
  margin: 80px auto 0;

  .program-item {
    width: calc(100%- 48px);
    margin-bottom: 24px;
    background: $lightGrey;
    padding: 24px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 3px solid transparent;

    &:hover {
      border: 3px solid $mint;
      cursor: pointer;
    }

    img {
      width: 100px;
      margin-left: 40px;
    }

    h1 {
      font-size: 24px;
      font-weight: 500;
    }

    .features {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 12px;
      max-width: 70%;
      margin-right: 24px;

      & > div {
        width: calc(100% - 48px);
        display: flex;
        align-items: center;
        margin: 0 24px;
        background: $midGrey;
        padding: 12px 24px;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 400;

        i {
          margin-right: 12px;
          font-size: 30px;
        }
      }
    }
  }
}

</style>