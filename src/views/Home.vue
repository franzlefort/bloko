<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    Близость камеры
    <input
      v-model.number="positionZ"
      type="range"
      name="position-z"
      id="position-z"
      min="2"
      max="10"
    />

    <div ref="scene" id="scene"></div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';

import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

@Component({})
export default class Home extends Vue {
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
  
    const geometry = new BoxGeometry( 1, 2, 1, 3, 4, 5 );
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh( geometry, material );

    if (scene) {
      this.scene = new Scene();
      this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
      this.renderer = new WebGLRenderer();
      this.renderer.setSize( window.innerWidth * 0.6, window.innerHeight * 0.6 );
  
      scene.appendChild( this.renderer.domElement );
  
      this.scene.add(cube);
  
      this.renderer.setClearColor('red');
  
      this.camera.position.z = 5;
  
      const animate = () => {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.05;
        this.renderer.render( this.scene, this.camera );
      };
  
      animate();
    } else {
      console.error('Scene element is missed');
    }
  }
}

</script>

<style lang="scss">

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

