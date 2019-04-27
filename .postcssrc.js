// https://github.com/michael-ciniawsky/postcss-load-config

var tailwindcss = require('tailwindcss')
var autoprefixer = require('autoprefixer')
var purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  "plugins": [
    tailwindcss('./tailwind.js'),
    purgecss({
      content: ['index.html', 'src/**/*.vue']
    }),
    autoprefixer()
  ]
}
