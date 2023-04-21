<template>
<section class="screen_section">
  <article class="section_article">
    <h1>Контакты компании</h1>
    <p>Здесь собраны все контакты компании, которые можно изменить. После сохранения они автоматически обновятся на всем сайте.</p>
  </article>
  <form class="contacts_form content_wrap">
    <div class="contacts_form_itemwrap">
      <label for="name">Телефон:</label>
      <input v-model="data.phone" @keyup="textEdited()" type="text" name="name" class="form_typeline">
    </div>
    <div class="contacts_form_itemwrap">
      <label for="name">Телефон (доп.):</label>
      <input v-model="data.phone2" @keyup="textEdited()" type="text" name="name" class="form_typeline">
    </div>
    <div class="contacts_form_itemwrap">
      <label for="name">Почта (заказы):</label>
      <input v-model="data.mail" @keyup="textEdited()" type="text" name="name" class="form_typeline">
    </div>
    <div class="contacts_form_itemwrap">
      <label for="name">Почта (поддержка):</label>
      <input v-model="data.support" @keyup="textEdited()" type="text" name="name" class="form_typeline">
    </div>
    <div class="contacts_form_itemwrap">
      <label for="name">Адрес:</label>
      <input v-model="data.address" @keyup="textEdited()" type="text" name="name" class="form_typeline">
    </div>
    <div class="contacts_form_submit">
      <button @click.prevent="SaveButton()" class="btn btn_standard" :class="isDisabled()">Сохранить</button>
    </div>
  </form>
</section>
</template>

<script>
import { API } from "./api.js";
const RestApi = API();

export default {
  name: "ScreenContacts",
  props: [ "sid", "session" ],
  data() {
    return {
      btn: {
        disabled: true,
        class: "btn_disabled"
      },
      data: {
        saved: true
      }
    }
  },
  created() {
    RestApi.request("GET", RestApi.base + "contacts.json")
      .then((data) => { this.data = data; });
  },
  methods: {
    showN(topic, text) {
      this.$emit("showNotification", { "topic": topic, "text": text });
    },
    setEdited() {
      this.btn.disabled = false;
      this.$emit("setEdited", this.sid);
    },
    setSaved() {
      this.data.saved = true;
      this.btn.disabled = true;
      this.$emit("setSaved", this.sid);
    },
    textEdited() {
      if (this.data.saved) {
        this.data.saved = false;
        this.setEdited();
      }
    },
    isDisabled() {
      if (this.btn.disabled) { return this.btn.class; }
    },
    SaveButton() {
      if (!this.btn.disabled) {
        this.setSaved();
        this.showN("Готово", "Контакты сохранены");
      }
    }
  }
}
</script>

<style>
.contacts_form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.contacts_form_itemwrap {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
}
.contacts_form_submit {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}
.contacts_form_savestate {
  color: var(--accent);
}
</style>