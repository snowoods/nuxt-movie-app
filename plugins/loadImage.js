export default {
  install(Vue) {
    Vue.prototype.$loadImage = src => {
    return new Promise(resolve => {
      if (process.server) { // SSR
        resolve()
        return
      }
      const img = document.createElement('img')
      img.src = src
      img.addEventListener('load', () => {
        // 완료
        resolve()
      })
    })
    }
  }
}
// Vue 3.x
// export default {
//   install(app) {
//     app.config.globalProperties.$loadImage = src => {
//     return new Promise(resolve => {
//       if (process.server) { // SSR
//         resolve()
//         return
//       }
//       const img = document.createElement('img')
//       img.src = src
//       img.addEventListener('load', () => {
//         // 완료
//         resolve()
//       })
//     })
//     }
//   }
// }