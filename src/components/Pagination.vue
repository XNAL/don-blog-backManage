<template>
  <section class="pagination">
    <span class="total">共 {{ total }} 条</span>
    <span :class="{ 'disabled': 1 === currentPage }" @click="prevPage">&lt;</span>
    <span :class="{ 'active': page === currentPage }" 
          v-for="page in pages" 
          :key="page"
          @click="changePage(page)">{{ page }}</span>
    <span :class="{ 'disabled': currentPage === totalPage }" @click="nextPage">&gt;</span>
  </section>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      totalPage: 0
    };
  },
  computed: {
    pages () {
      if (this.pageSize > 0) {
        let pageCount = Math.ceil(this.total / this.pageSize);
        this.totalPage = pageCount > 0 ? pageCount : 1;
        this.currentPage = this.currentPage < 0 ? 1 : this.currentPage;
        this.currentPage = this.currentPage > this.totalPage ? this.totalPage : this.currentPage;
      }
      let array = [];
      for (let i = 1; i <= this.totalPage; i++) {
        array.push(i);
      }
      return array;
    }
  },
  methods: {
    prevPage: function () {
      let newPage = this.currentPage <= 1 ? this.currentPage : this.currentPage - 1;
      this.$emit('change-page', newPage);
    },
    nextPage: function () {
      let newPage = this.currentPage >= this.totalPage ? this.totalPage : this.currentPage + 1;
      this.$emit('change-page', newPage);
    },
    changePage: function (page) {
      this.$emit('change-page', page);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app';
.pagination {
  position: relative;
  font-size: 1em;
  margin: 1em 0;

  span {
    margin: 0 0.4em;
    display: inline-block;
    width: 1.8em;
    height: 1.8em;
    font-size: 1em;
    color: #666;
    line-height: 1.8em;
    text-align: center;
    border: 1px solid #d1dbe5;
    border-radius: 0.2em;
    box-sizing: border-box;
    cursor: pointer;

    &.active {
      color: #fff;
      background: $base-color;
      border-color: $base-color;
    }
    &.disabled {
      cursor: not-allowed;
      color: #e4e4e4;
      background: #fff;
      &:hover {
        color: #e4e4e4;
        border-color: #e4e4e4;
        background: #fff;
      }
    }
    &:hover {
      color: #fff;
      background: $base-color;
      border-color: $base-color;
    }
    &.total {
      border: none;
      margin: 0 0.5em 0 0;
      width: auto;
      cursor: default;

      &:hover {
        color: #666;
        background: #fff;
      }
    }
  }
}
</style>

