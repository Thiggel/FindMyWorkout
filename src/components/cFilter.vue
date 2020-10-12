<template>
  <div class="filter-wrapper" v-click-outside="externalClick">
    <div
        class="filter"
        :class="{focus: contentOpen}"
        @click="contentOpen = !contentOpen; $emit('input', $event)"
    >
      <i :class="icon"></i>
      <span>{{ label }}</span>
    </div>
    <div class="filter-content" v-if="contentOpen" @click="contentOpen = true">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentOpen: false
    };
  },

  props: {
    label: String,
    icon: String,
    value: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    value() {
      this.contentOpen = this.value;
    }
  },

  mounted() {
    this.contentOpen = this.value;
  },

  methods: {
    externalClick() {
      this.contentOpen = false;
    }
  }
}
</script>

<style lang="scss">
.filter-wrapper {
  position: relative;
}

.filter {
  background: #4D4D4D;
  padding: 0 16px;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-right: 12px;
  border: 3px solid transparent;
  height: calc(100% - 6px);

  &:hover, &.focus {
    border: 3px solid #2aab93;
    cursor: pointer;
  }

  i {
    margin-right: 12px;
    font-size: 30px;
  }
}

.filter-content {
  position: absolute;
  background: #4D4D4D;
  padding: 0 16px;
  border-radius: 10px;
  top: 62px;
  left: -3px;
  border: 3px solid #2aab93;
  padding: 20px;
  width: 300px;
}
</style>