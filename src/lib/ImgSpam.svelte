<script>
  export let alt
  export let src
</script>

<figure class="relative max-h-1/2 max-w-1/2">
  <img class="max-full" {alt} loading="lazy" {src} />
  <figcaption class="absolute inset-0 overflow-auto">
    {#await fetch(src) then r}{#await r.text() then txt}{txt}{/await}{/await}
  </figcaption>
</figure>
