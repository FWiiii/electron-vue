<template>
  <svg width="2em" height="2em" viewBox="0 0 24 24">
    <path
      :fill="fillColor"
      d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "arrow-up",
  props: ["fillColor"],
};
</script>
