<template>
  <div class="container">
    <div class="searchBar">
      <input
        class="input"
        v-model="searchQuery"
        type="text"
        placeholder="Enter title, author, or publisher"
      />
      <select v-model="searchType" class="select">
        <option value="smart">SmartSearch</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>
      <button class="button" @click="searchBooks()">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",

  data() {
    return {
      searchQuery: "",
      searchType: "smart",
    };
  },
  methods: {
    searchBooks() {
      this.$router.push({
        path: "/result",
        query: { q: this.searchQuery, type: this.searchType },
      });
    },
  },
};
</script>

<style lang="css" scoped>
.select {
  border: 3px solid #cc6300;
}
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input {
  border: 3px solid #cc6300;
  border-right: none;
  padding: 5px 10px 5px 10px;
  height: 50px;
  width: 40vw;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: black;
  font-size: large;
}

.button {
  border: 1px solid #cc6300;
  background: #cc6300;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: medium;
}
.searchBar {
  display: flex;
}
</style>
