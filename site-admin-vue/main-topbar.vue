<template>
<header class="main_topbar">
  <p class="topbar_info">
    <b>Панель управления сайтом</b>
  </p>
  <p class="topbar_name">
    <b>{{ user.name }}</b> (<a href="#" @click.prevent="setLogout()">сменить</a>)
  </p>
</header>
</template>

<script>
export default {
  name: "MainTopBar",
  props: [ "user" ],
  methods: {
    setLogout() {
      this.$emit("setLogout", true);
    }
  }
}
</script>

<style>
.main_topbar {
  grid-column: 2 / 5;
  grid-row: 2;
  display: flex;
  box-sizing: border-box;
  padding-inline: 38px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--navbar);
  color: var(--white);
  border-radius: 12px;
}
</style>