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

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  DirectionalLight,
  MeshPhongMaterial,
  GridHelper,
  AmbientLight,
  SpotLight,
  LightShadow,
  PlaneBufferGeometry,
  ShadowMaterial,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({})
export default class Home extends Vue {
  positionZ: number = 5;

  SCENE: Scene = {};
  CAMERA: PerspectiveCamera = {};
  RENDERER: WebGLRenderer = {};
  LIGHT: DirectionalLight = {};
  CONTROLS: OrbitControls = {};
  GRID: GridHelper = {};
  AMBIENT_LIGHT: AmbientLight = {};

  @Watch('positionZ')
  onPositionZChange (val: number) {
    this.CAMERA.position.z = val;
  }

  private initControls () {
    this.CONTROLS = new OrbitControls(this.CAMERA, this.RENDERER.domElement);
    this.CONTROLS.dampingFactor = 25;
    this.CONTROLS.minPolarAngle = Math.PI * 1 / 4;
    this.CONTROLS.maxPolarAngle = Math.PI * 3 / 4;
    this.CONTROLS.update();
  }

  async mounted () {
    await this.$nextTick();

    const scene = document.getElementById('scene');
  
    const geometry = new BoxGeometry(1, 2, 1);
    const material = new MeshPhongMaterial({ color: 'gray' });
    const cube = new Mesh( geometry, material );

    if (scene) {
      this.SCENE = new Scene();
      
      this.CAMERA = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      this.CAMERA.position.z = 5;

      this.LIGHT = new DirectionalLight('#fff', 1);
      this.LIGHT.position.set( 0, 1500, 200 );
      this.LIGHT.castShadow = true;
      this.LIGHT.shadow = new LightShadow( new PerspectiveCamera( 70, 1, 200, 2000 ) );
      this.LIGHT.shadow.bias = - 0.000222;
      this.LIGHT.shadow.mapSize.width = 1024;
      this.LIGHT.shadow.mapSize.height = 1024;
      this.SCENE.add(this.LIGHT);
      
      this.GRID = new GridHelper( 100, 100, 'red', 'green' );
      this.GRID.position.y = -1;
      this.GRID.material.opacity = 0.25;
      this.GRID.material.transparent = false;
      this.GRID.receiveShadow = true;

      this.SCENE.add(this.GRID);

      cube.castShadow = true;
      cube.receiveShadow = true;

      this.SCENE.add(cube);

      this.RENDERER = new WebGLRenderer();
 
      this.RENDERER.setPixelRatio(window.devicePixelRatio);
      this.RENDERER.setSize( window.innerWidth * 0.8, window.innerHeight * 0.8 );
      this.RENDERER.setClearColor('white');
      this.RENDERER.shadowMap.enabled = true;

      scene.appendChild( this.RENDERER.domElement );

      this.initControls();

      const animate = () => {
        requestAnimationFrame( animate );
        this.CONTROLS.update();
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        this.RENDERER.render( this.SCENE, this.CAMERA );
      };
  
      animate();
      
      window.addEventListener('resize', () => {
        this.CAMERA.aspect = window.innerWidth / window.innerHeight;
        this.CAMERA.updateProjectionMatrix();

        this.RENDERER.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
      });
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

