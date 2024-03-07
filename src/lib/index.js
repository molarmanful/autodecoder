export { default as ImgSpam } from './ImgSpam.svelte'
export { default as SpamSet } from './SpamSet.svelte'

export let randint = n => 0 | (Math.random() * n)
export let randitem = a => a[randint(a.length)]
export let randchar = () =>
  randitem('0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')
