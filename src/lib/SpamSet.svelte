<script>
  import { ImgSpam, randitem, randint } from '.'

  export let a = 5
  export let b = 5

  const rsz = () => (randint(12) + 1) * 50
</script>

{#each new Array(randint(b) + a) as _}
  <ImgSpam
    alt="test"
    src={randitem([
      `https://source.unsplash.com/random/${rsz()}x${rsz()}#${Date.now()}`,
      `https://source.unsplash.com/random/${rsz()}x${rsz()}?bones,skeleton#${Date.now()}`,
      `https://picsum.photos/${rsz()}/${rsz()}`,
    ])}
  />
{/each}
