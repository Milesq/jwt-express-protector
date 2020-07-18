import { promisify } from 'util'
import {
  src,
  series,
  dest,
  TaskFunction,
  parallel,
  watch,
} from 'gulp'
import babel from 'gulp-babel'
import rimraf from 'rimraf'

const DIST = 'dist/'
const sourceFiles = 'src/**/*.[tj]s'

// ████████╗ █████╗ ███████╗██╗  ██╗███████╗
// ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
//    ██║   ███████║███████╗█████╔╝ ███████╗
//    ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
//    ██║   ██║  ██║███████║██║  ██╗███████║
//    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝

export async function clean() {
  await promisify(rimraf)(DIST)
}

export const build: TaskFunction = () => {
  return src(sourceFiles).pipe(babel()).pipe(dest(DIST))
}

export const dev = parallel(build, function watchFiles() {
  watch(sourceFiles, build)
})

export default series(clean, build)
