export class PackageReader {
  constructor (filename, contents) {
    this.filename = filename
    this.contents = JSON.parse(contents)
  }

  /**
   * Return an object with { packageName: constraint } mapping
   */
  getPackages () {
    let keys = []

    switch (this.filename) {
      case 'composer.json':
        keys = ['require', 'require-dev']
        break

      case 'package.json':
        keys = ['dependencies', 'devDependencies']
        break
    }

    let constraints = {}
    for (const constraintSourceKey of keys) {
      for (const constraintName in this.contents[constraintSourceKey]) {
        constraints[constraintName] = this.contents[constraintSourceKey][constraintName]
      }
    }

    return constraints
  }

  static isValidFilename (filename) {
    const validNames = [
      'package.json',
      'composer.json'
    ]

    for (const name of validNames) {
      if (filename === name) return true
    }

    return false
  }
}
