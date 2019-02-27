var app = new Vue({
  el: '#app',
  data: {
    apiKey: '7193c4218fce9d20f4890f70c6b4fbe51e036dcbc70b5bc70732bd7c85dae0af',
    searchField: '',
    searchFieldDisplay: '',
    imagesArr: [],
    selectedImg: '',
    backgroundImg: '',
    images: false,
    describe: false,
    imageDescription: ''
  },
  mounted: function () {
    this.searchFieldDisplay = 'Micro Worlds'
    let url = `https://api.unsplash.com/collections/573009/photos?client_id=${this.apiKey}`
    this.fetchImagesFromApi(url)
  },

  methods: {
    submitSearch: function () {
      this.imageDescription = ''
      this.images = true
      let url = `https://api.unsplash.com/search/photos?query=${this.searchField}&client_id=${this.apiKey}`
      this.fetchImagesFromApi(url)
      this.searchFieldDisplay = this.searchField
      this.searchField = ''
    },

    showNoResultsError: function () {
      this.describe = true
      this.imageDescription = 'Sorry, there weren\'t any results'
      this.searchFieldDisplay = this.searchField
      this.imagesArr = []
    },

    onCollectionImgClick: function (event) {
      const imgSrc = event.target.src.replace('&h=100', '&auto=compress')
      this.selectedImg = imgSrc
    },

    fetchImagesFromApi: function (url) {
      this.describe = true
      this.imageDescription = 'loading...'
      fetch(url)
        .then(response => response.json())
        .then(images => images.results ? 
                          images.results[0] ? this.imagesArr = images.results
                            : this.showNoResultsError() 
                          : this.imagesArr = images)
        .then(() => this.selectedImg = this.imagesArr[0].urls.raw)
        .then(() => this.loading = '')
        .then(() => this.describe = false)
        .catch(error => console.log(error))     
    },

    updateImageDescription: function (event) {
      this.describe = true
      this.imageDescription = event.target.alt
    }
  }
})
