<template>
  <div class="searchBar">
    <input
      class="input"
      v-model="bookname"
      type="text"
      placeholder="Search Books.."
    />
    <button class="button" @click="searchBooks()">Search</button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",

  data() {
    return {
      bookname: "",
    };
  },
  methods: {
    searchBooks() {
      let bookName = this.bookname;
      this.$emit("searchB", bookName);
    },
  },
};
</script>

<style lang="css" scoped>
.input {
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 5px;
  height: 30px;
  width: 300px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: black;
  font-size: medium;
}

.button {
  border: 1px solid #00b4cc;
  background: #00b4cc;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: medium;
}
.searchBar {
  display: flex;
  justify-content: center;
}
</style>
