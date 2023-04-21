<template>
  <aside class="alert_backgr">
    <div class="alert_wrap">
      <h2>Удалить?</h2>
      <p>Удаленного менеджера нельзя восстановить, в случае необходимости придется добавить его заново.</p>
      <div class="alert_btnwrap">
        <button @click.prevent="closeAlert()" class="btn btn_standard">Пока не надо</button>
        <button @click.prevent="deleteUser()" class="btn btn_risk">Удалить</button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "DeleteUser",
  methods: {
    closeAlert() {
      this.$emit("callbackShow", false);
    },
    deleteUser() {
      this.$emit("callbackShow", false);
      this.$emit("callback");
    }
  }
}
</script>