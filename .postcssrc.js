// https://github.com/michael-ciniawsky/postcss-load-config

var tailwindcss = require('tailwindcss')
var autoprefixer = require('autoprefixer')
var purgecss = require('@fullhuman/postcss-purgecss')

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  "plugins": [
    tailwindcss('./tailwind.js'),
    purgecss({
      content: ['index.html', 'src/**/*.vue'],
      extractors: [
        {
          extractor: TailwindExtractor,

          // Specify the file extensions to include when scanning for
          // class names.
          extensions: ["html", "js", "php", "vue"]
        }
      ]
    }),
    autoprefixer()
  ]
}
