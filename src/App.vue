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
              <Card v-for="(card, i) in cards" :key="i" :card="card" @click="flip(i)"/>
            </div>
            <Timer />
          </div>
        </section>
        <GameOver v-if="isGameOver"/>
        <Podium v-else-if="!isGameStart" :startGame="startGame"/>
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
            const card = {
                pos: i,
                flipped: false,
                match: false
            }
            cards.push({ ...card })
            cards.push({ ...card })
        }

        return {
            isGameStart: false,
            isGameOver: false,
            cards,
            flippedCards: [],
            score: 0
        }
    },
    methods: {
        startGame () {
            this.cards.sort(() => Math.random() - 0.5)
            this.isGameStart = true
        },
        flip (i) {
            if (this.flippedCards.length < 2) {
                if (!this.cards[i].flipped) {
                    this.cards[i].flipped = true
                    this.flippedCards.push(this.cards[i])
                    this.checkMatch()
                }

                return true
            }
            return false
        },
        checkMatch () {
            if (this.flippedCards.length === 2) {
                if (this.flippedCards[0].pos === this.flippedCards[1].pos) {
                    // MATCH
                    this.flippedCards[0].match = true
                    this.flippedCards[1].match = true
                    this.flippedCards = []
                    this.score++

                    console.log(this.score)
                    this.isGameOver = this.score === 18
                } else {
                    // NO MATCH
                    setTimeout(() => {
                        this.flippedCards[0].flipped = false
                        this.flippedCards[1].flipped = false
                        this.flippedCards = []
                    }, 1000)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .logo {
    filter: drop-shadow(4px 4px 4px rgba(#000, .25))
  }
</style>
