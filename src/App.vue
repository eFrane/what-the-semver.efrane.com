<template>
  <div class="container mx-auto mt-8 bg-white shadow-lg border-1 p-4 opacity-75 rounded">
    <div class="mb-4 text-grey-dark font-sans text-xl text-center">
      <h1 class="w-full h-12 font-hairline ">what the semver?</h1>
    </div>

    <div class="text-center">
      <p class="w-1/2 mx-auto pb-1">
        Ever got confused with semantic versioning constraints in package manager files like
        <code>composer.json</code> or <code>package.json</code>? Type or paste any constraint
        below to see what versions (if available) might get installed.
      </p>

      <p class="w-1/2 mx-auto pb-1">
        You can also just drop your <code>package.json</code> or <code>composer.json</code>
        onto this page and get an analysis of all listed constraints. You may rest assured
        that dropped files will never leave your machine to accomplish this task.
      </p>
    </div>

    <div class="mt-16 mb-8">
      <single-constraint-checker
      v-if="packages === null"
    ></single-constraint-checker>
    <package-constraint-checker
      :packages="packages"
      @reset="packages = null"
      v-else
    >
    </package-constraint-checker>
    </div>
  </div>
</template>

<script>
import SingleConstraintChecker from './components/SingleConstraintChecker'
import PackageConstraintChecker from './components/PackageConstraintChecker'
import { PackageReader } from './PackageReader'

export default {
  name: 'App',
  data () {
    return {
      packages: null
    }
  },
  components: {
    SingleConstraintChecker,
    PackageConstraintChecker
  },

  methods: {
    handlePackageFile (packageFile) {
      if (!PackageReader.isValidFilename(packageFile.name)) {
        alert(`The provided file ${packageFile.name} cannot be processed.`)
        return
      }

      (new Promise(resolve => {
        const fr = new FileReader()
        fr.onload = ev => resolve(ev.target.result)
        fr.readAsText(packageFile)
      })).then(contents => {
        const packageReader = new PackageReader(packageFile.name, contents)
        this.packages = packageReader.getPackages()
      })
    }
  },

  mounted () {
    window.addEventListener('drop', ev => {
      ev.preventDefault()

      let packageFile = ''
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        packageFile = ev.dataTransfer.files[i]
        break
      }

      this.handlePackageFile(packageFile)
    })

    window.addEventListener('dragover', ev => ev.preventDefault())
  }
}
</script>
