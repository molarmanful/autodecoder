import adapter from '@sveltejs/adapter-static'

export default {
  kit: {
    adapter: adapter(),
    inlineStyleThreshold: Number.MAX_SAFE_INTEGER,
  },
}
