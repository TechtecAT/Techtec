<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>



body {
  font-family: "Ubuntu Sans Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 200;
  font-style: normal;
  margin: 0;
  padding: 0;
  background: rgb(0,83,123);
background: radial-gradient(circle, rgba(0,83,123,1) 0%, rgba(0,33,86,1) 35%);
}

#app {
  max-width: auto;
  margin: 0 auto;
  text-align: center;
}

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 9px;
  }

  *::-webkit-scrollbar-track {
    background: #1c1c1c;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #44a1f3;
    border-radius: 6px;
    border: 3px none #000000;
  }

</style>