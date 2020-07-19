import { promisify } from 'util'
import {
  src,
  series,
  dest,
  TaskFunction,
  watch,
} from 'gulp'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'
import rimraf from 'rimraf'

const DIST = 'dist'
const MAIN_EXAMPLE_FILE = 'example.js'
const sourceFiles = 'src/**/*.[tj]s'

// ████████╗ █████╗ ███████╗██╗  ██╗███████╗
// ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
//    ██║   ███████║███████╗█████╔╝ ███████╗
//    ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
//    ██║   ██║  ██║███████║██║  ██╗███████║
//    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝

export async function clean(): Promise<void> {
  await promisify(rimraf)(DIST)
}

export const build: TaskFunction = () => {
  return src(sourceFiles).pipe(babel()).pipe(dest(DIST))
}

const watchFiles: TaskFunction = done => {
  watch(sourceFiles, build)

  nodemon({
    script: `${DIST}/${MAIN_EXAMPLE_FILE}`,
    env: { NODE_ENV: 'development' },
    ext: 'js ts',
    // @ts-ignore
    done,
  })
}

export const dev = series(build, watchFiles)

export default series(clean, build)
