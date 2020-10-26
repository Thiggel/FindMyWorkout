<template>
  <div class="app">
    <div class="wrapper">
      <cLogo/>
      <div class="wizard">
        <transition name="fade" mode="out-in">
          <div class="step" v-if="step === 0" key="0">
            <h1>Find your perfect Program!</h1>
            <img src="~/assets/images/workout.png" class="hero-image" />
            <p class="text">Finding a good programming is hard. That's why we've created FindMyWorkout, where you can easily compare a lot of famous workout programs to find the one that suits you best. Have fun ☺️!</p>
          </div>

          <div class="step" v-else-if="step === 1" key="1">
            <programType/>
          </div>

          <div class="step" v-else-if="step === 2" key="2">
            <timeExtent/>
          </div>

          <div class="step" v-else-if="step === 3" key="3">
            <levels/>
          </div>

          <div class="step" v-else-if="step === 4" key="4">
            <goal/>
          </div>

          <div class="step" v-else-if="step === 5" key="5">
            <extras/>
          </div>

          <div class="step" v-else-if="step === 6" key="6">
            <languages/>
          </div>

          <div class="step" v-else-if="step === 7" key="7">
            <ages/>
          </div>

          <div class="step" v-else-if="step === 8" key="8">
            <paymentType/>
          </div>
        </transition>

        <div v-if="step <= 7" class="options two">
          <button @click="step++">
            <span v-if="step == 0">Start</span>
            <span v-else>Continue</span>
          </button>
          <nuxt-link to="/results" class="button secondary">
            Go straight to program list
          </nuxt-link>
        </div>
        <div v-else class="options">
          <nuxt-link to="/results" class="button">
            Get your results
          </nuxt-link>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { getState } from '@/store/getState';
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
  transition: 'fade',

  data() {
    return {
      step: 0
    };
  },

  components: {
    cLogo, programType, timeExtent, levels, goal, extras, languages, ages, paymentType
  },

  computed: {
    ...getState,
  },

  head: {
    title: 'Find My Workout',
    meta: [
      { hid: 'robots', name: 'robots', content: 'noindex' }
    ]
  },

  created() {
    // Get the programs on server side
    this.$store.dispatch('loadData');
  },

}
</script>

<style lang="scss">
@import '../../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
@import '../assets/scss/globals';

.wizard {
  max-width: 1250px;
  margin: 0 auto;
  margin-top: 80px;
}

.options {
  display: flex;
  align-items: center;
  justify-content: center;

  &.two button:first-child {
    margin-right: 12px;
  }
}

.hero-image {
  max-width: 450px;
  display: block;
  margin: 0 auto;
}
</style>