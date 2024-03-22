<script>
  import { ImgSpam, randint } from '.'

  export let a = 5
  export let b = 5
</script>

{#each new Array(randint(b) + a) as _}
  <ImgSpam
    alt="test"
    src={randint(2)
      ? `https://source.unsplash.com/random/${(randint(12) + 1) * 50}x${(randint(12) + 1) * 50}#${Date.now()}`
      : `https://picsum.photos/${(randint(12) + 1) * 50}/${(randint(12) + 1) * 50}`}
  />
{/each}
