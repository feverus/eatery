const path = require('path')

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '~': resolvePath('src'),
      '~Api': resolvePath('src/api'),
      '~Pages': resolvePath('src/pages'),
      '~Store': resolvePath('src/store'),
      '~Components': resolvePath('src/components'),
    },
  },
}