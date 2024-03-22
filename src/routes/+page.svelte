<script>
  import { onMount } from 'svelte'

  import { browser } from '$app/environment'
  import { ImgSpam, SpamSet, randint, randitem, randrgb } from '$lib'

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
  let mantra = 'RUN'

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
        scrollTo({
          top: randint(document.body.scrollHeight),
          behavior: 'smooth',
        })
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
      el => {
        el.after(el.nextSibling)
      },
      el => {
        el.before(el.previousSibling)
      },
      el => {
        el.style.backgroundColor = randrgb()
      },
      el => {
        el.style.color = randrgb()
      },
      el => {
        el.style.fontSize = getComputedStyle(el)
          .getPropertyValue('font-size')
          .replace(/\d+/, n => Math.round(+n + randint(n) - n / 2))
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
    mantra = 'RESET'
    g_t = -1
    setTimeout(() => {
      location.reload()
    }, 1000)
  }}
  on:mousemove={e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }}
/>

<svelte:head>
  <title>barebones</title>
</svelte:head>

<div class="absolute inset-x-0 top-0 w-screen">
  {#each Array(30) as _}
    <SpamSet />
  {/each}
</div>

<h1>all i have are</h1>
<h1>BONES</h1>
<ImgSpam alt="test" src="https://i.imgur.com/w8pK4DY.png" />
<SpamSet />
<p>{'BONES '.repeat(1000)}</p>
<SpamSet />
<h3 class="whitespace-initial">
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
</h3>
<SpamSet />
<p class="whitespace-initial">
  Bony ( ID 227.0 ) is a monster class in the Binding of Isaac that resemble
  human skeletons respectively. They are one of the enemies stemming from the
  base game from 2011, and remain in the newest irritation, The Binding of Isaac
  Repentance. They have base hp of 8 and a stage hp of 2, making them very
  susceptible to damage. Although being very fragile, they are nimble and agile,
  making them tricky to hit without a fast tear rate or homing tears to most new
  players. On top of being fast , they throw bone projectiles at the player from
  a great distance and at near light speed. Why am I losing angel deals to this
  anorexic creature. Edmund Mcmillen, a feeble procreator, made a less than
  acceptable , worthless item with his game The Binding of Isaac. I will
  transform into my refund that i will get back from buying the game, I desire
  that you ( incomprehensible) for the next time a cow on a trash agricultural
  production site you item of crystalized sugar on a birchwood stick. They are
  found in mines, sacred womb, cathedral, ashpit, the depths, necropolis, dark
  room, dank depths, mausoleum, gehenna, the chest, the womb, the caves, utero,
  the catacombs, sheol, flooded caves and challenge rooms. They come in many
  variants, champions and can be spawned by bosses and sub bosses.
</p>
<SpamSet />
<h1 class="whitespace-initial">sans from undertale</h1>
<SpamSet />
<h2 class="whitespace-initial">
  The skull and cross-bones symbol has been used for a very long time to
  represent death, perhaps because after death and decomposition, bones are all
  that remain. Many people think of bones as being dead, dry, and brittle. These
  adjectives may correctly describe the bones of a preserved skeleton, but the
  bones of a living human being are very much alive. Living bones are also
  strong and flexible. Bones are the major organs of the skeletal system.
</h2>
<SpamSet />
<pre>
░░░░░░░░░░░░▄▐░░░░░░
░░░░░░▄▄▄░░▄██▄░░░░░
░░░░░▐▀█▀▌░░░░▀█▄░░░
░░░░░▐█▄█▌░░░░░░▀█▄░
░░░░░░▀▄▀░░░▄▄▄▄▄▀▀░
░░░░▄▄▄██▀▀▀▀░░░░░░░
░░░█▀▄▄▄█░▀▀░░░░░░░░
░░░▌░▄▄▄▐▌▀▀▀░░░░░░░
▄░▐░░░▄▄░█░▀▀░░░░░░░ U HAVE BEEN SPOOKED BY THE
▀█▌░░░▄░▀█▀░▀░░░░░░░
░░░░░░░▄▄▐▌▄▄░░░░░░░
░░░░░░░▀███▀█░▄░░░░░
░░░░░░▐▌▀▄▀▄▀▐▄░░░░░ SPOOKY SKILENTON
░░░░░▐▀░░░░░░▐▌░░░░░
░░░░░░█░░░░░░░░█░░░░
░░░░░▐▌░░░░░░░░░█░░░
░░░░░█░░░░░░░░░░▐▌░░ SEND THIS TO 4 PPL OR SKELINTONS WILL EAT YOU 
</pre>
<SpamSet />
<p class="whitespace-initial">
  The Skeleton Army card is unlocked from the Bone Pit (Arena 2). It spawns 15
  single-target, melee Skeletons with very low hitpoints and low damage, with an
  overall extremely high damage per second. A Skeleton Army card costs 3 Elixir
  to deploy.Due to their high numbers and overall very high DPS, the Skeleton
  Army is very effective against single target enemy troops and building
  targeting troops such as the P.E.K.K.A., Prince or Giant. Another benefit is
  the Skeleton Army's low cost of 3 Elixir, making it a very versatile card that
  can give the player an Elixir advantage in almost any case. Although they have
  low health individually, their sheer numbers allow for them to be effective at
  blocking most troops and siege buildings. This can even work for air troops,
  such as the Inferno Dragon due to the fact that the Skeleton Army can stall
  and pull the Inferno Dragon away from the tower, giving the tower a chance to
  destroy the Inferno Dragon. While being powerful in numbers, they are very
  weak against splash damage and spells; most area damage units will be able to
  take out the whole swarm without losing health. Low cost spells are also
  effective at taking the swarm out efficiently. Despite their area damage
  weakness, the Skeleton Army is capable of countering directional area damage
  troops like a Wizard or Bomber. For this to work, the Skeleton Army must be
  placed directly on top of the unit, surrounding it and overwhelming their area
  damage before the swarm is defeated. The player must also have the assistance
  of a Crown Tower to damage down the troop, as otherwise there is a chance the
  Skeletons could clump up in such a way that the troop could eliminate them all
  before being defeated. The Skeleton Army can bait the opponent into using
  their area damage spell, allowing the player to use other high DPS swarms such
  as Goblin Gang safely. However, unlike the Goblin Gang, the Skeleton Army can
  be fully countered by a wider range of spells. As such, they may not the most
  effective at baiting out the desired spell, such as The Log, if they have more
  than one. Other swarm troops such as Barbarians and Minion Horde may be more
  favorable as a substitute, as they have higher hitpoints compared to the
  Skeleton Army. However, they also have a heavier Elixir cost, which does make
  them more committal but also makes them more enticing for the opponent to use
  a higher cost spell like Fireball on them, allowing other spell-vulnerable
  cards in the player's deck to thrive. Poison and Fireball are a negative
  Elixir trade but do counter the Skeleton Army effectively. The Barbarian
  Barrel can not only counter the Skeleton Army for a positive Elixir trade but
  also force out a response from the opponent. If the barrel is played right at
  the river, the Barbarian that spawns will get two hits on the tower left
  unattended, allowing for valuable chip damage. The Skeleton Army is not
  recommended to be used offensively, as they can be easily wiped out with
  spells such as Arrows. However, if the opponent's cheap spell is out of
  rotation, this play may force non-efficient counters out of their hand, as if
  the Skeleton Army manages to lock on to a Crown Tower, they will deal
  extremely high damage to or even destroy it. Their high count allows them to
  be played in the center or behind the player's King's Tower to cover both
  lanes. This often entirely deters the opponent from immediately attacking, as
  they will only be able to spell down half of the swarm with one push. The
  Skeleton Army is quite effective with Clone to overwhelm your opponent when
  their proper counters are not in rotation. Using a Rage on the Skeleton Army
  makes it a huge threat since they already move quite fast and deal high damage
  per second. Mirroring or Cloning the Skeleton Army gives a huge numbers
  advantage. However, trying either of these strategies is very risky, as a
  splash unit or a spell can wipe it out for a positive Elixir trade. In double
  Elixir, the impact of failing this strategy is reduced because of the faster
  Elixir generation rate. An Ice Golem is able to eliminate the entire Skeleton
  Army with its death damage when equally leveled for a positive Elixir trade.
</p>
<SpamSet />
<h1 class="whitespace-initial">
  DO YOU FEEL YOUR BONES? I DO. DO YOU SEE YOUR BONES? I DO. DO YOU LIKE YOUR
  BONES? I DO. YOUR BONES ARE SPECIAL, I KNOW. MY BONES WERE SPECIAL ONCE TOO.
  NOT ANYMORE. I'D LIKE TO HAVE SOME SPECIAL BONES ONCE MORE. YOU WOULDN'T MIND
  IF I BORROWED YOURS, WOULD YOU? AFTER ALL, WHAT'S AMISS WITH A FEW MISSING
  BONES WHEN YOU HAVE SO MANY TO START?
</h1>
<SpamSet />

<div class="fixed right-0 top-0 text-red">{g_t}</div>
{#if g_t <= 0}
  <div
    style:left="{randint(100) - 50}%"
    style:top="{randint(100) - 50}%"
    class="fixed text-9xl text-red"
  >
    {mantra.repeat(1000)}
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
