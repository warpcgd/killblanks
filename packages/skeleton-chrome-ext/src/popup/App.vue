<template>
    <div id="popup">
        <div class="header">
            <h1>タイトル</h1>
            <p>Ver 1.0.0</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default class App extends Vue {}
</script>

<style lang="scss" scoped>

#popup {
    width: 560px;
    height: auto;
    margin: 5px;
}

#popup h1{
    font-size: 24px;
    color: #ff3860;
    font-weight: bold;
}

</style>
