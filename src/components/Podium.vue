<template>
    <section id="podium">
        <ul class="times">
            <li class="time" v-for="(time, i) in records" :key="i">
                <div class="icon"></div>
                <span>{{ time }}</span>
            </li>
        </ul>
        <button class="btn" @click="startGame">Jouer</button>
    </section>
</template>

<script>
export default {
    props: ['startGame'],
    data () {
        return {
            records: ['00:13', '00:16', '00:25', '00:45', '01:06']
        }
    }
}
</script>
