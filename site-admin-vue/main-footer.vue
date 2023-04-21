<template>
<footer class="main_footer">
  <p class="footer_text font_small">
    Copyright &copy; 2023
  </p>
  <p class="footer_text font_small">
    <a @click.prevent href="#">Вернуться на сайт</a>
  </p>
</footer>
</template>

<style>
.main_footer {
  grid-column: 1 / 6;
  grid-row: 6;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-inline: 38px;
  align-items: center;
  background-color: var(--navbar);
  color: var(--white);
}
.footer_text {
  color: var(--white);
}
</style>