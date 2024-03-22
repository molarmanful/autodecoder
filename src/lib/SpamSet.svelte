<script>
  import { ImgSpam, counter, randint } from '.'

  export let a = 5
  export let b = 5
</script>

{#each new Array(randint(b) + a) as _}
  <ImgSpam
    alt="test"
    src={`https://source.unsplash.com/random/${(randint(6) + 1) * 100}x${(randint(6) + 1) * 100}#${Date.now()}`}
  />
{/each}
