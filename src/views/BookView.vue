<template>
  <div>
    <h1>Stephen King's novels</h1>
    <CDataTable
      striped
      fixed
      :loading="isLoading"
      sorter
      :itemsPerPage=10
      itemsPerPageSelect
      pagination
      columnFilter
      :columnFilterValue.sync="filter"
      tableFilter
      :tableFilterValue.sync="tableFilter"
      :fields="[{key: '#', filter: false}, 'title', 'authors',
          {key: 'publishedDate', filter: false}, 'categories', {key: 'price', filter: false}]"
      :items="books"
      v-on:update:table-filter-value="debouncedLoadBooks"
      v-on:update:column-filter-value="debouncedLoadBooks"
    >
      <template ##="{item, index}">
        <td>
          {{ index + 1 }}
        </td>
      </template>
      <template #title="{item}">
        <td>
          <a :href="item.canonicalVolumeLink">
            {{ item.title }}
          </a>
        </td>
      </template>
      <template #authors="{item}">
          <td>
          {{ Array.isArray(item.authors) ? item.authors.join(', ') : '' }}
          </td>
      </template>
      <template #categories="{item}">
          <td>
          {{ Array.isArray(item.categories) ? item.categories.join(', ') : '' }}
          </td>
      </template>
      <template #price="{item}">
        <td style="white-space: nowrap">
          <span v-if="item.saleInfo.saleability === 'FREE'">
            <span v-if="item.saleInfo.buyLink">
              <a :href='item.saleInfo.buyLink'>Free</a>
            </span>
            <span v-else>Free</span>
          </span>
          <span v-else-if="item.saleInfo.saleability === 'NOT_FOR_SALE'">
            Not For Sale
          </span>
          <span v-else>
            <span v-if="item.saleInfo.buyLink">
              <a :href='item.saleInfo.buyLink'>
                {{ item.saleInfo.retailPrice.amount + ' '
                    + item.saleInfo.retailPrice.currencyCode }}
              </a>
            </span>
            <span v-else>
              {{ item.saleInfo.retailPrice.amount + ' ' + item.saleInfo.retailPrice.currencyCode }}
              </span>
          </span>
        </td>
      </template>
    </CDataTable>
  </div>
</template>

<script>

import $ from 'jquery';
import _ from 'lodash';

export default {
  name: 'book',
  data: () => ({
    isLoading: true,
    books: [],
    filter: {},
    tableFilter: '',
  }),
  mounted() {
    this.debouncedLoadBooks();
  },
  methods: {
    loadBooks() {
      this.isLoading = true;
      $.ajax({
        url: `https://www.googleapis.com/books/v1/volumes?maxResults=40&&q=${this.tableFilter ? `${this.tableFilter} ` : ''} ${this.filter.author ? `inauthor:${this.filter.author}` : 'Stephen King'} ${this.filter.title ? `intitle:${this.filter.title}` : ''} ${this.filter.categories ? `subject:${this.filter.categories}` : ''}`,
        success: (res) => {
          this.isLoading = false;
          if (Array.isArray(res.items)) {
            this.books = res.items.map(i => ({ ...i, ...i.volumeInfo }));
          } else this.books = [];
        },
        error: () => {
          this.isLoading = false;
        },
      });
    },
  },
  created() {
    this.debouncedLoadBooks = _.debounce(this.loadBooks, 500);
  },
};
</script>
