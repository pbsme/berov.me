<template>
  <h2>Добавление новой заметки</h2>
  <form class="formWrap">
    <div class="catWrap">
      <input class="form_typeline" type="text" name="notecat" v-model="newNoteCat" @keyup="suggestCat" placeholder="Категория">
      <Transition>
        <div class="suggWrap" v-show="suggestShow">
          <button class="btnsuggest" v-for="(item, key) in suggestItems" @click.prevent="applySuggest(item)" :key="key">{{ item }}</button>
        </div>
      </Transition>
    </div>
    <input class="form_typeline" type="text" name="notename" v-model="newNoteName" placeholder="Заголовок">
    <textarea class="form_typetext" name="notetext" v-model="newNoteText" placeholder="Текст заметки"></textarea>
    <button class="btn btn_standard" @click.prevent="addNewNote">Добавить</button>
  </form>
</template>

<script>
export default {
  name: "AddNewNote",
  emits: [ "callback" ],
  data() {
    return {
      useStore: window.Store,
      suggestItems: [],
      suggestShow: false,
      newNoteName: "",
      newNoteCat: "",
      newNoteText: ""
    }
  },
  methods: {
    suggestCat() {
      this.suggestItems = [];
      let notes = this.useStore.get("notes");
      let cats = [];
      for (let n of notes) {
        if (!cats.includes(n.category)) { cats.push(n.category); }
      }
      if (cats.length > 0) {
        for (let c of cats) {
          if ((c.toLowerCase()).includes(this.newNoteCat.toLowerCase()) && (this.newNoteCat.length > 0)) { this.suggestItems.push(c); }
        }
      }
      if (this.suggestItems.length > 0) { this.suggestShow = true; }
        else { this.suggestShow = false; }
    },
    applySuggest(item) {
      this.newNoteCat = item;
      this.suggestShow = false;
      this.suggestItems = [];
    },
    randomTemplate() {
      let templ = this.useStore.get("template");
      let rand = Math.floor(Math.random() * templ.length);
      return templ[rand];
    },
    addNewNote() {
      let notes = this.useStore.get("notes");

      let newid = 0;
      for (let n of notes) {
        if (n.id >= newid) { newid = n.id + 1; }
      }

      let newcat = this.newNoteCat ? this.newNoteCat : "Хештег";
      let name = this.newNoteName ? this.newNoteName : this.randomTemplate();
      let text = this.newNoteText ? this.newNoteText : this.randomTemplate();

      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      if (day < 10) { day = "0" + day; }
      if (month < 10) { month = "0" + month; }
      let newdate = [day, month, year].join(".");

      let newnote = {
        "id": newid,
        "category": newcat,
        "name": name,
        "text": text,
        "date": newdate
      }
      this.useStore.add("notes", newnote);

      this.newNoteCat = "";
      this.newNoteName = "";
      this.newNoteText = "";

      this.$emit("callback");
    }
  }
}
</script>

<style>
.formWrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  box-sizing: border-box;
  padding-top: 40px;
}
.catWrap {
  position: relative;
}
.suggWrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  background-color: var(--white);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px;
}
.btnsuggest {
  font-size: 14px;
  font-weight: bold;
  width: fit-content;
  padding-inline: 10px;
  padding-block: 6px;
  border-radius: 6px;
  color: var(--dark);
  background-color: var(--divider);
}
</style>