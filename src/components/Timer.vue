<template>
    <div class="timer">
        <progress :value="time * 100" :max="max"/>
        <span>{{ timeToString((max / 1000) - (time / 10)) }}</span>
    </div>
</template>

<script>
export default {
    props: ['play', 'lose', 'strTime'],
    data () {
        const OneMin = 60 * 1000
        return {
            time: 0, // en cs
            max: 3.5 * OneMin, // en ms (3min 30)
            interval: null,
            start: false
        }
    },
    updated () {
        this.launchTimer()
    },
    methods: {
        launchTimer () {
            if (this.play && !this.start) { // Si la game a démarré et le timer n'est pas déjà lancé, on le lance
                this.start = true
                this.interval = setInterval(() => {
                    this.time++
                    this.$emit('updateTime', this.timeToString(this.time / 10))
                    if (this.time * 100 === this.max) {
                        this.gameLose()
                    }
                }, 100)
            } else if (!this.play && this.start) { // Si le timer est en route est que la game est fini
                this.init()
            }
        },
        init () {
            this.time = 0
            this.start = false
            clearInterval(this.interval)
        },
        gameLose () {
            this.lose()
            this.init()
        },
        // retourne un nombre de secondes au format 'mm:ss'
        timeToString (seconds) {
            const min = Math.floor(seconds / 60)
            const sec = Math.floor(seconds % 60)

            // On ajoute un 0 si les minutes ou les secondes sont inférieures à 10
            return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec
        }
    }
}
</script>
