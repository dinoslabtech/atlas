import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

import { PackageMesh } from '@/components/models/PackageMesh'
import { Button } from '@/components/ui/button'
import {
  boundingHeight,
  focusPose,
  layoutShapes,
  lineupPose,
  shapesForClass,
  type CameraPose,
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
  const [focusId, setFocusId] = useState<string | null>(null)
  const shapes = useMemo(
    () =>
      shapesForClass(part, {
        familyId,
        ledColor: values?.color,
        connectorType: values?.type,
      }),
    [part, familyId, values?.color, values?.type],
  )

  useEffect(() => {
    setFocusId(null)
  }, [part.key])

  const laidOut = useMemo(() => layoutShapes(shapes), [shapes])
  const span = Math.max(laidOut.span, 4)
  const tallest = Math.max(...shapes.map(boundingHeight), 1)
  const pose = useMemo(() => {
    if (focusId) {
      const item = laidOut.items.find((entry) => entry.shape.id === focusId)
      if (item) return focusPose(item.shape, item.x)
    }
    return lineupPose(shapes, laidOut.span, tallest)
  }, [focusId, laidOut, shapes, tallest])

  if (shapes.length === 0) return null

  function inspect(id: string) {
    setFocusId(id)
    onSelect?.(id)
  }

  return (
    <section aria-label="3D package view" className="panel overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div>
          <h2 className="text-sm font-medium">3D packages</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            One millimetre is one unit. Drag to orbit. Click a body to set the package and inspect it.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" disabled={focusId === null} onClick={() => setFocusId(null)}>
          Full view
        </Button>
      </div>
      <div className="h-[22rem] w-full sm:h-[26rem]">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, preserveDrawingBuffer: true, alpha: false }}>
          <PerspectiveCamera makeDefault position={[8, 8, 12]} fov={30} up={[0, 1, 0]} near={0.1} far={500} />
          <color attach="background" args={[theme.sceneBg]} />
          <ambientLight intensity={0.75} />
          <directionalLight
            position={[span * 0.4, Math.max(span, 8), span * 0.3]}
            intensity={1.15}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-span * 0.5, Math.max(span, 8) * 0.5, -span * 0.2]} intensity={0.35} />
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
                onSelect={inspect}
              />
            </group>
          ))}
          <ViewRig pose={pose} />
        </Canvas>
      </div>
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            type="button"
            aria-pressed={selected === shape.id}
            onClick={() => inspect(shape.id)}
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

function ViewRig({ pose }: { pose: CameraPose }) {
  const controls = useRef<OrbitControlsImpl>(null)
  const camera = useThree((state) => state.camera)
  const fromPos = useRef(new Vector3())
  const fromTarget = useRef(new Vector3())
  const toPos = useRef(new Vector3())
  const toTarget = useRef(new Vector3())
  const progress = useRef(1)
  const first = useRef(true)
  const poseRef = useRef(pose)
  poseRef.current = pose
  const poseKey = `${pose.position.join(',')}|${pose.target.join(',')}`

  useEffect(() => {
    toPos.current.set(...pose.position)
    toTarget.current.set(...pose.target)
    if (first.current) return
    fromPos.current.copy(camera.position)
    if (controls.current) fromTarget.current.copy(controls.current.target)
    else fromTarget.current.set(...pose.target)
    progress.current = 0
    if (controls.current) {
      controls.current.minDistance = pose.minDistance
      controls.current.maxDistance = pose.maxDistance
    }
  }, [camera, pose, poseKey])

  useFrame((_, delta) => {
    const rig = controls.current
    if (!rig) return
    if (first.current) {
      const next = poseRef.current
      first.current = false
      camera.position.set(...next.position)
      rig.target.set(...next.target)
      rig.minDistance = next.minDistance
      rig.maxDistance = next.maxDistance
      rig.update()
      progress.current = 1
      return
    }
    if (progress.current >= 1) return
    progress.current = Math.min(1, progress.current + delta / 0.28)
    const eased = 1 - (1 - progress.current) ** 3
    camera.position.lerpVectors(fromPos.current, toPos.current, eased)
    rig.target.lerpVectors(fromTarget.current, toTarget.current, eased)
    rig.update()
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      minDistance={pose.minDistance}
      maxDistance={pose.maxDistance}
      maxPolarAngle={Math.PI / 2 - 0.08}
    />
  )
}
