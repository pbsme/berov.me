<template>
  <div class="note" v-for="(note, key) in notes" :key="key">
    <button class="btnDelete" @click.prevent="deleteNote(note.id)" title="Удалить заметку">&times;</button>
    <p class="noteCat">{{ note.category }}</p>
    <h2>{{ note.name }}</h2>
    <p>{{ note.text }}</p>
    <div class="noteDiv"></div>
    <p class="noteDate">{{ note.date }}</p>
  </div>
</template>

<script>
export default {
  name: "NotesList",
  emits: [ "callback" ],
  data() {
    return {
      useStore: window.Store,
      notes: []
    }
  },
  created() {
    this.notes = this.useStore.get("notes");
  },
  methods: {
    deleteNote(id) {
      this.useStore.del("notes", id);
      this.$emit("callback");
    }
  }
}
</script>

<style>
.note {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
  height: fit-content;
  padding-block: 40px;
  padding-inline: 25px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: var(--notebg);
  box-shadow: var(--shadow);
}
.noteCat {
  width: fit-content;
  box-sizing: border-box;
  padding-block: 1px;
  padding-inline: 10px;
  border-radius: 6px;
  background-color: var(--catbg);
  color: var(--white);
  letter-spacing: 0.5px;
  font-size: 14px;
}
.noteDiv {
  height: 3px;
  background-color: var(--divider);
}
.noteDate {
  color: var(--grey);
  font-size: 16px;
}
.btnDelete {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  padding-inline: 12px;
  padding-block: 4px;
  font-size: 26px;
  font-weight: bold;
  opacity: 0.4;
  transition: opacity var(--anim);
  width: fit-content;
}
.btnDelete:hover {
  opacity: 1;
}
</style>