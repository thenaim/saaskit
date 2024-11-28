/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'], // https://sass-lang.com/documentation/breaking-changes/legacy-js-api/#silencing-warnings
  },
};

export default nextConfig;
