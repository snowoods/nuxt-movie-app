<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"        
        class="nav-item">
        <NuxtLink
          :to="nav.href"
          active-class="active" 
          :class="{ active: isMatch(nav.path) }"
          class="nav-link"
          exact>
          {{ nav.name }}
        </NuxtLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/ // '/movie'로 시작하는 모든 주소를 의미하는 정규 표현식
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    // about 모듈에 있는 image, name 가져온다.
    // ex) image = this.$store.state.about.image
    ...mapState('about', [
      'image',
      'name'
    ])
  },
  methods: {
    isMatch(path) {
      if (!path) return false
      // console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      console.log('!!!')
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 10%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>