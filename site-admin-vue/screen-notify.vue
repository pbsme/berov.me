<template>
<section class="screen_section">
  <article class="section_article">
    <h1>Объявление на сайте</h1>
    <p>Здесь можно ввести текст объявления, которое необходимо разместить на сайте. Например, объявление о графике работы на праздниках или смене контактов.</p>
    <p>Видимость объявления можно менять переключателем под формой ввода текста.</p>
  </article>
  <form class="notify_form content_wrap">
    <textarea v-model="data.text" @keyup="textEdited()" class="form_typetext" rows="10">{{ data.text }}</textarea>
    <div class="notify_form_itemwrap">
      <div class="notify_form_subitemwrap">
        <input v-model="visible.state" @click="isVisibleClicked()" type="checkbox" name="is_visible" checked>
        <label for="is_visible">Показывать на сайте 
          <Transition><span v-show="!visible.saved" class="notify_form_savestate">(не забудьте сохранить)</span></Transition>
        </label>
      </div>
      <div class="notify_form_subitemwrap">
        <button @click.prevent="SaveButton()" class="btn btn_standard" :class="isDisabled()">Сохранить</button>
      </div>
    </div>
  </form>
</section>
</template>

<script>
import { API } from "./api.js";
const RestApi = API();

export default {
  name: "ScreenNotify",
  props: [ "sid", "session" ],
  data() {
    return {
      btn: {
        disabled: true,
        class: "btn_disabled"
      },
      data: {
        saved: true
      },
      visible: {
        saved: true
      }
    }
  },
  created() {
    RestApi.request("GET", RestApi.base + "notify.json")
      .then((data) => {
        this.data = data.data;
        this.visible = data.visible;
      });
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
      this.visible.saved = true;
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
    isVisibleClicked() {
      if (this.visible.saved) {
        this.visible.saved = false;
        this.setEdited();
      }
    },
    isDisabled() {
      if (this.btn.disabled) { return this.btn.class; }
    },
    SaveButton() {
      if (!this.btn.disabled) {
        this.setSaved();
        this.showN("Готово", "Объявление сохранено");
      }
    }
  }
}
</script>

<style>
.notify_form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.notify_form_itemwrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notify_form_subitemwrap {
  display: flex;
  align-items: center;
  gap: 16px;
}
.notify_form_savestate {
  color: var(--accent);
}
</style>