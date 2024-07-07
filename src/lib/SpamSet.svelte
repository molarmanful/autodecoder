<script>
  import { ImgSpam, randint, randitem } from '.'

  export let a = 5
  export let b = 5

  const rsz = () => (randint(12) + 1) * 50
</script>

{#each new Array(randint(b) + a) as _}
  <ImgSpam
    alt="test"
    src="{randitem([
      // `https://source.unsplash.com/random/${rsz()}x${rsz()}#${Date.now()}`,
      // `https://source.unsplash.com/random/${rsz()}x${rsz()}?bones,skeleton#${Date.now()}`,
      // `https://baconmockup.com/${rsz()}/${rsz()}`,
      // `https://placebeard.it/${rsz()}/${rsz()}/notag`,
      `https://bingw.jasonzeng.dev/?index=random&w=${rsz()}`,
      `https://loremflickr.com/${rsz()}/${rsz()}/bones,skeleton`,
      `https://picsum.photos/${rsz()}/${rsz()}`,
    ])}#{Date.now()}"
  />
{/each}
