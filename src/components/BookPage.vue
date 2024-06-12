<template>
  <div>
    <img :src="getImage" :alt="getImage" width="260px" height="280px" />
    <h3 v-if="book.volumeInfo.title">
      Title: <span v-html="highlightedTitleText"></span>
    </h3>
    <h3 v-if="book.volumeInfo.authors">
      Author: <span v-html="highlightedAuthorText"></span>
    </h3>
    <h3 v-if="book.volumeInfo.publisher">
      Publisher: <span v-html="highlightedPublisherText"></span>
    </h3>
  </div>
</template>

<script>
export default {
  name: "BookPage",

  data() {
    return {};
  },
  props: ["book", "id", "searchQuery", "searchType"],
  computed: {
    getImage() {
      return `http://books.google.com/books/content?id=${this.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;
    },
    highlightedTitleText() {
      if (this.searchType !== "title" && this.searchType !== "smart") {
        return this.book.volumeInfo.title;
      }

      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return this.book.volumeInfo.title.replace(
        regex,
        '<span style="background-color: #ffcc80">$1</span>'
      );
    },
    highlightedAuthorText() {
      if (this.searchType !== "author" && this.searchType !== "smart") {
        return this.book.volumeInfo.authors.toString();
      }

      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return this.book.volumeInfo.authors
        .toString()
        .replace(regex, '<span style="background-color: #ffcc80">$1</span>');
    },
    highlightedPublisherText() {
      if (this.searchType !== "publisher" && this.searchType !== "smart") {
        return this.book.volumeInfo.publisher;
      }

      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return this.book.volumeInfo.publisher.replace(
        regex,
        '<span style="background-color: #ffcc80">$1</span>'
      );
    },
  },
};
</script>

<style lang="css" scoped></style>
