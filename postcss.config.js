const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

let isPurging = false;
let purgeProsess = [
    tailwindcss('tailwind.config.js'),
    cssnano({
      preset: 'default'
    }),
    purgecss({
        content: ['./*html', './*js'],
        extractors: [
          {
            extractor: class TailwindExtractor {
              static extract(content) {
                return content.match(/[A-z0-9-:\/]+/g) || [];
              }
            },
            extensions: ['css', 'html']
          }
        ]
      }),
    autoprefixer
  ]

if (!isPurging) {
    purgeProsess = [
        tailwindcss('tailwind.config.js'),
        cssnano({
          preset: 'default'
        }),
        autoprefixer
      ]
}


module.exports = {
  plugins: purgeProsess
}