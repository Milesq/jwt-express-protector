import { promisify } from 'util'
import {
  src,
  series,
  dest,
  TaskFunction,
  watch,
} from 'gulp'
import nodemon from 'gulp-nodemon'
import tsc from 'gulp-typescript'
import rimrafCb from 'rimraf'
const rimraf = promisify(rimrafCb)

const DIST = 'dist'
const MAIN_EXAMPLE_FILE = 'example.js'
const sourceFiles = 'src/**/*.[tj]s'
const typesOut = 'types'

const tsProject = tsc.createProject('./tsconfig.json')

// ████████╗ █████╗ ███████╗██╗  ██╗███████╗
// ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝
//    ██║   ███████║███████╗█████╔╝ ███████╗
//    ██║   ██╔══██║╚════██║██╔═██╗ ╚════██║
//    ██║   ██║  ██║███████║██║  ██╗███████║
//    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝

export async function clean(): Promise<void> {
  await rimraf(DIST)
  await rimraf(typesOut)
}

export const build: TaskFunction = function build() {
  const tsResult = src(sourceFiles).pipe(tsProject())

  tsResult.dts.pipe(dest(typesOut))

  return tsResult.pipe(dest(DIST))
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
