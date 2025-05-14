import type { NextConfig } from "next";
import remarkGfm from 'remark-gfm'
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true
  }
  /* config options here */
};


const options: Options = {
  theme: "one-dark-pro",
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
