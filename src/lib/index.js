export { default as ImgSpam } from './ImgSpam.svelte'
export { default as SpamSet } from './SpamSet.svelte'

export const randint = n => 0 | (Math.random() * n)
export const randitem = a => a[randint(a.length)]
export const randchar = () =>
  randitem('0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')
export const randrgb = () =>
  `rgb(${randint(256)}, ${randint(256)}, ${randint(256)}`
