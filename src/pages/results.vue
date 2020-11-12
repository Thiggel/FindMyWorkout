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
      <p v-if="!programs"><cLoadingSpinner/></p>

      <!-- If there are some... -->
      <div v-else class="program-list">

        <a
            v-for="program in filteredPrograms"
            :key="program.id"
            class="program-item"
            :href="program.link"
            target="_blank"
            style=""
        >
          <div class="title">
            <!--<img class="image" :src="program.image && program.image.publicUrlTransformed ? program.image.publicUrlTransformed : ''">-->
            <h1 class="name">{{ program.name }}</h1>
            <span class="price">{{ getPrice(program) }}</span>
          </div>

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
            <div class="ages">
              <i class="las la-user"></i>
              <span>{{ getNameList(program.ages) }}</span>
            </div>
          </div>

          <div class="bg-gradient"></div>
          <div class="bg-image"></div>
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
import cLoadingSpinner from "@/components/cLoadingSpinner.vue";
import programType from "@/pages/subPages/programType.vue";
import timeExtent from "@/pages/subPages/timeExtent.vue";
import levels from "@/pages/subPages/levels.vue";
import goal from "@/pages/subPages/goal.vue";
import extras from "@/pages/subPages/extras.vue";
import languages from "@/pages/subPages/languages.vue";
import ages from "@/pages/subPages/ages.vue";
import paymentType from "@/pages/subPages/paymentType.vue";

export default {
  transition: 'fade',

  components: {
    cSearchInput, cLogo, cLoadingSpinner, programType, timeExtent, levels, goal, extras, languages, ages, paymentType
  },

  head: {
    title: 'Find My Workout',
    meta: [
      { hid: 'robots', name: 'robots', content: 'noindex' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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

    truncate(input, length) {
      if (input.length > length)
        return input.substring(0, length) + '...';

      return input;
    },

    getNameList(arr) {
      return this.truncate(arr.map(el => el.name).slice(0,2).join(", ") + (arr.map(el => el.name).length > 2 ? ', …' : ''), 24);
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

  @media screen and (max-width: 1250px) {
    margin-left: 24px;
    margin-right: 24px;
  }
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

  @media screen and (max-width: 1250px) {
    margin-left: 24px;
    margin-right: 24px;
  }

  .program-item {
    width: calc(100% - 48px);
    margin-bottom: 24px;
    padding: 24px 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
    transition: all 0.25s ease;

    @media screen and (max-width: 800px) {
      flex-direction: column;
      padding: 12px;
    }

    &:hover {
      transform: scale(1.01);
      cursor: pointer;
    }

    .bg-gradient {
      background: linear-gradient(-90deg, #222222 50%, rgba(34, 34, 34, 0) 160%);
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      z-index: 0;
    }

    .bg-image {
      background-image:
          url(https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80);
      background-size: cover;
      background-position: -20vw center;
      filter: saturate(0);
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      z-index: -1;
    }

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;
      margin-left: 24px;

      .price {
        background: $mint;
        border-radius: 50px;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      @media screen and (max-width: 800px) {
        margin-left: 0;
        margin-bottom: 24px;
      }
    }

    img {
      width: 100px;
    }

    h1 {
      font-size: 24px;
      font-weight: 500;
      text-transform: uppercase;
      width: 120px;
      height: 120px;
      border-radius: 100px;
      background: $darkMidGrey;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      word-break: break-word;
      hyphens: auto;
      z-index: 1;
    }

    .features {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 12px;
      max-width: 85%;
      margin-right: 24px;
      margin-left: 40px;
      z-index: 1;

      @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
      }

      @media screen and (max-width: 800px) {
        max-width: 100%;
        margin-right: 0;
        margin-left: 0;
        margin-bottom: 24px;
      }

      @media screen and (max-width: 630px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
      }

      & > div {
        width: calc(100% - 72px);
        min-width: 240px;
        display: flex;
        align-items: center;
        background: $darkMidGrey;
        padding: 16px 36px;
        border-radius: 100px;
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