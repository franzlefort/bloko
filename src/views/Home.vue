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

import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, DirectionalLight, MeshPhongMaterial } from 'three';

@Component({})
export default class Home extends Vue {
  positionZ: number = 5;

  scene: any = {};
  camera: any = {};
  renderer: any = {};
  light: any = {};

  @Watch('positionZ')
  onPositionZChange (val: number) {
    this.camera.position.z = val;
  }

  async mounted () {
    await this.$nextTick();

    const scene = document.getElementById('scene');
  
    const geometry = new BoxGeometry( 1, 2, 1);
    const material = new MeshPhongMaterial({ color: 'gray' });
    const cube = new Mesh( geometry, material );

    if (scene) {
      this.scene = new Scene();
      this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      this.renderer = new WebGLRenderer();
      this.light = new DirectionalLight('#fff', 1);

      this.renderer.setSize( window.innerWidth * 0.6, window.innerHeight * 0.6 );
      this.renderer.setClearColor('white');
  
      this.light.position.set( -1, 2, 4 );

      this.scene.add(this.light);
 
      this.camera.position.z = 5;
  
      scene.appendChild( this.renderer.domElement );

      this.scene.add(cube);
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

