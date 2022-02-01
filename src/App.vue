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
              <Card v-for="(card, i) in cards" :key="i" :card="card" @click="flip(i)" :play="isGameStart && !isGameOver"/>
            </div>
            <Timer :time="time * 1000" :str="timeToString(time)" :max="maxTime"/>
          </div>
        </section>
        <GameOver v-if="isGameOver" :win="win" :time="timeToString(time)" :replay="startGame"/>
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
        const OneMin = 60 * 1000
        return {
            isGameStart: false,
            isGameOver: false,
            cards: this.setupCards(),
            flippedCards: [],
            score: 0,
            win: false,
            time: 0, // en s
            maxTime: 3.5 * OneMin, // en ms
            interval: null
        }
    },
    methods: {
        setupCards () {
            const cards = []
            for (let pos = 0; pos < 18; pos++) {
                const card = {
                    pos,
                    flipped: false,
                    match: false
                }
                cards.push({ ...card })
                cards.push({ ...card })
            }
            cards.sort(() => Math.random() - 0.5)
            return cards
        },
        startGame () {
            // Initialisation
            this.cards = this.setupCards()
            this.isGameStart = true
            this.isGameOver = false
            this.time = 0
            this.flippedCards = []
            this.score = 0
            this.win = false

            // Lancement du timer (à déplacer dans le composant Timer)
            this.interval = setInterval(() => {
                this.time++

                if (this.time * 1000 === this.maxTime) {
                    this.gameLose()
                }
            }, 1000)
        },
        flip (i) {
            if (
                this.isGameStart &&
                this.flippedCards.length < 2 &&
                !this.cards[i].flipped
            ) {
                this.cards[i].flipped = true
                this.flippedCards.push(this.cards[i])
                this.checkMatch()
            }
        },
        checkMatch () {
            if (this.flippedCards.length === 2) {
                if (this.flippedCards[0].pos === this.flippedCards[1].pos) {
                    // MATCH
                    this.flippedCards[0].match = true
                    this.flippedCards[1].match = true
                    this.flippedCards = []
                    this.score++
                    if (this.score === 18) {
                        this.gameWin()
                    }
                } else {
                    // NO MATCH
                    setTimeout(() => {
                        this.flippedCards[0].flipped = false
                        this.flippedCards[1].flipped = false
                        this.flippedCards = []
                    }, 1000)
                }
            }
        },
        gameWin () {
            this.win = true
            this.isGameOver = true
            clearInterval(this.interval)
        },
        gameLose () {
            this.isGameOver = true
            clearInterval(this.interval)
        },
        // retourne un nombre de secondes au format 'mm:ss'
        timeToString (seconds) {
            const min = Math.floor(seconds / 60)
            const sec = seconds % 60
            // On ajoute un 0 si les minutes ou les secondes sont inférieures à 10
            return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec
        }
    }
}
</script>

<style lang="scss" scoped>
  .logo {
    filter: drop-shadow(4px 4px 4px rgba(#000, .25))
  }
</style>
