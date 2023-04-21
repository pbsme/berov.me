<template>
<nav class="main_menu">
  <h2>Меню</h2>
  <ul class="menu_list">
    <li v-for="(item, key) in menu.items">
      <a href="#" class="list_a" :class="isActive(item.id), isSaved(item.saved)" @click.prevent="onMenuClick(item.id)" :key="key">{{ item.name }}</a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  name: "MainMenu",
  props: [ "menu" ],
  data() {
    return {
      class: {
        active: "active",
        notsaved: "not-saved"
      }
    }
  },
  methods: {
    isActive(id) {
      if (id == this.menu.active) { return this.class.active; }
    },
    isSaved(saved) {
      if (!saved) { return this.class.notsaved; }
    },
    onMenuClick(id) {
      this.$emit("setActive", id);
    }
  }
}
</script>

<style>
.main_menu {
  grid-column: 2;
  grid-row: 4;
  display: flex;
  position: sticky;
  height: fit-content;
  box-sizing: border-box;
  padding-inline: 38px;
  padding-block: 20px;
  flex-direction: column;
  gap: 40px;
  background-color: var(--outline);
  border-radius: 12px;
}
.menu_list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.list_a {
  color: var(--dark);
  font-weight: bold;
  border-bottom: initial;
  gap: 6px;
  display: flex;
  height: 40px;
  align-items: center;
  background-color: #4656b720;
  border-radius: 8px;
  padding-inline-start: 12px;
  transition: background var(--anim), color var(--anim);
}
.list_a:hover {
  background-color: var(--accent) !important;
  color: var(--white);
  border-bottom: initial;
}
.list_a.active {
  background-color: var(--accent);
  color: var(--white);
}
.list_a.active::before {
  content: ">";
}
.list_a.not-saved {
  background-color: var(--risk);
  color: var(--riskdark);
}
</style>