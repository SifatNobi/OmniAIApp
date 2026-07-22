import * as THREE from "three";

export const dragonVertexShader = `
  uniform float uTime;
  uniform float uBodyWave;
  uniform float uFloatOffset;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vFresnel;
  varying float vHeight;

  void main() {
    vec3 pos = position;

    float along = (pos.z + 3.0) / 6.0;
    along = clamp(along, 0.0, 1.0);

    float tailWeight = 1.0 - along;
    float bodyWeight = sin(along * 3.14159);

    float bodyWave = sin(pos.z * 3.0 + uTime * 0.4) * 0.015 * bodyWeight;
    float tailSway = sin(pos.z * 5.0 + uTime * 0.6) * 0.03 * tailWeight;
    pos.x += bodyWave + tailSway;

    float breathe = sin(uTime * 0.3) * 0.008 * bodyWeight;
    pos.y += breathe;

    float floatY = sin(uTime * 0.2 + uBodyWave) * 0.02 * bodyWeight;
    pos.y += floatY;

    vec3 displaced = pos;

    vec3 objectNormal = normalize(normalMatrix * normal);
    vec3 transformedNormal = objectNormal;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    vHeight = along;

    vec3 viewDir = normalize(cameraPosition - (modelMatrix * vec4(displaced, 1.0)).xyz);
    vFresnel = 1.0 - max(0.0, dot(viewDir, transformedNormal));
    vFresnel = pow(vFresnel, 3.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const dragonFragmentShader = `
  uniform vec3 uBaseColor;
  uniform vec3 uEmissiveColor;
  uniform vec3 uRimColor;
  uniform float uTime;
  uniform float uEyeGlow;
  uniform float uEnergyPulse;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vFresnel;
  varying float vHeight;

  void main() {
    vec3 baseColor = uBaseColor;

    float scalePattern = sin(vHeight * 30.0) * 0.5 + 0.5;
    float scaleLine = step(0.85, scalePattern);
    vec3 scaledColor = mix(baseColor, baseColor * 1.2, scaleLine * 0.3);

    float veinX = sin(vHeight * 40.0 + uTime * 0.3) * 0.5 + 0.5;
    float veinY = sin(vHeight * 35.0 + uTime * 0.25) * 0.5 + 0.5;
    float veinPattern = veinX * veinY;
    float veins = step(0.7, veinPattern);

    float energyPulse = sin(uTime * 0.5 + uEnergyPulse) * 0.5 + 0.5;
    float pulseVeins = veins * (0.3 + energyPulse * 0.7);

    vec3 emissive = uEmissiveColor * pulseVeins * 0.6;
    emissive += uEmissiveColor * vFresnel * 0.4;

    emissive += uEmissiveColor * uEyeGlow * 0.15;

    vec3 finalColor = scaledColor + emissive;

    vec3 viewDir = normalize(vViewPosition);
    vec3 halfVec = normalize(viewDir + vec3(0.0, 1.0, 0.0));
    float spec = pow(max(0.0, dot(normalize(vNormal), halfVec)), 32.0);
    finalColor += vec3(0.4, 0.6, 1.0) * spec * 0.5;

    vec3 rimColor = uRimColor * vFresnel * 0.5;
    finalColor += rimColor;

    float brightness = max(finalColor.r, max(finalColor.g, finalColor.b));
    float bloomThreshold = 1.5;
    float bloom = max(0.0, brightness - bloomThreshold) * 0.3;
    finalColor += vec3(bloom * 0.5, bloom * 0.8, bloom);

    finalColor = clamp(finalColor, 0.0, 2.0);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function createDragonMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uBaseColor: { value: new THREE.Color(0x0a1a3a) },
      uEmissiveColor: { value: new THREE.Color(0x00d4ff) },
      uRimColor: { value: new THREE.Color(0x4a9eff) },
      uEyeGlow: { value: 0 },
      uBodyWave: { value: 0 },
      uFloatOffset: { value: 0 },
      uEnergyPulse: { value: 0 },
    },
    vertexShader: dragonVertexShader,
    fragmentShader: dragonFragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
  });
}
