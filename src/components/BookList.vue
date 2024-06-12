<template>
  <div>
    <div class="containerSearch">
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
    <div v-if="loading">Loading...</div>
    <!-- <span v-if="loading === false && books.length === 0">No Books found</span>-->
    <div v-if="books.length != 0" class="container">
      <div class="box" v-for="book in books" :key="book.id">
        <BookPage
          :book="book"
          :id="book.id"
          :searchQuery="searchQuery"
          :searchType="searchType"
        ></BookPage>
      </div>
    </div>
  </div>
</template>

<script>
import BookPage from "./BookPage.vue";

export default {
  name: "BookList",

  data() {
    return {
      books: [],
      searchQuery: "",
      searchType: "smart",
      loading: false,
    };
  },
  // created() {
  //   this.searchBooks();
  // },
  components: {
    BookPage,
  },
  methods: {
    searchBooks() {
      this.loading = true;
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          if (this.searchType === "title") {
            this.books = data.items.filter(
              (book) =>
                book.volumeInfo.title &&
                book.volumeInfo.title
                  .toLowerCase()
                  .includes(this.searchQuery.toLowerCase())
            );
          } else if (this.searchType === "author") {
            this.books = data.items.filter(
              (book) =>
                book.volumeInfo.authors &&
                book.volumeInfo.authors.toString() &&
                book.volumeInfo.authors
                  .toString()
                  .toLowerCase()
                  .includes(this.searchQuery.toLowerCase())
            );
          } else if (this.searchType === "publisher") {
            this.books = data.items.filter(
              (book) =>
                book.volumeInfo.publisher &&
                book.volumeInfo.publisher
                  .toLowerCase()
                  .includes(this.searchQuery.toLowerCase())
            );
          } else {
            this.books = data.items;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.error = "An error occurred. Please try again.";
          this.loading = false;
        });

      this.error = "";
    },
  },
  computed: {
    img: function () {
      return `http://books.google.com/books/content?id=${this.books.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
    },
  },
};
</script>

<style lang="css" scoped>
.message {
  font-size: 20px;
  color: red;
  margin-top: 20px;
}
.container {
  margin: 0 auto;
  height: inherit;
  display: grid;
  grid-gap: 1.3em;
  padding: 10px;
  grid-template-columns: repeat(4, 1fr);
}
.box {
  margin: 30px 0px 30px 5px;
  background-color: #91d1e3;
  width: 260px;
  padding: 5px;
  box-shadow: 0 0 10px black;
  position: relative;
}
img {
  width: 100%;
}

.select {
  border: 3px solid #91d1e3;
}
.containerSearch {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input {
  border: 3px solid #91d1e3;
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
  border: 1px solid #91d1e3;
  background: #91d1e3;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: medium;
}
.searchBar {
  display: flex;
}
</style>
