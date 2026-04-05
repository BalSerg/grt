export default async function (to, from, savedPosition) {
  const findEl = (hash, x) => {
    return document.querySelector(hash) ||
      new Promise((resolve) => {
        if (x > 50) {
          return resolve()
        }
        setTimeout(() => {
          resolve(findEl(hash, ++x || 1))
        }, 100)
      })
  }

  if (to.hash) {
    const el = await findEl(to.hash)
    if ('scrollBehavior' in document.documentElement.style) {
      return window.scrollTo({top: el.offsetTop, behavior: 'smooth'})
    } else {
      return window.scrollTo(0, el.offsetTop)
    }
  }
  if (from.path.includes('products') && (to.path.includes('catalog') || to.path.includes('palekh-watch'))) {
    return changePosition(savedPosition)
  }
  return {x: 0, y: 0}
}

const changePosition = savedPosition => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({...savedPosition, behavior: 'smooth'})
    }, 1000)
  })
}
