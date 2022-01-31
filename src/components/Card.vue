<template>
    <div
        class="card"
        data-position="1"
        :class="isFlipped ? 'flipped' : ''"
        @click="isFlipped = !isFlipped"
    >
        <div class="face"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isFlipped: false
        }
    }
}
</script>
