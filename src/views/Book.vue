<template>
  <div>
    <h1>Stephen King's novels</h1>
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <div v-for="book in books" :key="book.id" v-text="book.volumeInfo.title">s</div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery';

export default {
  name: 'book',
  data: () => ({
    isLoading: true,
    books: [],
  }),
  mounted() {
    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes?q=inauthor=Stephen+King',
      success: res => {
        this.books = res.items;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
      }
    });
  },
};
</script>
