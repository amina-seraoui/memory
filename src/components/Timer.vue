<template>
    <div class="timer">
        <progress />
        <span>{{ time }}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            time: '00:00'
        }
    }
}
</script>
