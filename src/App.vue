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
        <Moves :moves="hits"/>
    </header>
    <main>
        <section id="memory-game">
          <div>
            <div id="deck">
              <Card v-for="(card, i) in cards" :key="i" :card="card" @click="flip(i)" :play="isGameStart && !isGameOver"/>
            </div>
            <Timer :play="isGameStart && !isGameOver" :lose="() => {isGameOver = true}" v-on:updateTime="updateTime"/>
          </div>
        </section>
        <GameOver v-if="isGameOver" :win="win" :time="time" :replay="startGame"/>
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
        return {
            isGameStart: false,
            isGameOver: false,
            cards: this.setupCards(),
            flippedCards: [],
            score: 0,
            win: false,
            time: '00:00',
            hits: 0
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
            this.flippedCards = []
            this.score = 0
            this.win = false
            this.hits = 0
        },
        flip (i) {
            if (
                this.isGameStart &&
                !this.isGameOver &&
                this.flippedCards.length < 2 &&
                !this.cards[i].flipped
            ) {
                this.cards[i].flipped = true
                this.flippedCards.push(this.cards[i])
                this.hits++
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
                    }, 800)
                }
            }
        },
        gameWin () {
            this.win = true
            this.isGameOver = true
        },
        updateTime (time) {
            this.time = time
        }
    }
}
</script>
