<template>
  <section class="wrap">
    <h1>Заметки &mdash; {{ userName }}</h1>

    <section class="mainNotesWrap">
      <NotesList @callback="refreshNotes" :key="refresh"></NotesList>
    </section>

    <aside class="addNoteAside">
      <button class="btnAddNote" @click.prevent="btnAddNoteClick" title="Добавить новую заметку">+</button>
    </aside>
    <Transition>
      <section class="addNoteWrap" v-show="addNoteShow">
        <AddNewNote @callback="refreshNotes"></AddNewNote>
      </section>
    </Transition>
  </section>
</template>

<script>
import NotesList from "./notes-list.vue";
import AddNewNote from "./notes-add.vue";

export default ({
  data() {
    return {
      useStore: window.Store,
      refresh: 0,
      userName: "",
      addNoteShow: false
    }
  },
  created() {
    this.userName = this.useStore.get("user").name;
  },
  methods: {
    btnAddNoteClick() {
      if (!this.addNoteShow) { this.addNoteShow = true; }
        else { this.addNoteShow = false; }
    },
    printStore() {
      this.useStore.print();
    },
    refreshNotes() {
      this.addNoteShow = false;
      this.refresh += 1;
    }
  },
  components: {
    NotesList,
    AddNewNote
  }
});
</script>

<style>
.wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 80px;
  box-sizing: border-box;
  padding: 80px;
}
.mainNotesWrap {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.addNoteWrap {
  position: fixed;
  bottom: 60px;
  right: 60px;
  background-color: var(--white);
  padding: 60px;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid var(--divider);
  width: fit-content;
  box-shadow: var(--shadow);
}
.addNoteAside {
  position: fixed;
  bottom: 60px;
  right: 60px;
}
.btnAddNote {
  background-color: var(--btnstdbg);
  padding-inline: 18px;
  padding-block: 0;
  border-radius: 50%;
  color: var(--white);
  font-size: 64px;
  opacity: 0.8;
  transition: opacity var(--anim);
  width: fit-content;
  box-shadow: var(--shadow);
}
.btnAddNote:hover {
  opacity: 1;
}
</style>