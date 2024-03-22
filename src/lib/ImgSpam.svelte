<script>
  import { randint } from '.'

  export let alt
  export let src

  let el

  let txt = ''
</script>

<figure class="relative max-h-3/10 max-w-3/10">
  <img
    bind:this={el}
    class="max-full"
    class:invert={randint(2)}
    {alt}
    crossorigin="anonymous"
    loading="lazy"
    {src}
    on:load={() => {
      const cvs = document.createElement('canvas')
      cvs.width = el.width
      cvs.height = el.height
      cvs.getContext('2d').drawImage(el, 0, 0)
      txt = cvs.toDataURL()
    }}
  />
  <figcaption class="absolute inset-0 overflow-auto text-gray">
    {txt}
  </figcaption>
</figure>
