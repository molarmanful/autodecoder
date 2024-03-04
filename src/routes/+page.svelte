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
    'STYLE',
    'SCRIPT',
  ]
  let nonvoid = ['STYLE', 'SCRIPT']

  if (browser) {
    history.scrollRestoration = 'manual'
  }

  let deco = () => {
    for (let el of document.querySelectorAll('*')) {
      let t = el.tagName
      if (t == 'X-TAG') {
        el.remove()
      } else if (t == 'X-NODE') {
        el.replaceWith(el.querySelector('[data-orig]'))
      } else if (t) {
        let a = document.createElement('x-tag')
        a.innerText = `<${t}${
          el.hasAttributes()
            ? ' ' +
              [...el.attributes].map(
                a => a.name + '=' + JSON.stringify(a.value)
              ).join` `
            : ''
        }>`

        let b = document.createElement('x-tag')
        b.innerText = `</${t}>`

        if (ignore.includes(t)) {
          let aa = document.createElement('x-node')
          el.dataset.orig = ''
          el.before(aa)
          aa.prepend(a, el)
          let src = el.src || el.href
          if (src) {
            fetch(src).then(async res => {
              let txt = await res.text()
              aa.append(txt)
              if (nonvoid.includes(t)) aa.append(b)
            })
          } else if (nonvoid.includes(t)) aa.append(b)
        } else {
          el.prepend(a)
          el.append(b)
        }
      }
    }
  }

  onMount(() => {
    scrollTo(0, 0)
    let f = () => {
      deco()
      requestAnimationFrame(() => {
        setTimeout(f, 1e4)
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

<style>
  :global(*) {
    @apply flex flex-wrap flex-items-center border-1 border-solid border-gray m-1 p-1 whitespace-pre-wrap break-all;
  }
  :global(meta, script, link) {
    @apply hidden;
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
