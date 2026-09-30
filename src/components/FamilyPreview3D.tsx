import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { PackageMesh } from '@/components/models/PackageMesh'
import { boundingHeight, boundingWidth, familyPreviewKind, previewCameraDistance } from '@/lib/packageShapes'
import { familyTheme } from '@/theme/families'

type FamilyPreview3DProps = {
  familyId: string
  interactive?: boolean
}

export function FamilyPreview3D({ familyId, interactive = false }: FamilyPreview3DProps) {
  const shape = familyPreviewKind(familyId)
  const theme = familyTheme(familyId)
  const width = boundingWidth(shape)
  const height = boundingHeight(shape)
  const size = Math.max(width, height, 2)
  const dist = previewCameraDistance(shape)
  return (
    <div className={interactive ? 'h-64 w-full' : 'h-36 w-full pointer-events-none sm:h-40'}>
      <Canvas
        camera={{
          position: [dist * 0.65, Math.max(dist * 0.55, height * 1.15), dist],
          fov: 32,
          up: [0, 1, 0],
          near: 0.05,
          far: 200,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[theme.sceneBg]} />
        <ambientLight intensity={0.85} />
        <directionalLight position={[size, size * 1.6, size]} intensity={1.2} />
        <directionalLight position={[-size, size * 0.8, -size * 0.4]} intensity={0.4} />
        <hemisphereLight args={['#ffffff', theme.sceneGround, 0.4]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[size * 12, size * 12]} />
          <meshStandardMaterial color={theme.sceneGround} />
        </mesh>
        <PackageMesh shape={shape} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.4}
          target={[0, height * 0.4, 0]}
        />
      </Canvas>
    </div>
  )
}
