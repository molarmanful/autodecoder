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

  onMount(() => {
    for (let c of document.querySelectorAll('*:not([data-tag])')) {
      let t = c.tagName
      if (t) {
        let a = document.createElement('span')
        a.dataset.tag = ''
        a.innerText = `<${t}${
          c.hasAttributes()
            ? ' ' +
              [...c.attributes].map(a => a.name + '=' + JSON.stringify(a.value))
                .join` `
            : ''
        }>`

        let b = document.createElement('span')
        b.dataset.tag = ''
        b.innerText = `</${t}>`

        if (ignore.includes(t)) {
          let aa = document.createElement('div')
          c.after(aa)
          aa.prepend(a, c)
          if (c.src) {
            fetch(c.src).then(async res => {
              let txt = await res.text()
              aa.append(txt)
              if (nonvoid.includes(t)) aa.append(b)
            })
          } else if (nonvoid.includes(t)) aa.append(b)
        } else {
          c.prepend(a)
          c.append(b)
        }
      }
    }
    scrollTo(0, 0)
  })
</script>

<svelte:head>
  <title>autodecoder</title>
</svelte:head>

<h1>test</h1>
<img alt="test" src="https://i.imgur.com/w8pK4DY.png" />

<style>
  :global(*:not(meta, script)) {
    @apply flex flex-wrap flex-items-center border-1 border-solid border-gray m-1 p-1;
  }

  :global([data-tag]) {
    @apply text-gray;
  }

  :root {
    @apply whitespace-pre-wrap bg-black text-white;
    font-family: monospace;
  }
</style>
