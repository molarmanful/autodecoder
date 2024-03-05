<script>
  import { onMount } from 'svelte'

  import { browser } from '$app/environment'

  let ignore = [
    'AREA',
    'BASE',
    'BR',
    'COL',
    'COMMAND',
    'EMBED',
    'HR',
    'IMG',
    'INPUT',
    'KEYGEN',
    'LINK',
    'META',
    'PARAM',
    'SOURCE',
    'TRACK',
    'WBR',
    // 'STYLE',
    // 'SCRIPT',
  ]
  // let nonvoid = ['STYLE', 'SCRIPT']
  let g_t = 1

  if (browser) {
    history.scrollRestoration = 'manual'
  }

  let deco = () => {
    for (let el of document.querySelectorAll('*')) {
      let t = el.tagName
      if (t) {
        el.dataset.before = `<${t.toLowerCase()}${[...el.attributes].map(a =>
          ['data-before', 'data-after'].includes(a.name)
            ? ''
            : ` ${a.name}=${JSON.stringify(a.value)}`
        ).join``}>`

        if (!ignore.includes(t) && !el.dataset.after) {
          el.dataset.after = `</${t.toLowerCase()}>`
        }
      }
    }
  }

  onMount(() => {
    scrollTo(0, 0)

    let f = () => {
      g_t--
      if (g_t <= 0) {
        deco()
        g_t = 10
      }
      requestAnimationFrame(() => {
        setTimeout(f, 999)
      })
    }
    f()
  })
</script>

<svelte:head>
  <title>barebones</title>
</svelte:head>

<h1>loading...</h1>
<img alt="test" src="https://i.imgur.com/w8pK4DY.png" />
<div class="fixed right-0 top-0 text-red">{g_t}</div>

<style>
  :global(*, [data-before]::before, [data-after]::after) {
    @apply flex flex-wrap flex-items-center border-1 border-solid border-gray m-1 p-1 whitespace-pre-wrap break-all;
  }

  :global([data-before]::before, [data-after]::after) {
    @apply text-gray b-1 b-solid b-gray;
  }

  :global([data-before]::before) {
    content: attr(data-before);
  }

  :global([data-after]::after) {
    content: attr(data-after);
  }

  :global(x-tag) {
    @apply text-gray;
  }

  :global(img) {
    @apply max-screen;
  }

  :root {
    @apply bg-black text-white;
    font-family: monospace;
  }
</style>
