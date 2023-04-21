<template>
  <aside class="notification">
    <div class="notification_wrap">
      <h2>{{ notification.topic }}</h2>
      <p>{{ notification.text }}</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Notification",
  props: [ "show", "topic", "text" ],
  data() {
    return {
      notification: {
        topic: "",
        text: ""
      }
    }
  },
  watch: {
    show(value) {
      this.notification.topic = this.topic;
      this.notification.text = this.text;
    }
  }
}
</script>

<style>
.notification {
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 300px;
  min-height: 100px;
  border-radius: 12px;
  background-color: var(--contentbg);
  outline: 1px solid var(--outline);
  box-shadow: 0 8px 20px -8px var(--notifyShadow);
  z-index: 10;
}
.notification h2 {
  color: var(--accent);
}
.notification_wrap {
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  padding: 20px;
}
</style>