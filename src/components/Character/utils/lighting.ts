import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0x5eead4, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x22d3ee, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr?v=2", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }

  function turnOnLights() {
    const duration = 2000;
    const start = performance.now();
    const startEnv = scene.environmentIntensity;
    const targetEnv = 0.64;
    const startLight = directionalLight.intensity;
    const targetLight = 1;

    function animate(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      scene.environmentIntensity = startEnv + (targetEnv - startEnv) * t;
      directionalLight.intensity = startLight + (targetLight - startLight) * t;
      const rimEl = document.querySelector(".character-rim") as HTMLElement;
      if (rimEl) {
        rimEl.style.opacity = String(t);
        rimEl.style.transform = `translateY(55%)`;
      }
      if (t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
