import { type ThreeEvent } from '@react-three/fiber'

import { CanBody, FilmBody, TantalumBody } from '@/components/models/capacitors'
import { ChipBody } from '@/components/models/ChipBody'
import { HeaderBody, Rj45Body, TerminalBlockBody, UsbCBody } from '@/components/models/connectors'
import { DiodeTabBody, LedDomeBody } from '@/components/models/diodes'
import { DipBody, QfnBody, SoicBody } from '@/components/models/ics'
import { CommonModeBody, PowerInductorBody } from '@/components/models/inductors'
import { ArrayBody } from '@/components/models/resistors'
import { Sot23Body, To92Body } from '@/components/models/transistors'
import type { PackageShape } from '@/lib/packageShapes'

type PackageMeshProps = {
  shape: PackageShape
  selected?: boolean
  onSelect?: (id: string) => void
}

export function PackageMesh({ shape, selected, onSelect }: PackageMeshProps) {
  const emissive = selected ? '#111111' : '#000000'
  const emissiveIntensity = selected ? 0.12 : 0

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    onSelect?.(shape.id)
  }

  const radius = markerRadius(shape)
  return (
    <group onClick={onSelect ? handleClick : undefined}>
      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[radius * 0.7, radius, 48]} />
          <meshBasicMaterial color="#c5c9d0" />
        </mesh>
      ) : null}
      <ShapeBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    </group>
  )
}

function ShapeBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: PackageShape
  emissive: string
  emissiveIntensity: number
}) {
  switch (shape.type) {
    case 'chip':
      return <ChipBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'array':
      return <ArrayBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'can':
      return <CanBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'block':
      return (
        <mesh position={[0, shape.height / 2, 0]} castShadow>
          <boxGeometry args={[shape.length, shape.height, shape.width]} />
          <meshStandardMaterial
            color={shape.color}
            roughness={0.45}
            metalness={0.08}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      )
    case 'tantalum':
      return <TantalumBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'power':
      return <PowerInductorBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'common-mode':
      return <CommonModeBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'film':
      return <FilmBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'sod':
    case 'sma':
      return <DiodeTabBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'sot23':
      return <Sot23Body emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'to92':
      return <To92Body emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'soic':
    case 'tssop':
      return <SoicBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'qfn':
      return <QfnBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'dip':
      return <DipBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'header':
      return <HeaderBody shape={shape} />
    case 'led-tht':
      return (
        <LedDomeBody
          diameter={shape.diameter}
          color={shape.color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      )
    case 'usbc':
      return <UsbCBody />
    case 'rj45':
      return <Rj45Body />
    case 'tb':
      return <TerminalBlockBody poles={shape.poles} />
    default:
      return null
  }
}

function markerRadius(shape: PackageShape): number {
  switch (shape.type) {
    case 'chip':
    case 'array':
      return Math.max(shape.length, shape.width) * 0.7
    case 'can':
      return shape.diameter * 0.7
    case 'header':
      return (Math.max(shape.rows, shape.cols) * shape.pitch) / 2 + 1.2
    case 'block':
    case 'tantalum':
    case 'power':
    case 'common-mode':
    case 'sod':
    case 'sma':
    case 'film':
    case 'soic':
    case 'tssop':
    case 'qfn':
    case 'dip':
      return Math.max(shape.length, shape.width) * 0.7
    case 'sot23':
      return 2.0
    case 'to92':
      return 3.4
    case 'led-tht':
      return shape.diameter * 0.8
    case 'usbc':
      return 5.5
    case 'rj45':
      return 10
    case 'tb':
      return 7
    default:
      return 2
  }
}