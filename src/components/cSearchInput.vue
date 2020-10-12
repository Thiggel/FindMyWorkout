<template>
  <div class="c-search-input" :class="{focus: isFocused}">
    <transition name="fade">
      <div class="tiny-label" v-if="value.length">Search</div>
    </transition>
    <i class="las la-search"></i>
    <input
        type="text"
        placeholder="Search"
        :value="value"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocused: false,
    };
  },

  props: {
    value: {
      type: String,
      default: ""
    }
  },

  methods: {
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.c-search-input {
  background: #4D4D4D;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  border: 3px solid transparent;
  position: relative;
  width: 100%;

  &:hover, &.focus {
    border: 3px solid #2aab93;
    cursor: pointer;
  }

  i {
    margin-right: 12px;
    font-size: 30px;
  }

  .tiny-label {
    position: absolute;
    font-size: 10px;
    top: 4px;
    left: 58px;
    color: #FFF;
  }

  input {
    border: transparent;
    padding: 12px;
    margin-left: -56px;
    margin-right: -8px;
    margin-top: -8px;
    margin-bottom: -8px;
    padding-left: 56px;
    background: transparent;
    font-size: 16px;
    font-family: "Roboto", "Open Sans", "Helvetica Neue", "Arial";
    color: #FFF;
    width: 100%;

    &:focus {
      outline: none !important;
    }
  }
}
</style>