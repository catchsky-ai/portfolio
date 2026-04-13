import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            // Store head reference for glasses
            let headBone: THREE.Object3D | null = null;

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Add colors to shirt and pants
                if (child.name.toLowerCase().includes('shirt') ||
                    child.name.toLowerCase().includes('top') ||
                    child.name.toLowerCase().includes('body')) {
                  // Light blue shirt color
                  if (mesh.material) {
                    if (Array.isArray(mesh.material)) {
                      mesh.material.forEach((mat: any) => {
                        mat.color = new THREE.Color(0x87CEEB); // Sky blue
                      });
                    } else {
                      (mesh.material as any).color = new THREE.Color(0x87CEEB);
                    }
                  }
                }

                if (child.name.toLowerCase().includes('pant') ||
                    child.name.toLowerCase().includes('leg') ||
                    child.name.toLowerCase().includes('bottom')) {
                  // Light khaki/beige pants
                  if (mesh.material) {
                    if (Array.isArray(mesh.material)) {
                      mesh.material.forEach((mat: any) => {
                        mat.color = new THREE.Color(0xC3B091); // Khaki/beige
                      });
                    } else {
                      (mesh.material as any).color = new THREE.Color(0xC3B091);
                    }
                  }
                }
              }

              // Find head bone for glasses placement
              if (child.name && (child.name.toLowerCase().includes('head') ||
                  child.name.toLowerCase().includes('spine006'))) {
                headBone = child;
              }
            });

            // Create and add rectangular glasses
            const glassesGroup = new THREE.Group();

            // Glasses frame material (black/dark gray)
            const frameMaterial = new THREE.MeshStandardMaterial({
              color: 0x1a1a1a,
              metalness: 0.8,
              roughness: 0.2,
            });

            // Glass lens material (transparent with slight tint)
            const lensMaterial = new THREE.MeshPhysicalMaterial({
              color: 0x88ccff,
              metalness: 0.1,
              roughness: 0.1,
              transmission: 0.9,
              thickness: 0.5,
              transparent: true,
              opacity: 0.3,
            });

            // Left lens frame (rectangular)
            const leftFrameGeometry = new THREE.BoxGeometry(0.35, 0.25, 0.05);
            const leftFrame = new THREE.Mesh(leftFrameGeometry, frameMaterial);
            leftFrame.position.set(-0.18, 0, 0.4);
            glassesGroup.add(leftFrame);

            // Left lens (glass)
            const leftLensGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.02);
            const leftLens = new THREE.Mesh(leftLensGeometry, lensMaterial);
            leftLens.position.set(-0.18, 0, 0.42);
            glassesGroup.add(leftLens);

            // Right lens frame (rectangular)
            const rightFrameGeometry = new THREE.BoxGeometry(0.35, 0.25, 0.05);
            const rightFrame = new THREE.Mesh(rightFrameGeometry, frameMaterial);
            rightFrame.position.set(0.18, 0, 0.4);
            glassesGroup.add(rightFrame);

            // Right lens (glass)
            const rightLensGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.02);
            const rightLens = new THREE.Mesh(rightLensGeometry, lensMaterial);
            rightLens.position.set(0.18, 0, 0.42);
            glassesGroup.add(rightLens);

            // Bridge between lenses
            const bridgeGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
            const bridge = new THREE.Mesh(bridgeGeometry, frameMaterial);
            bridge.rotation.z = Math.PI / 2;
            bridge.position.set(0, 0, 0.4);
            glassesGroup.add(bridge);

            // Left temple (arm)
            const leftTempleGeometry = new THREE.BoxGeometry(0.5, 0.03, 0.03);
            const leftTemple = new THREE.Mesh(leftTempleGeometry, frameMaterial);
            leftTemple.position.set(-0.4, 0, 0.38);
            leftTemple.rotation.y = -0.1;
            glassesGroup.add(leftTemple);

            // Right temple (arm)
            const rightTempleGeometry = new THREE.BoxGeometry(0.5, 0.03, 0.03);
            const rightTemple = new THREE.Mesh(rightTempleGeometry, frameMaterial);
            rightTemple.position.set(0.4, 0, 0.38);
            rightTemple.rotation.y = 0.1;
            glassesGroup.add(rightTemple);

            // Position glasses on head
            glassesGroup.position.set(0, 1.55, 0.1);
            glassesGroup.scale.set(1, 1, 1);

            // Add glasses to character
            character.add(glassesGroup);
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
