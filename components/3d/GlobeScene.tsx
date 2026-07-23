"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RADIUS = 2.8;
const NODE_COUNT = 120;
const CONNECTION_THRESHOLD = 1.6;
const PARTICLE_COUNT = 600;

function fibonacciSphere(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push(
      new THREE.Vector3(
        r * Math.cos(theta) * radius,
        y * radius,
        r * Math.sin(theta) * radius,
      ),
    );
  }
  return pts;
}

function buildConnections(
  nodes: THREE.Vector3[],
  threshold: number,
): [number, number][] {
  const conns: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < threshold) {
        conns.push([i, j]);
      }
    }
  }
  return conns;
}

function arcPoints(
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  radius: number,
  segments = 16,
): THREE.Vector3[] {
  const mid = new THREE.Vector3()
    .addVectors(p1, p2)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(radius * 1.08);
  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  return curve.getPoints(segments);
}

const gridVert = `
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNorm;
void main(){
  vUv=uv; vPos=position; vNorm=normal;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
}
`;

const gridFrag = `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNorm;
void main(){
  float lat=vUv.y*3.14159;
  float lon=vUv.x*6.28318;
  float latG=sin(lat*18.0);
  float lonG=sin(lon*28.0);
  float grid=smoothstep(0.04,0.0,abs(latG))+smoothstep(0.04,0.0,abs(lonG));
  grid=clamp(grid,0.0,1.0);
  float node=smoothstep(0.008,0.0,abs(latG))*smoothstep(0.008,0.0,abs(lonG));
  vec3 vDir=normalize(cameraPosition-vPos);
  float fresnel=1.0-max(dot(normalize(vNorm),vDir),0.0);
  fresnel=pow(fresnel,2.5);
  vec3 col=uColor*(0.2+0.8*grid);
  col+=uColor*fresnel*0.6;
  col+=vec3(1.0)*node;
  float alfa=max(grid*0.5,fresnel*0.15)+node;
  gl_FragColor=vec4(col,alfa);
}
`;

function GlobeGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#2563EB") },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.04;
    uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[RADIUS, 56, 56]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={gridVert}
        fragmentShader={gridFrag}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function NetworkNodes() {
  const ref = useRef<THREE.Points>(null);
  const { positions, phases, sizes } = useMemo(() => {
    const pts = fibonacciSphere(NODE_COUNT, RADIUS);
    const pos = new Float32Array(pts.length * 3);
    const ph = new Float32Array(pts.length);
    const sz = new Float32Array(pts.length);
    pts.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
      ph[i] = Math.random() * Math.PI * 2;
      sz[i] = 0.04 + Math.random() * 0.06;
    });
    return { positions: pos, phases: ph, sizes: sz };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const sizesArr = ref.current.geometry.attributes.aSize as THREE.BufferAttribute;
    const alphaArr = ref.current.geometry.attributes.aAlpha as THREE.BufferAttribute;
    for (let i = 0; i < NODE_COUNT; i++) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + phases[i]);
      alphaArr.array[i] = 0.3 + 0.7 * pulse;
      sizesArr.array[i] = (0.04 + 0.02 * pulse) * (1 + 0.3 * Math.sin(t * 0.5 + i));
    }
    sizesArr.needsUpdate = true;
    alphaArr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute
          attach="attributes-aAlpha"
          args={[new Float32Array(NODE_COUNT).fill(1), 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uColor: { value: new THREE.Color("#60A5FA") },
        }}
        vertexShader={`
          attribute float aSize;
          attribute float aAlpha;
          varying float vAlpha;
          void main(){
            vAlpha=aAlpha;
            vec4 mv=modelViewMatrix*vec4(position,1.0);
            gl_PointSize=aSize*(300.0/-mv.z);
            gl_Position=projectionMatrix*mv;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          void main(){
            float d=length(gl_PointCoord-vec2(0.5));
            if(d>0.5)discard;
            float alpha=smoothstep(0.5,0.0,d)*vAlpha;
            gl_FragColor=vec4(uColor,alpha);
          }
        `}
      />
    </points>
  );
}

function NetworkConnections() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const pulseRef = useRef<THREE.Points>(null);

  const { positions, segments, conns, pulsePositions, pulsePhases, perSegmentPositions } = useMemo(() => {
    const nodes = fibonacciSphere(NODE_COUNT, RADIUS);
    const connsList = buildConnections(nodes, CONNECTION_THRESHOLD);
    const pos: number[] = [];
    connsList.forEach(([i, j]) => {
      const arc = arcPoints(nodes[i], nodes[j], RADIUS, 14);
      arc.forEach((p) => pos.push(p.x, p.y, p.z));
    });
    const posArr = new Float32Array(pos);
    const segCount = posArr.length / 9;

    const pulsePos = new Float32Array(connsList.length * 3);
    const pulsePh = new Float32Array(connsList.length);
    for (let i = 0; i < connsList.length; i++) {
      pulsePos[i * 3] = posArr[i * 45] ?? 0;
      pulsePos[i * 3 + 1] = posArr[i * 45 + 1] ?? 0;
      pulsePos[i * 3 + 2] = posArr[i * 45 + 2] ?? 0;
      pulsePh[i] = Math.random() * Math.PI * 2;
    }

    return {
      positions: posArr,
      segments: segCount,
      conns: connsList,
      pulsePositions: pulsePos,
      pulsePhases: pulsePh,
      perSegmentPositions: posArr,
    };
  }, []);

  const lineAlpha = useMemo(() => new Float32Array(segments).fill(0.3), [segments]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;
    const alphaAttr = lineRef.current.geometry.attributes.aLineAlpha as THREE.BufferAttribute;
    for (let i = 0; i < segments; i++) {
      const phase = Math.sin(i * 1.7 + i * 0.3);
      alphaAttr.array[i] =
        0.05 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.3 + phase));
    }
    alphaAttr.needsUpdate = true;

    if (pulseRef.current) {
      const posAttr = pulseRef.current.geometry
        .attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < conns.length; i++) {
        const progress =
          0.5 + 0.5 * Math.sin(t * 0.5 + pulsePhases[i]);
        const segIdx = Math.floor(progress * 14);
        const baseIdx = i * 45 + segIdx * 3;
        posAttr.array[i * 3] = perSegmentPositions[baseIdx] ?? 0;
        posAttr.array[i * 3 + 1] = perSegmentPositions[baseIdx + 1] ?? 0;
        posAttr.array[i * 3 + 2] = perSegmentPositions[baseIdx + 2] ?? 0;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aLineAlpha" args={[lineAlpha, 1]} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uColor: { value: new THREE.Color("#3B82F6") },
          }}
          vertexShader={`
            attribute float aLineAlpha;
            varying float vAlpha;
            void main(){
              vAlpha=aLineAlpha;
              vec4 mv=modelViewMatrix*vec4(position,1.0);
              gl_Position=projectionMatrix*mv;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            varying float vAlpha;
            void main(){
              gl_FragColor=vec4(uColor,vAlpha*0.6);
            }
          `}
        />
      </lineSegments>

      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uColor: { value: new THREE.Color("#93C5FD") },
          }}
          vertexShader={`
            void main(){
              vec4 mv=modelViewMatrix*vec4(position,1.0);
              gl_PointSize=4.0*(200.0/-mv.z);
              gl_Position=projectionMatrix*mv;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            void main(){
              float d=length(gl_PointCoord-vec2(0.5));
              if(d>0.5)discard;
              gl_FragColor=vec4(uColor,0.8*(1.0-d*2.0));
            }
          `}
        />
      </points>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = RADIUS + 0.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * (0.4 + Math.random() * 0.6);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      sz[i] = 0.01 + Math.random() * 0.03;
    }
    return { positions: pos, velocities: vel, sizes: sz };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes
      .position as THREE.BufferAttribute;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = performance.now() * 0.001;
      pos.array[i * 3] +=
        velocities[i * 3] + Math.sin(t * 0.1 + i) * 0.0003;
      pos.array[i * 3 + 1] +=
        velocities[i * 3 + 1] + Math.cos(t * 0.08 + i * 0.5) * 0.0002;
      pos.array[i * 3 + 2] +=
        velocities[i * 3 + 2] + Math.sin(t * 0.12 + i * 0.3) * 0.0003;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uColor: { value: new THREE.Color("#3B82F6") },
        }}
        vertexShader={`
          attribute float aSize;
          void main(){
            vec4 mv=modelViewMatrix*vec4(position,1.0);
            gl_PointSize=aSize*(200.0/-mv.z);
            gl_Position=projectionMatrix*mv;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          void main(){
            float d=length(gl_PointCoord-vec2(0.5));
            if(d>0.5)discard;
            float alpha=0.4*(1.0-d*2.0);
            gl_FragColor=vec4(uColor,alpha);
          }
        `}
      />
    </points>
  );
}

function HorizonGlow() {
  const ref = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#2563EB") },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={ref} position={[0, -RADIUS * 0.85, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[18, 6, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          varying vec2 vUv;
          void main(){
            vUv=uv;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uTime;
          varying vec2 vUv;
          void main(){
            float d=1.0-vUv.y;
            float pulse=0.95+0.05*sin(uTime*0.3);
            float alpha=smoothstep(0.0,0.4,d)*0.15*pulse;
            gl_FragColor=vec4(uColor,alpha);
          }
        `}
      />
    </mesh>
  );
}

export function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -RADIUS * 0.95, 0]}>
      <GlobeGrid />
      <NetworkNodes />
      <NetworkConnections />
      <Particles />
      <HorizonGlow />
    </group>
  );
}
