<template>
  <section v-if="!user.logined">
    <ScreenLogin @setLogined="setLogined">Экран логина</ScreenLogin>
  </section>
  <section v-else class="main-grid">
    <MainTopBar :user="user" @setLogout="setLogout">Верхняя панель</MainTopBar>
    <MainMenu :menu="menu" @setActive="setActive">Главное меню</MainMenu>

    <ScreenNotify v-show="isActive(returnId('Объявление'))" :user="user.session" :sid="returnId('Объявление')" @setEdited="setEdited" @setSaved="setSaved" @showNotification="showNotification">Экран объявлений</ScreenNotify>
    <ScreenManagers v-show="isActive(returnId('Менеджеры'))" :user="user.session" :sid="returnId('Менеджеры')" @setEdited="setEdited" @setSaved="setSaved" @showNotification="showNotification">Экран менеджеров</ScreenManagers>
    <ScreenContacts v-show="isActive(returnId('Контакты'))" :user="user.session" :sid="returnId('Контакты')" @setEdited="setEdited" @setSaved="setSaved" @showNotification="showNotification">Экран контактов</ScreenContacts>

    <Transition name="n"><Notification v-show="notification.show" :show="notification.show" :topic="notification.topic" :text="notification.text">Уведомление</Notification></Transition>

    <MainFooter>Футер</MainFooter>
  </section>
</template>

<style>
</style>

<script>
import Notification from "./notification.vue";

import MainTopBar from "./main-topbar.vue";
import MainMenu from "./main-menu.vue";
import MainFooter from "./main-footer.vue";

import ScreenLogin from "./screen-login.vue";
import ScreenNotify from "./screen-notify.vue";
import ScreenManagers from "./screen-managers.vue";
import ScreenContacts from "./screen-contacts.vue";

export default ({
  data() {
    return {
      notification: {
        show: false,
        topic: "",
        text: ""
      },
      user: {
        logined: false,
        session: "h2389dfkj3434heg789sdhisdfh87wfh",
        name: "Имян Имянович"
      },
      menu: {
        active: 0,
        items: [
          { id: 0, saved: true, name: "Объявление" },
          { id: 1, saved: true, name: "Менеджеры" },
          { id: 2, saved: true, name: "Контакты" }
        ]
      }
    }
  },
  methods: {
    showNotification(event) {
      this.notification.topic = event.topic;
      this.notification.text = event.text;
      if (this.notification.show) { this.notification.show = false; }
      this.notification.show = true;
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },
    setActive(id) {
      this.menu.active = id;
    },
    isActive(id) {
      if (id == this.menu.active) { return true; }
    },
    setLogined(event) {
      if (event) { this.user.logined = true; }
    },
    setLogout(event) {
      if (event) { this.user.logined = false; }
    },
    setEdited(id) {
      this.menu.items[id].saved = false;
    },
    setSaved(id) {
      this.menu.items[id].saved = true;
    },
    returnId(name) {
      for (const item of this.menu.items) {
        if (item.name.includes(name)) { return item.id; }
      }
    }
  },
  components: {
    Notification,
    MainTopBar,
    MainMenu,
    MainFooter,
    ScreenLogin,
    ScreenNotify,
    ScreenManagers,
    ScreenContacts
  }
});
</script>