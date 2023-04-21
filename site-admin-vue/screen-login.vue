<template>
<section class="screen_login">
  <div class="alert_wrap">
    <h1>Логин</h1>
    <form class="form_wrap">
      <div class="form_item_wrap">
        <label for="email">Ваша почта:</label>
        <input v-model="user.login" type="email" name="email" class="form_typeline">
      </div>
      <div class="form_item_wrap">
        <label for="password">Ваш пароль:</label>
        <input v-model="user.passw" type="password" name="password" class="form_typeline">
      </div>
    </form>
    <div class="alert_btnwrap">
      <button @click.prevent="doLogin()" class="btn" :class="whatTypeButtonIs()">Войти</button>
      <Transition><p v-show="error.show" class="form_status">{{ error.text }}</p></Transition>
    </div>
  </div>
</section>
</template>

<script>
export default ({
  name: "ScreenLogin",
  data() {
    return {
      user: {
        login: "",
        passw: ""
      },
      demoUser: {
        login: "demo@demo.ru",
        passw: "demo"
      },
      error: {
        show: false,
        text: ""
      }
    }
  },
  created() {
    this.user.login = this.demoUser.login;
    this.user.passw = this.demoUser.passw;
  },
  methods: {
    isNotEmpty() {
      if ((this.user.login.length > 0) && (this.user.passw.length > 0)) { return true; }
        else { return false; }
    },
    checkLogin() {
      if ((this.user.login == this.demoUser.login) && (this.user.passw == this.demoUser.passw)) { return true; }
        else { return false; }
    },
    setError(text) {
      this.error.show = true;
      this.error.text = text;
      setTimeout(() => {
        this.error.show = false;
      }, 2000);
    },
    whatTypeButtonIs() {
      if (this.isNotEmpty()) { return "btn_standard"; }
        else { return "btn_disabled"; }
    },
    doLogin() {
      if (!this.isNotEmpty()) {
        this.setError("Поля формы пустые");
        this.user.login = this.demoUser.login;
        this.user.passw = this.demoUser.passw;
      }
      else if (!this.checkLogin()) {
        this.setError("Менеджер не найден");
        this.user.login = this.demoUser.login;
        this.user.passw = this.demoUser.passw;
      } else {
        this.$emit("setLogined", true);
      }
    }
  }
})
</script>

<style>
.screen_login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>