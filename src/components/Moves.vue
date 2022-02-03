<template>
    <div class="moves">
        <span>{{ moves }}</span>
        <img src="../assets/img/hit.svg" alt="Hit scope" class="icon">
    </div>
</template>

<script>
export default {
    name: 'Moves',
    props: ['moves']
}
</script>
