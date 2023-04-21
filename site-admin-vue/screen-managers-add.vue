<template>
  <aside class="alert_backgr">
    <div class="alert_wrap">
      <h2>Добавить менеджера</h2>
      <p>Добавьте данные нового менеджера или закройте окно для отмены.</p>
      <form class="form_wrap">
        <div class="form_item_wrap">
          <label for="name">Имя:</label>
          <input v-model="add.name" type="text" name="name" class="form_typeline" :class="isAddError(1)">
        </div>
        <div class="form_item_wrap">
          <label for="login">Почта:</label>
          <input v-model="add.login" type="email" name="login" class="form_typeline" :class="isAddError(2)">
        </div>
        <div class="form_item_wrap">
          <label for="password1">Пароль:</label>
          <input v-model="add.passw1" type="password" name="password1" class="form_typeline" :class="isAddError(3)">
        </div>
        <div class="form_item_wrap">
          <label for="password2">Пароль (еще раз):</label>
          <input v-model="add.passw2" type="password" name="password2" class="form_typeline" :class="isAddError(3)">
        </div>
      </form>
      <div class="alert_btnwrap">
        <button @click.prevent="closeAlert()" class="btn btn_standard">Закрыть</button>
        <button @click.prevent="addUser()" class="btn btn_good">Сохранить</button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AddUser",
  props: [ "maxid" ],
  data() {
    return {
      add: {
        error: false,
        errorCode: [],
        name: "",
        login: "",
        passw1: "",
        passw2: ""
      },
      new: {
        id: 0,
        name: "",
        login: ""
      }
    }
  },
  methods: {
    closeAlert() {
      this.$emit("callbackShow", false);
    },
    checkAddName() {
      if (this.add.name.length > 0) { return true; }
    },
    checkAddLogin() {
      if ((this.add.login.length > 0) && (this.add.login.includes("@")) && (this.add.login.includes("."))) { return true; }
    },
    checkAddPassw() {
      if ((this.add.passw1.length > 0) && (this.add.passw2.length > 0)) {
        if (this.add.passw1 == this.add.passw2) { return true; }
      }
    },
    addUser() {
      this.add.error = false;
      this.add.errorCode = [];
      this.add.name = this.add.name.trim();
      this.add.login = this.add.login.trim();
      this.add.passw1 = this.add.passw1.trim();
      this.add.passw2 = this.add.passw2.trim();

      this.new.id = this.maxid;
      if (this.checkAddName()) {
        this.new.name = this.add.name;
      } else {
        this.add.error = true;
        this.add.errorCode.push(1);
      }

      if (this.checkAddLogin()) {
        this.new.login = this.add.login;
      } else {
        this.add.error = true;
        this.add.errorCode.push(2);
      }

      if (this.checkAddPassw()) {
        // Сохранение пароля
      } else {
        this.add.error = true;
        this.add.errorCode.push(3);
      }

      if (!this.add.error) {
        this.$emit("callbackShow", false);
        this.$emit("callback", {
          "id": this.new.id,
          "name": this.new.name,
          "login": this.new.login
        });
        this.add.name = "";
        this.add.login = "";
        this.add.passw1 = "";
        this.add.passw2 = "";
      }
    },
    isAddError(code) {
      if (this.add.errorCode.includes(code)) { return "form_error"; }
    }
  }
}
</script>