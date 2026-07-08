import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/countries',
        destination: '/destinos',
        permanent: true,
      },
      {
        source: '/countries/:id',
        destination: '/destinos/:id',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter'],
  },
});

export default withMDX(nextConfig);
