// Get random org: dp = 0%, fftf = 100%
function getRandomOrg() {
  // NOTE: Enable percentages if desired
  // var coinToss = Math.random();
  if (false) {
    return 'dp';
  }
  else {
    return 'fftf';
  }
}

// Set org on route change
export default ({ app }) => {
  app.router.afterEach((to, from) => {
    const org = to.query.org || to.query.source || getRandomOrg()
    app.store.commit('setOrg', org)
  })
}
