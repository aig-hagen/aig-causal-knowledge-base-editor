<script setup lang="ts"></script>

<template>
  <graph-component></graph-component>
</template>

<style scoped>
graph-component {
  display: block;
  height: 100%;
}
</style>

<style>
.graph-controller__graph-host svg {
  /*
    <svg> is by default "display: inline" whicht causes a slight overflow.
    See https://stackoverflow.com/questions/72732175/svg-set-to-100-height-causes-overflow-in-div-why
  */
  display: block;
  /*
    Overide CSS properites set by Bulma, which in turn override "width" and "height" attribute on the <svg> element.
  */
  width: 100%;
  height: 100%;
}

.graph-controller__controls-overview {
  display: none !important;
}
</style>
