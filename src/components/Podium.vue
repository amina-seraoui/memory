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
            records: []
        }
    },
    async mounted () {
        fetch('http://localhost:3000/top5')
            .then(res => res.json())
            .then(res => {
                res.map(record => {
                    this.records.push(record.time)
                })
            })
            .catch(err => console.error(err))
    }
}
</script>
