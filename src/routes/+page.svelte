<script>
  import { onMount } from 'svelte'

  import { browser } from '$app/environment'
  import { ImgSpam, SpamSet, randint, randitem } from '$lib'

  const ignore = [
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

  let mouse = { x: 0, y: 0 }

  if (browser) {
    history.scrollRestoration = 'manual'
  }

  const deco = () => {
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

  const wreck = () => {
    const acts = [
      () => {},
      () => {
        location.reload()
      },
      () => {
        scrollTo(0, randint(document.documentElement.scrollHeight))
      },
      el => {
        el.remove()
      },
      el => {
        el.after(el)
      },
      el => {
        el.after(el.cloneNode(true))
      },
      el => {
        el.append(el.cloneNode(true))
      },
    ]
    randitem(acts)(
      randitem(document[randitem(['head', 'body'])].querySelectorAll('*'))
    )
  }

  onMount(() => {
    scrollTo(0, 0)

    const f = () => {
      g_t--
      if (g_t < 0) {
        wreck()
        deco()
        g_t = 3
      }
      requestAnimationFrame(() => {
        setTimeout(f, 999)
      })
    }
    f()
  })
</script>

<svelte:window
  on:error={e => {
    console.error(e)
    location.reload()
  }}
  on:mousemove={e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }}
/>

<svelte:head>
  <title>barebones</title>
</svelte:head>

<h1>all i have are</h1>
<h1>BONES</h1>
<ImgSpam alt="test" src="https://i.imgur.com/w8pK4DY.png" />
<SpamSet />
<p>{'BONES '.repeat(1000)}</p>
<SpamSet />
<p class="whitespace-initial">
  Nasal Lacrimal Inferior Nasal Concha Maxillary Zygomatic Temporal Palatine
  Parietal Malleus Incus Stapes Frontal Ethmoid Vomer Sphenoid Mandible
  Occipital Rib 1 Rib 2 Rib 3 Rib 4 Rib 5 Rib 6 Rib 7 Rib 8 (False) Rib 9
  (False) Rib 10 (False) Rib 11 (Floating) Rib 12 (Floating) Hyoid Sternum
  Cervical Vertebrae 1 (atlas) C2 (axis) C3 C4 C5 C6 C7 Thoracic Vertebrae 1 T2
  T3 T4 T5 T6 T7 T8 T9 T10 T11 T12 Lumbar Vertebrae 1 L2 L3 L4 L5 Sacrum Coccyx
  Scapula Clavicle Humerus Radius Ulna Scaphoid Lunate Triquetrum Pisiform
  Hamate Capitate Trapezoid Trapezium Metacarpal 1 Proximal Phalange 1 Distal
  Phalange 1 Metacarpal 2 Proximal Phalange 2 Middle Phalange 2 Distal Phalange
  2 Metacarpal 3 Proximal Phalange 3 Middle Phalange 3 Distal Phalange 3
  Metacarpal 4 Proximal Phalange 4 Middle Phalange 4 Distal Phalange 4
  Metacarpal 5 Proximal Phalange 5 Middle Phalange 5 Distal Phalange 5 Hip
  (Ilium, Ischium, Pubis) Femur Patella Tibia Fibula Talus Calcaneus Navicular
  Medial Cuneiform Middle Cuneiform Lateral Cuneiform Cuboid Metatarsal 1
  Proximal Phalange 1 Distal Phalange 1 Metatarsal 2 Proximal Phalange 2 Middle
  Phalange 2 Distal Phalange 2 Metatarsal 3 Proximal Phalange 3 Middle Phalange
  3 Distal Phalange 3 Metatarsal 4 Proximal Phalange 4 Middle Phalange 4 Distal
  Phalange 4 Metatarsal 5 Proximal Phalange 5 Middle Phalange 5 Distal Phalange
  5
</p>
<SpamSet />
<h1 class="whitespace-initial">sans from undertale</h1>
<SpamSet />
<div class="fixed right-0 top-0 text-red">{g_t}</div>
{#if g_t <= 0}
  <div
    style:left="{randint(100) - 50}%"
    style:top="{randint(100) - 50}%"
    class="fixed text-9xl text-red"
  >
    {'RUN'.repeat(1000)}
  </div>
{/if}

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
