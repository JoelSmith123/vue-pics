var app = new Vue({
  el: '#app',
  data: {
    apiKey: '7193c4218fce9d20f4890f70c6b4fbe51e036dcbc70b5bc70732bd7c85dae0af',
    searchField: '',
    searchFieldDisplay: '',
    imagesArr: [],
    selectedImg: '',
    images: false
  },
  mounted: function () {
    this.searchFieldDisplay = 'Micro Worlds'
    let url = `https://api.unsplash.com/collections/573009/photos?client_id=${this.apiKey}`
    this.fetchImagesFromApi(url)
  },

  methods: {
    submitSearch: function () {
      this.images = true
      let url = `https://api.unsplash.com/search/photos?query=${this.searchField}&client_id=${this.apiKey}`
      this.fetchImagesFromApi(url)
      this.searchFieldDisplay = this.searchField
      this.searchField = ''
    },

    onCollectionImgClick: function (event) {
      const imgSrc = event.target.src.replace('&h=100', '')
      this.selectedImg = imgSrc
    },

    fetchImagesFromApi: function (url) {
      fetch(url)
        .then(response => response.json())
        .then(images => images.results ? this.imagesArr = images.results : this.imagesArr = images)
        .then(() => this.selectedImg = this.imagesArr[0].urls.raw)
        .catch(error => console.log(error))     
    }
  }
})
