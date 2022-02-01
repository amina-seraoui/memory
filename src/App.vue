<template>
    <header>
      <picture>
        <source media="(min-width: 750px)" srcset="./assets/img/logo.svg">
        <source media="(max-width: 750px)" srcset="./assets/img/logo-min.svg">
        <img
          src="./assets/img/logo.svg"
          alt="Memory Logo"
          class="logo"
        >
      </picture>
        <Moves />
    </header>
    <main>
        <section id="memory-game">
          <img src="@/assets/img/gameboy.png" alt="Cute Gameboy">
          <div>
            <div id="deck">
              <Card v-for="(card, i) in cards" :key="i" :card="card"/>
            </div>
            <Timer />
          </div>
        </section>
        <Podium v-if="!isGameStart && !isGameOver" :startGame="startGame"/>
        <GameOver v-else-if="!isGameStart && isGameOver"/>
    </main>
</template>

<script>
// @ is an alias to /src
import Moves from '@/components/Moves.vue'
import Card from '@/components/Card.vue'
import Timer from '@/components/Timer.vue'
import Podium from '@/components/Podium.vue'
import GameOver from '@/components/GameOver.vue'

export default {
    components: {
        Moves,
        Card,
        Timer,
        Podium,
        GameOver
    },
    data () {
        const cards = []
        for (let i = 0; i < 18; i++) {
            cards.push({ pos: i })
            cards.push({ pos: i })
        }

        return {
            isGameStart: false,
            isGameOver: false,
            cards
        }
    },
    methods: {
        startGame () {
            this.cards.sort(() => Math.random() - 0.5)
            this.isGameStart = true
        }
    }
}
</script>

<style lang="scss" scoped>
  .logo {
    filter: drop-shadow(4px 4px 4px rgba(#000, .25))
  }
</style>
