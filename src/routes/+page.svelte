<script>
  import { onMount } from 'svelte'

  import { browser } from '$app/environment'
  import { ImgSpam } from '$lib'

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
  ]
  let g_t = 0

  if (browser) {
    history.scrollRestoration = 'manual'
  }

  let randint = n => 0 | (Math.random() * n)
  let randitem = a => a[randint(a.length)]
  let randchar = () =>
    randitem('0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')

  let deco = () => {
    for (let el of document.querySelectorAll('*')) {
      let t = el.tagName
      if (t) {
        el.dataset.before = `<${t.toLowerCase()}${[...el.attributes].map(a =>
          ['data-before', 'data-after'].includes(a.name)
            ? ''
            : ` ${a.name}=${JSON.stringify(a.value)}`
        ).join``}>`

        let src = el.src || el.href
        if (src) {
          if (t == 'LINK') {
            fetch(src).then(async r => {
              el.dataset.value = await r.text()
            })
          } else if (t == 'SCRIPT') {
            fetch(src).then(async r => {
              el.textContent = await r.text()
            })
          }
        }

        if (!ignore.includes(t) && !el.dataset.after) {
          el.dataset.after = `</${t.toLowerCase()}>`
        }
      }
    }

    document.head.style.top = (randint(2) - 1) * 2 + 'px'
    document.head.style.left = (randint(2) - 1) * 2 + 'px'
  }

  onMount(() => {
    scrollTo(0, 0)

    let f = () => {
      g_t--
      if (g_t < 0) {
        deco()
        g_t = 5
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

<h1>all i have are</h1>
<h1>BONES</h1>
<ImgSpam alt="test" src="https://i.imgur.com/w8pK4DY.png" />
{#each new Array(randint(70) + 30) as _}
  <ImgSpam
    alt="test"
    src="https://picsum.photos/{randint(800)}/{randint(800)}"
  />
{/each}
<div class="fixed right-0 top-0 text-red">{g_t}</div>

<style>
  :global(*, [data-before]::before, [data-after]::after) {
    @apply flex flex-wrap flex-items-center flex-justify-center b-1 b-solid b-gray m-1 p-1 whitespace-pre-wrap break-all mix-blend-difference;
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

  :root {
    @apply bg-black text-white;
    font-family: monospace;
  }

  :global(head) {
    @apply absolute top-0 left-0 z-10 pointer-events-none text-gray;
  }

  :global(x-tag) {
    @apply text-gray;
  }

  :global(img) {
    @apply max-screen;
  }
</style>
