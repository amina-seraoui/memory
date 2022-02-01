<template>
    <div class="timer">
        <progress :value="time" :max="max"/>
        <span>{{ str }}</span>
    </div>
</template>

<script>
export default {
    props: ['time', 'str', 'max']
}
</script>
