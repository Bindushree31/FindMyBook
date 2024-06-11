<template>
  <div>
    <img :src="getImage" :alt="getImage" width="220px" height="280px" />
    <h3>Title: {{ book.volumeInfo.title }}</h3>
    <h3 v-if="book.volumeInfo.authors">
      Author: {{ book.volumeInfo.authors[0] }}
    </h3>
    <h3>Publisher: {{ book.volumeInfo.publisher }}</h3>
  </div>
</template>

<script>
export default {
  name: "BookPage",

  data() {
    return {};
  },
  props: ["book", "id"],
  computed: {
    getImage() {
      return `http://books.google.com/books/content?id=${this.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;
    },
  },
};
</script>

<style lang="css" scoped></style>
