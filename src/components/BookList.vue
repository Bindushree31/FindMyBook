<template>
  <div>
    <SearchBar @searchB="searchBook"></SearchBar>

    <span v-if="total == 0" class="message">No Books Found</span>

    <div class="container">
      <div class="box" v-for="book in books" :key="book.id">
        <BookPage :book="book" :id="book.id"></BookPage>
      </div>
    </div>
  </div>
</template>

<script>
import BookPage from "./BookPage.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "BookList",

  data() {
    return {
      books: [],
      query: "",
      error: "",
      total: 1,
    };
  },
  components: {
    BookPage,
    SearchBar,
  },
  methods: {
    searchBook(value) {
      if (value == "" || value == null) {
        this.error = "Please enter a book name to search.";
      } else {
        this.query = value;

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`)
          .then((res) => res.json())
          .then((data) => {
            this.books = data.items;
            this.fetch = true;
            this.total = data.totalItems;
          });

        this.error = "";
      }
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
  grid-template-columns: repeat(5, 1fr);
}
.box {
  margin: 30px 0px 30px 5px;
  background-color: #91d1e3;
  width: 270px;
  padding: 5px;
  box-shadow: 0 0 10px black;
  position: relative;
}
img {
  width: 100%;
}
</style>
