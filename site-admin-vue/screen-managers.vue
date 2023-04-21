<template>
<section class="screen_section">
  <article class="section_article">
    <h1>Менеджеры сайта</h1>
    <p>Здесь собраны аккаунты менеджеров, имеющих доступ к управлению сайтом.</p>
    <p>Можно добавить нового менеджера, изменить данные старого или удалить для запрета доступа к панели управления.</p>
  </article>
  <div class="managers_list_btn content_wrap">
    <button @click.prevent="alertAddUser()" class="btn btn_good">Добавить</button> нового менеджера
  </div>
  <ul class="managers_list content_wrap">
    <li v-for="(user, key) in sortedUsers" :key="key">
      <p><b>{{ user.name }}</b></p>
      <p>{{ user.login }}</p>
      <span class="managers_list_btn">
        <button @click.prevent="alertEditUser(user.id)" class="btn btn_standard">Изменить</button>
        <button @click.prevent="alertDeleteUser(user.id)" class="btn btn_risk">Удалить</button>
      </span>
    </li>
  </ul>

  <Transition><UserAdd v-show="alert.showAdd" :maxid="findMaxId()" @callback="addUser" @callbackShow="closeAlert">Окно добавления</UserAdd></Transition>
  <Transition><UserEdit v-show="alert.showEdit" :data="dataEdit()" @callback="editUser" @callbackShow="closeAlert">Окно редактирования</UserEdit></Transition>
  <Transition><UserDelete v-show="alert.showDelete" @callback="deleteUser" @callbackShow="closeAlert">Окно удаления</UserDelete></Transition>
</section>
</template>

<script>
import { API } from "./api.js";
const RestApi = API();

import UserAdd from "./screen-managers-add.vue";
import UserEdit from "./screen-managers-edit.vue";
import UserDelete from "./screen-managers-delete.vue";

export default {
  name: "ScreenManagers",
  props: [ "sid", "session" ],
  data() {
    return {
      users: [],
      uid: undefined,
      alert: {
        showAdd: false,
        showDelete: false,
        showEdit: false
      }
    }
  },
  created() {
    RestApi.request("GET", RestApi.base + "managers.json")
      .then((data) => { this.users = data; });
  },
  computed: {
    sortedUsers() {
      if (Array.isArray(this.users)) {
        return this.users.sort((a, b) => { return a.name.localeCompare(b.name); });
      }
    }
  },
  methods: {
    showN(topic, text) {
      this.$emit("showNotification", { "topic": topic, "text": text });
    },
    dataEdit() {
      if (this.uid !== undefined) {
        for (const user of this.users) {
          if (user.id == this.uid) { return user; }
        }
      }
    },
    alertAddUser() {
      this.alert.showAdd = true;
    },
    alertEditUser(id) {
      this.uid = id;
      this.alert.showEdit = true;
    },
    alertDeleteUser(id) {
      this.uid = id;
      this.alert.showDelete = true;
    },
    closeAlert() {
      this.alert.showAdd = false;
      this.alert.showEdit = false;
      this.alert.showDelete = false;
    },
    deleteUser() {
      this.alert.showDelete = false;
      this.users = this.users.filter((user) => { return user.id !== this.uid; });
      this.showN("Готово", "Менеджер удален");
    },
    findMaxId() {
      let i = 0;
      if (Array.isArray(this.users)) {
        for (const user of this.users) {
          if (user.id > i) { i = user.id; }
        }
      }
      return i;
    },
    addUser(data) {
      this.users.push(data);
      this.showN("Готово", "Менеджер добавлен");
    },
    editUser(data) {
      for (const user of this.users) {
        if (user.id == this.uid) {
          user.name = data.name;
          user.login = data.login;
          this.showN("Готово", "Данные менеджера обновлены");
        }
      }
    }
  },
  components: {
    UserAdd,
    UserEdit,
    UserDelete
  }
}
</script>

<style>
.managers_list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.managers_list li {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
}
.managers_list_btn {
  display: flex;
  align-items: center;
  gap: 26px;
}
.managers_savestate {
  color: var(--accent);
}
</style>