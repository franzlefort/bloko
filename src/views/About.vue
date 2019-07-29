<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png">

    <div ref="scene" id="scene"></div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

@Component({})
export default class About extends Vue {
  positionZ: number = 5;

  scene: any = {};
  camera: any = {};
  renderer: any = {};

  @Watch('positionZ')
  onPositionZChange (val: number) {
    this.camera.position.z = val;
  }

  async mounted () {
    await this.$nextTick();

    const scene = document.getElementById('scene');
    if (scene) {
      // do some things
    }
  }
}
</script>

<style scoped>

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>