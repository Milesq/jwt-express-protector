import { promisify } from 'util'
import { src, series, dest } from 'gulp'
import babel from 'gulp-babel'
import rimraf from 'rimraf'

const DIST = 'dist/'

async function clean() {
  await promisify(rimraf)(DIST)
}

function build() {
  return src('src/**/*.[tj]s')
    .pipe(babel())
    .pipe(dest(DIST))
}

// function dev() {}

export { build, /* dev, */ clean }
export default series(clean, build)
