<template>
  <section class="laboratory right-container">
    <back-menu></back-menu>
    <back-header></back-header>
    <db-dialog :title="dialogTitle" :visible="isShowDialog" @hide-dialog="hideDialog">
      <div class="dialog-form">
      </div>
      <div slot="footer" class="dialog-footer">
        <button class="btn-default" @click="isShowDialog = false">取 消</button>
        <button class="btn-primary" @click="isShowDialog = false">确 定</button>
      </div>
    </db-dialog>
  </section>
</template>

<script>
import Menu from '../components/Menu';
import Header from '../components/Header';
import DBDialog from '../components/DB-Dialog';

export default {
  components: {
    'back-menu': Menu,
    'back-header': Header,
    'db-dialog': DBDialog
  },
  data () {
    return {
      isShowDialog: false,
      dialogTitle: ''
    };
  },
  methods: {
    hideDialog: function () {
      this.isShowDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


