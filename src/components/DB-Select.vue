<template>
  <section class="db-select">
    <div class="select-input" @click="showOptions = !showOptions">
      <input type="text" v-model="selectedValue" disabled="disabled">
      <span :class="['select-icon-arrow', { 'show': showOptions }]"></span>
    </div>
    <ul :class="['select-option-list', { 'show': showOptions }]">
      <li :class="['select-option', { 'selected': selectedId === option.id }]" 
          v-for="option in options" 
          :key="option.id"
          @click="selectValue(option.id, option.name)">
        {{ option.name }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    selected: {
      type: Number,
      required: true
    },
    options: {
      type: Array
    }
  },
  data () {
    return {
      selectedId: 0,
      selectedValue: '',
      showOptions: false
    };
  },
  watch: {
    showOptions: function () {
      if (this.showOptions) {
        document.body.addEventListener('click', this.hideOptions);
      } else {
        document.body.removeEventListener('click', this.hideOptions);
      }
    },
    selected: function () {
      this.initSelected();
    },
    options: function () {
      this.initSelected();
    }
  },
  created () {
    this.initSelected();
  },
  methods: {
    initSelected: function () {
      if (this.selected) {
        this.selectedId = this.selected;
      }
      for (let value of Object.values(this.options)) {
        if (value.id === this.selectedId) {
          this.selectedValue = value.name;
        }
      }
    },
    selectValue: function (id, value) {
      this.selectedId = id;
      this.$emit('selected-value', id);
      this.selectedValue = value;
      this.showOptions = false;
    },
    hideOptions: function () {
      this.showOptions = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.db-select {
  position: relative;
  width: 100%;
  .select-input {
    position: relative;
    .select-icon-arrow {
      position: absolute;
      top: 1.2em;
      right: 0.8em;
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 0.4em solid transparent;
      border-right: 0.4em solid transparent;
      border-top: 0.6em solid #555;
      transition: 0.2s all linear;
      &.show {
        transform: rotate(180deg);
      }
    }
  }
  .select-option-list {
    display: none;
    position: absolute;
    top: 100%; 
    left: 0;
    margin-top: 0.15em;
    width: 100%;
    color: #555;
    line-height: 2.5;
    z-index: 999;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0.1em 0.4em rgba(0,0,0,.2);
    box-sizing: border-box;
    max-height: 10em;
    transform: 0.2s height linear;

    &.show {
      display: block;
    }

    .select-option {
      padding-left: 1em;
      box-sizing: border-box;

      &:hover {
        cursor: pointer;
        background: #f6f6f6;
      }

      &.selected {
        background: #f6f6f6;
      }
    }
  }
}
</style>


