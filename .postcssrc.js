// https://github.com/michael-ciniawsky/postcss-load-config

var tailwindcss = require('tailwindcss')
var autoprefixer = require('autoprefixer')

module.exports = {
  "plugins": [
    tailwindcss('./tailwind.js'),
    autoprefixer()
  ]
}
