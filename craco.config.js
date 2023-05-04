const path = require('path')

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '~': resolvePath('src'),
      '~Store': resolvePath('src/store'),
      '~Api': resolvePath('src/api'),
      '~Components': resolvePath('src/components'),
    },
  },
}