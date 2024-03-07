<script>
  import { ImgSpam, randint } from '.'

  export let a = 5
  export let b = 5
</script>

{#each new Array(randint(b) + a) as _}
  <ImgSpam
    alt="test"
    src="https://picsum.photos/{randint(800)}/{randint(800)}"
  />
{/each}
