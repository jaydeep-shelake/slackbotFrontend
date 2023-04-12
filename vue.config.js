const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa:{
    workboxPluginMode: "InjectManifest",
        workboxOptions:{
            swSrc:"./src/services/worker.js",
        }
  }
})
