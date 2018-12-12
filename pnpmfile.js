function readPackage(pkg, context) {
  // Override the manifest of foo@1 after downloading it from the registry
  // Replace all dependencies with bar@2
  if (pkg.name === '@nuxt/vue-renderer' && pkg.version.startsWith('2.3.')) {
    pkg.dependencies['vue-server-renderer'] = '^2.5.21'
    pkg.dependencies['vue-template-compiler'] = '^2.5.21'
    context.log(
      'vue@2.5.17 => vue@^2.5.21 in dependencies of @nuxt/vue-renderer'
    )
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
