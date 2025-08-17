/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    // Add file-loader for font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts/',
        },
      },
    });

    return config;
  },
}

module.exports = nextConfig;
