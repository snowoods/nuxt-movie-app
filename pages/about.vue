<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    // about 모듈에 있는 image, name 가져온다.
    // ex) image = this.$store.state.about.image
    ...mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  },
  head() {
    return {
      // nuxt.config.js head 하위의 meta 접근
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt Movie App' },
        { hid: 'og:title', property: 'og:title', content: this.name },
        { hid: 'og:description', property: 'og:description', content: this.email },
        { hid: 'og:image', property: 'og:image', content: this.image },
        { hid: 'og:url', property: 'og:url', content: `${process.env.CLIENT_URL}${this.$route.fullPath}` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 10%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>