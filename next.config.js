module.exports = {
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table"
  ],

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      }
    }

    // Add rule to handle ES modules
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      }
    })

    return config
  }
}
