<template>
  <button class="delete-btn" type="button" @click="$emit('onDelete')">
    <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.4 4.3h-.2c.2 0 .2 0 .2-.2v.2h7.2v-.2c0 .1 0 .2.2.2h-.2V6h1.7V4.1c0-.8-.7-1.5-1.6-1.5H8.3c-.9 0-1.6.7-1.6 1.5V6h1.7V4.3zM20.2 6H3.9c-.5 0-.8.3-.8.8v.7c0 .1 0 .2.2.2h1.4l.6 12.2c0 .8.7 1.5 1.5 1.5h10.6c.8 0 1.5-.7 1.5-1.5l.6-12.2h1.4l.2-.2v-.8c0-.4-.3-.7-.8-.7zm-3 13.7H6.8l-.6-12h11.4l-.6 12z"
            fill="#B8B8B8"/>
    </svg>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss">
.delete-btn {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;

  background-color: transparent;
  border: none;
  appearance: none;

  cursor: pointer;
}
</style>
