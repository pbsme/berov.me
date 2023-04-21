<template>
  <aside class="alert_backgr">
    <div class="alert_wrap">
      <h2>{{ edit.original }}</h2>
      <p>Измените данные менеджера или закройте окно без сохранения.</p>
      <form class="form_wrap">
        <div class="form_item_wrap">
          <label for="name">Имя:</label>
          <input v-model="edit.name" type="text" name="name" class="form_typeline" :class="isEditError(1)">
        </div>
        <div class="form_item_wrap">
          <label for="login">Почта:</label>
          <input v-model="edit.login" type="email" name="login" class="form_typeline" :class="isEditError(2)">
        </div>
        <div class="form_item_wrap">
          <label for="password1">Пароль:</label>
          <input v-model="edit.passw1" type="password" name="password1" class="form_typeline" :class="isEditError(3)">
        </div>
        <div class="form_item_wrap">
          <label for="password2">Пароль (еще раз):</label>
          <input v-model="edit.passw2" type="password" name="password2" class="form_typeline" :class="isEditError(3)">
        </div>
      </form>
      <div class="alert_btnwrap">
        <button @click.prevent="closeAlert()" class="btn btn_standard">Закрыть</button>
        <button @click.prevent="editUser()" class="btn btn_good">Сохранить</button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "EditUser",
  props: [ "data" ],
  data() {
    return {
      edit: {
        error: false,
        errorCode: [],
        original: "",
        name: "",
        login: "",
        passw1: "",
        passw2: ""
      },
      new: {
        name: "",
        login: ""
      }
    }
  },
  watch: {
    data(data) {
      if (data !== undefined) {
        this.edit.original = data.name;
        this.edit.name = data.name;
        this.edit.login = data.login;
      }
    }
  },
  methods: {
    closeAlert() {
      this.$emit("callbackShow", false);
    },
    checkEditName() {
      if (this.edit.name.length > 0) { return true; }
    },
    checkEditLogin() {
      if ((this.edit.login.length > 0) && (this.edit.login.includes("@")) && (this.edit.login.includes("."))) { return true; }
    },
    checkEditPassw() {
      if ((this.edit.passw1.length > 0) && (this.edit.passw2.length > 0)) {
        if (this.edit.passw1 == this.edit.passw2) { return true; }
      }
    },
    editUser() {
      this.edit.error = false;
      this.edit.errorCode = [];
      this.edit.name = this.edit.name.trim();
      this.edit.login = this.edit.login.trim();
      this.edit.passw1 = this.edit.passw1.trim();
      this.edit.passw2 = this.edit.passw2.trim();

      if (this.checkEditName()) {
        this.new.name = this.edit.name;
      } else {
        this.edit.error = true;
        this.edit.errorCode.push(1);
      }

      if (this.checkEditLogin()) {
        this.new.login = this.edit.login;
      } else {
        this.edit.error = true;
        this.edit.errorCode.push(2);
      }

      if (this.checkEditPassw()) {
        // Сохранение пароля
      } else {
        this.edit.error = true;
        this.edit.errorCode.push(3);
      }

      if (!this.edit.error) {
        this.$emit("callbackShow", false);
        this.$emit("callback", {
          "name": this.new.name,
          "login": this.new.login
        });
        this.new.name = "";
        this.new.login = "";
        this.edit.original = "";
        this.edit.name = "";
        this.edit.login = "";
        this.edit.passw1 = "";
        this.edit.passw2 = "";
      }
    },
    isEditError(code) {
      if (this.edit.errorCode.includes(code)) { return "form_error"; }
    }
  }
}
</script>