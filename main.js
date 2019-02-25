var app = new Vue({
  el: '.search-form',
  data: {
    apiKey: '7193c4218fce9d20f4890f70c6b4fbe51e036dcbc70b5bc70732bd7c85dae0af',
    searchField: '',
    imagesArr: [],
  },
  methods: {
    submitSearch: function () {
      fetch(`https://api.unsplash.com/search/photos?query=${this.searchField}&client_id=${this.apiKey}`)
        .then(response => response.json())
        .then(images => this.imagesArr = images.results)
        .catch(error => console.log(error))
    },
  }
})
