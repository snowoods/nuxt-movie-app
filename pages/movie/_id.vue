<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="3"
        :z-index="9"
        fixed />
    </template>
    <div
      v-else
      class="movie-details">
      <div
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster, 700)})` }"
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/refs/heads/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  async asyncData({ store, params }) {
    // SSR 렌더링 전
    await store.dispatch('movie/searchMovieWithId', {
      id: params.id
    })
    return { // 렌더링 시작
      imageLoading: true
    }
  },
  // data() {
  //   return {
  //     imageLoading: true
  //   }
  // },
  computed: {
    ...mapState('movie', [
      'theMovie',
      'loading'
    ])
  },
  created() {
    // 직접 호출이 직관적이다.
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt123456
      id: this.$route.params.id // payload
    })

    // mapActions를 봐야 호출 대상을 확인 할 수 있다.
    // this.searchMovieWithId({
    //   // movie/tt123456
    //   id: this.$route.params.id // payload
    // })
  },
  methods: {
    // ...mapActions('movie', [
    //   'searchMovieWithId'
    // ]),
    requestDiffSizeImage(url, size = 700) {
      if (!url | url === 'N/A') {
        this.imageLoading = false
        return ''
      }

      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false
        })
      return src
    }
  },
  head() {
    return {
      // nuxt.config.js head 하위의 meta 접근
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt Movie App' },
        { hid: 'og:title', property: 'og:title', content: this.theMovie.Title },
        { hid: 'og:description', property: 'og:description', content: this.theMovie.Plot },
        { hid: 'og:image', property: 'og:image', content: this.theMovie.Poster },
        { hid: 'og:url', property: 'og:url', content: `${process.env.CLIENT_URL}${this.$route.fullPath}` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
}

.skeletons {
  display: flex;

  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
  }

  .specs {
    flex-grow: 1;
  }

  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;

    &.title {
      width: 80%;
      height: 70px;
    }

    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }

    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }

    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}

.movie-details {
  display: flex;
  color: $gray-600;

  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .specs {
    flex-grow: 1;

    .title {
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }

    .labels {
      color: $primary;

      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }

        &:last-child::after {
          display: none;
        }
      }
    }

    .plot {
      margin-top: 20px;
    }

    .ratings {
      .rating-wrap {
        display: flex;

        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;

          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }

    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }

  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  }

  @include media-breakpoint-down(lg) {
    display: block;

    .poster {
      margin-bottom: 40px;
    }
  }

  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }

      .ratings {
        .rating-wrap {
          display: block;

          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>