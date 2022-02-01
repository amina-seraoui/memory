<template>
    <div
        class="card"
        data-position="1"
        :class="card.flipped ? 'flipped' : ''"
        :style="{ opacity: card.match ? 0.5 : 1, cursor: (card.flipped || !play) ? 'default' : 'pointer' }"
    >
        <!-- (la carte n'étant pas carré, difficile de renseigner une valeur en pourcentage ) -->
        <!-- ne fonctionne pas : `center ${ (100 / 18 * card.pos) * -18 }px` -->
        <!-- ne fonctionne pas : `center ${ (100 / 18 * card.pos) }%` -->
        <div ref="refCard" class="face" :style="{ backgroundPosition: `center ${ - height * card.pos }px`}"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            height: 0
        }
    },
    props: ['card', 'play'],
    mounted () {
        // récupère la hauteur de la carte (-1px car la valeur obtenue n'est pas tout à fait exacte)
        this.height = this.$refs.refCard.clientHeight
    }
}
</script>
