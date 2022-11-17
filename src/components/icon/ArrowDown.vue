<template>
  <svg width="2em" height="2em" viewBox="0 0 24 24">
    <path
      :fill="fillColor"
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "arrow-down",
  props: ["fillColor"],
};
</script>
