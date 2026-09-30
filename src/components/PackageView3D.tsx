import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'

import { PackageMesh } from '@/components/models/PackageMesh'
import {
  boundingHeight,
  boundingWidth,
  isChipLineup,
  lineupCameraDistance,
  shapesForClass,
  type PackageShape,
} from '@/lib/packageShapes'
import type { ClassValues, PartClass } from '@/seed/types'
import { familyTheme } from '@/theme/families'

type PackageView3DProps = {
  part: PartClass
  familyId: string
  values?: ClassValues
  selected?: string
  onSelect?: (id: string) => void
}

export function PackageView3D({ part, familyId, values, selected, onSelect }: PackageView3DProps) {
  const theme = familyTheme(familyId)
  const shapes = useMemo(
    () =>
      shapesForClass(part, {
        familyId,
        ledColor: values?.color,
        connectorType: values?.type,
      }),
    [part, familyId, values?.color, values?.type],
  )
  if (shapes.length === 0) return null

  const laidOut = layout(shapes)
  const span = Math.max(laidOut.span, 4)
  const tallest = Math.max(...shapes.map(boundingHeight), 1)
  const chipOnly = isChipLineup(shapes)
  const dist = lineupCameraDistance(laidOut.span, tallest, shapes)
  const camPos: [number, number, number] = chipOnly
    ? [dist * 0.18, dist * 0.82, dist * 0.52]
    : [dist * 0.35, dist * 0.55, dist]

  return (
    <section aria-label="3D package view" className="panel overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div>
          <h2 className="text-sm font-medium">3D packages</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            One millimetre is one unit. Drag to orbit. Click a body to set the package.
          </p>
        </div>
      </div>
      <div className="h-[22rem] w-full sm:h-[26rem]">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={camPos} fov={30} up={[0, 1, 0]} near={0.1} far={500} />
          <color attach="background" args={[theme.sceneBg]} />
          <ambientLight intensity={0.75} />
          <directionalLight
            position={[span * 0.4, dist, span * 0.3]}
            intensity={1.15}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-span * 0.5, dist * 0.5, -span * 0.2]} intensity={0.35} />
          <hemisphereLight args={['#ffffff', theme.sceneGround, 0.4]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[span * 4, span * 4]} />
            <meshStandardMaterial color={theme.sceneGround} roughness={0.9} metalness={0} />
          </mesh>
          <gridHelper args={[span * 2, Math.max(8, Math.round(span)), theme.grid, theme.gridFine]} position={[0, 0.01, 0]} />
          {laidOut.items.map((item) => (
            <group key={item.shape.id} position={[item.x, 0, 0]}>
              <PackageMesh
                shape={item.shape}
                selected={selected === item.shape.id}
                onSelect={onSelect}
              />
            </group>
          ))}
          <OrbitControls
            makeDefault
            target={[0, tallest * 0.35, 0]}
            enablePan={false}
            minDistance={chipOnly ? 1.2 : 3}
            maxDistance={span * 3}
            maxPolarAngle={Math.PI / 2 - 0.08}
          />
        </Canvas>
      </div>
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            type="button"
            aria-pressed={selected === shape.id}
            onClick={() => onSelect?.(shape.id)}
            className={
              selected === shape.id
                ? 'rounded-md bg-primary px-2 py-1 font-mono text-xs text-primary-foreground'
                : 'rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground'
            }
          >
            {shape.label}
          </button>
        ))}
      </div>
    </section>
  )
}

function layout(shapes: PackageShape[]): { items: { shape: PackageShape; x: number }[]; span: number } {
  const widths = shapes.map(boundingWidth)
  const gap = Math.max(1.8, Math.max(...widths, 1) * 0.4)
  const total = widths.reduce((sum, w) => sum + w, 0) + gap * (shapes.length - 1)
  let cursor = -total / 2
  const items = shapes.map((shape, index) => {
    const width = widths[index]!
    const x = cursor + width / 2
    cursor += width + gap
    return { shape, x }
  })
  return { items, span: total }
}
