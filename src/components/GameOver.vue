<template>
    <section id="game-over">
        <h1>{{ win ? 'Bien joué' : 'Temps écoulé' }} !</h1>
        <p>{{ time }}</p>
        <button class="btn" @click="replay">Rejouer</button>
    </section>
</template>

<script>
export default {
    props: ['win', 'time', 'replay']
}
</script>
