<template>
    <div class="moves">
        <span>{{ moves }}</span>
        <img src="../assets/img/hit.svg" alt="Hit scope" class="icon">
    </div>
</template>

<script>
export default {
    name: 'Moves',
    data () {
        return {
            moves: 0
        }
    }
}
</script>
