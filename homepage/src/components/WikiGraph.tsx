import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useMemo, useState, useCallback, useEffect } from 'react'
import * as THREE from 'three'
import type { WikiBundle } from '../types/wiki'
import { CATEGORY_COLORS, catLabel, fmtViews, fmtDate } from '../utils/wiki'
import { VideoModal } from './VideoModal'

// -- Types --

interface GraphNode {
  id: string
  title: string
  views: number
  category: string
  x: number
  y: number
  z: number
  tags: string[]
  date: string
  hasDetail: boolean
}

interface GraphEdge {
  from: number
  to: number
  weight: number
}

// -- Constants --

const CATEGORY_ANGLES: Record<string, number> = {
  development: 0,
  kubernetes: (Math.PI * 2) / 6,
  finance: (2 * Math.PI * 2) / 6,
  korea: (3 * Math.PI * 2) / 6,
  security: (4 * Math.PI * 2) / 6,
  programming: (5 * Math.PI * 2) / 6,
}

// -- Seeded PRNG --

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

function hashString(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 31 + s.charCodeAt(i)) | 0
  }
  return hash
}

// -- Layout computation --

function buildGraph(wiki: WikiBundle): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = []
  const videoTags = new Map<string, string[]>()

  for (const cat of wiki.categories) {
    const tagsByVideo = new Map<string, Set<string>>()
    for (const cluster of cat.clusters) {
      for (const v of cluster.videos) {
        if (!tagsByVideo.has(v.id)) tagsByVideo.set(v.id, new Set())
        tagsByVideo.get(v.id)!.add(cluster.name.toLowerCase())
      }
    }
    for (const v of cat.videos) {
      if (!tagsByVideo.has(v.id)) tagsByVideo.set(v.id, new Set())
    }
    for (const v of cat.videos) {
      const tags = tagsByVideo.get(v.id)
      videoTags.set(v.id, tags ? [...tags] : [])
    }
  }

  for (const cat of wiki.categories) {
    const angle = CATEGORY_ANGLES[cat.name] || 0
    const catRadius = 25
    const cx = Math.cos(angle) * catRadius
    const cz = Math.sin(angle) * catRadius

    for (let i = 0; i < cat.videos.length; i++) {
      const v = cat.videos[i]
      const t = i / Math.max(cat.videos.length - 1, 1)
      const r = 3 + t * 12
      const a = i * 2.399
      const y = (seededRandom(hashString(v.id)) - 0.5) * 10

      nodes.push({
        id: v.id,
        title: v.title,
        views: v.views,
        date: v.date,
        category: cat.name,
        x: cx + Math.cos(a) * r,
        y,
        z: cz + Math.sin(a) * r,
        tags: videoTags.get(v.id) || [],
        hasDetail: !!v.detail,
      })
    }
  }

  const edges: GraphEdge[] = []
  const tagIndex = new Map<string, number[]>()

  for (let i = 0; i < nodes.length; i++) {
    for (const tag of nodes[i].tags) {
      if (!tagIndex.has(tag)) tagIndex.set(tag, [])
      tagIndex.get(tag)!.push(i)
    }
  }

  const edgeSet = new Set<string>()
  for (const [, indices] of tagIndex) {
    const limited = indices.length > 30 ? indices.slice(0, 30) : indices
    for (let i = 0; i < limited.length; i++) {
      for (let j = i + 1; j < limited.length; j++) {
        const a = limited[i]
        const b = limited[j]
        const key = a < b ? `${a}-${b}` : `${b}-${a}`
        if (!edgeSet.has(key)) {
          edgeSet.add(key)
          edges.push({ from: a, to: b, weight: 1 })
        }
      }
    }
  }

  for (const ct of wiki.crossCategoryTags) {
    const matching = nodes
      .map((n, i) => ({ i, n }))
      .filter(({ n }) => n.tags.some((t) => t.includes(ct.tag)))
    for (let i = 0; i < matching.length && i < 10; i++) {
      for (let j = i + 1; j < matching.length && j < 10; j++) {
        const a = matching[i].i
        const b = matching[j].i
        const key = a < b ? `${a}-${b}` : `${b}-${a}`
        if (!edgeSet.has(key)) {
          edgeSet.add(key)
          edges.push({ from: a, to: b, weight: 0.5 })
        }
      }
    }
  }

  return { nodes, edges }
}

// -- Force simulation --

function simulate(nodes: GraphNode[], edges: GraphEdge[], iterations: number) {
  const positions = nodes.map((n) => [n.x, n.y, n.z])

  for (let iter = 0; iter < iterations; iter++) {
    const alpha = 1 - iter / iterations
    const repulsion = 2.0 * alpha
    const attraction = 0.01 * alpha

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0]
        const dy = positions[i][1] - positions[j][1]
        const dz = positions[i][2] - positions[j][2]
        // Cull far pairs on squared distance first — skips most sqrt calls.
        // 894.01 === (30 - 0.1)^2 preserves the original dist > 30 cutoff.
        const distSq = dx * dx + dy * dy + dz * dz
        if (distSq > 894.01 || distSq < 1e-8) continue
        const dist = Math.sqrt(distSq) + 0.1
        const force = repulsion / (dist * dist)
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        const fz = (dz / dist) * force
        positions[i][0] += fx
        positions[i][1] += fy
        positions[i][2] += fz
        positions[j][0] -= fx
        positions[j][1] -= fy
        positions[j][2] -= fz
      }
    }

    for (const edge of edges) {
      const a = positions[edge.from]
      const b = positions[edge.to]
      const dx = b[0] - a[0]
      const dy = b[1] - a[1]
      const dz = b[2] - a[2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1
      const force = attraction * dist * edge.weight
      const fx = (dx / dist) * force
      const fy = (dy / dist) * force
      const fz = (dz / dist) * force
      a[0] += fx
      a[1] += fy
      a[2] += fz
      b[0] -= fx
      b[1] -= fy
      b[2] -= fz
    }

    for (const pos of positions) {
      pos[0] *= 0.998
      pos[1] *= 0.995
      pos[2] *= 0.998
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].x = positions[i][0]
    nodes[i].y = positions[i][1]
    nodes[i].z = positions[i][2]
  }
}

// -- Three.js Components (render-only, no event handlers) --

function Nodes({
  nodes,
  meshRef,
}: {
  nodes: GraphNode[]
  meshRef: React.RefObject<THREE.InstancedMesh | null>
}) {
  const tempObj = useMemo(() => new THREE.Object3D(), [])
  const tempColor = useMemo(() => new THREE.Color(), [])

  const maxViews = useMemo(
    () => Math.max(...nodes.map((n) => n.views), 1),
    [nodes],
  )

  useEffect(() => {
    if (!meshRef.current) return
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      const scale = 0.3 + (n.views / maxViews) * 1.2
      tempObj.position.set(n.x, n.y, n.z)
      tempObj.scale.set(scale, scale, scale)
      tempObj.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObj.matrix)
      tempColor.set(CATEGORY_COLORS[n.category] || '#ffffff')
      meshRef.current.setColorAt(i, tempColor)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true

    // Recompute bounding sphere to encompass all instance positions.
    // Without this, the first raycast caches a tiny sphere from
    // identity matrices and subsequent hit-tests silently miss.
    meshRef.current.computeBoundingSphere()
  }, [nodes, maxViews, tempObj, tempColor, meshRef])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

function Edges({ nodes, edges }: { nodes: GraphNode[]; edges: GraphEdge[] }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6)
    const colors = new Float32Array(edges.length * 6)

    for (let i = 0; i < edges.length; i++) {
      const a = nodes[edges[i].from]
      const b = nodes[edges[i].to]
      const offset = i * 6

      positions[offset] = a.x
      positions[offset + 1] = a.y
      positions[offset + 2] = a.z
      positions[offset + 3] = b.x
      positions[offset + 4] = b.y
      positions[offset + 5] = b.z

      const colA = new THREE.Color(CATEGORY_COLORS[a.category] || '#ffffff')
      const colB = new THREE.Color(CATEGORY_COLORS[b.category] || '#ffffff')

      colors[offset] = colA.r
      colors[offset + 1] = colA.g
      colors[offset + 2] = colA.b
      colors[offset + 3] = colB.r
      colors[offset + 4] = colB.g
      colors[offset + 5] = colB.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [nodes, edges])

  // Manually-created BufferGeometry isn't auto-disposed by R3F on unmount.
  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.35} />
    </lineSegments>
  )
}

// -- Hover Popup (HTML overlay, fixed positioning) --

const POPUP_WIDTH = 320
const POPUP_HEIGHT = 280
const POPUP_OFFSET = 16

function HoverPopup({
  node,
  mouseX,
  mouseY,
}: {
  node: GraphNode
  mouseX: number
  mouseY: number
}) {
  const color = CATEGORY_COLORS[node.category] || '#888'

  let left = mouseX + POPUP_OFFSET
  let top = mouseY + POPUP_OFFSET

  if (left + POPUP_WIDTH > window.innerWidth) {
    left = mouseX - POPUP_WIDTH - POPUP_OFFSET
  }
  if (top + POPUP_HEIGHT > window.innerHeight) {
    top = mouseY - POPUP_HEIGHT - POPUP_OFFSET
  }

  left = Math.max(8, Math.min(left, window.innerWidth - POPUP_WIDTH - 8))
  top = Math.max(8, Math.min(top, window.innerHeight - POPUP_HEIGHT - 8))

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ left, top, width: POPUP_WIDTH }}
    >
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-[#1e232b]/10">
        {/* Thumbnail */}
        <div className="relative bg-[#f0f0ec]">
          <img
            src={`https://img.youtube.com/vi/${node.id}/mqdefault.jpg`}
            alt=""
            className="w-full aspect-video object-cover"
            loading="eager"
          />
          {/* Category pill on thumbnail */}
          <div
            className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[9px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: color }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
            {catLabel(node.category)}
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h4 className="font-serif italic text-sm text-[#1e232b] leading-snug mb-2 line-clamp-2">
            {node.title}
            {node.hasDetail && (
              <svg
                className="inline-block w-3.5 h-3.5 ml-1.5 -mt-0.5 text-[#E76F51]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-label="Wiki detail available"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            )}
          </h4>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#1e232b]/40">
            <span>{fmtViews(node.views)} views</span>
            <span>{fmtDate(node.date)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// -- DOM-based raycasting (bypasses R3F event system entirely) --

// Clicks must travel less than this many pixels between pointerdown and click;
// anything more is an orbit drag, not a node selection.
const CLICK_SLOP_PX = 6

function useGraphInteraction(
  nodes: GraphNode[],
  meshRef: React.RefObject<THREE.InstancedMesh | null>,
  cameraRef: React.RefObject<THREE.Camera | null>,
  glRef: React.RefObject<THREE.WebGLRenderer | null>,
) {
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const pointer = useMemo(() => new THREE.Vector2(), [])
  // Distinguishes clicks from orbit drags — without this, releasing a camera
  // rotation over a node opens the video modal unintentionally.
  const downPosRef = useRef<{ x: number; y: number } | null>(null)

  const hitTest = useCallback(
    (clientX: number, clientY: number): GraphNode | null => {
      const camera = cameraRef.current
      const gl = glRef.current
      const mesh = meshRef.current
      if (!camera || !gl || !mesh) return null

      const rect = gl.domElement.getBoundingClientRect()
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObject(mesh)

      if (hits.length > 0 && hits[0].instanceId !== undefined) {
        return nodes[hits[0].instanceId] ?? null
      }
      return null
    },
    [nodes, meshRef, cameraRef, glRef, raycaster, pointer],
  )

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    downPosRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setHoveredNode(hitTest(e.clientX, e.clientY))
    },
    [hitTest],
  )

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const down = downPosRef.current
      if (
        down &&
        Math.hypot(e.clientX - down.x, e.clientY - down.y) > CLICK_SLOP_PX
      ) {
        return
      }
      const node = hitTest(e.clientX, e.clientY)
      if (node) setSelectedVideoId(node.id)
    },
    [hitTest],
  )

  return {
    hoveredNode,
    selectedVideoId,
    setSelectedVideoId,
    mousePos,
    handlePointerDown,
    handlePointerMove,
    handleClick,
  }
}

// -- Main Export --

export function WikiGraph({ wiki }: { wiki: WikiBundle }) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null)
  const cameraRef = useRef<THREE.Camera | null>(null)
  const glRef = useRef<THREE.WebGLRenderer | null>(null)

  const { nodes, edges } = useMemo(() => {
    const graph = buildGraph(wiki)
    simulate(graph.nodes, graph.edges, 80)
    return graph
  }, [wiki])

  const {
    hoveredNode,
    selectedVideoId,
    setSelectedVideoId,
    mousePos,
    handlePointerDown,
    handlePointerMove,
    handleClick,
  } = useGraphInteraction(nodes, meshRef, cameraRef, glRef)

  const handleCreated = useCallback(
    (state: { camera: THREE.Camera; gl: THREE.WebGLRenderer }) => {
      cameraRef.current = state.camera
      glRef.current = state.gl
    },
    [],
  )

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default'
    }
  }, [])

  return (
    <div
      className="w-full relative"
      style={{ height: 'calc(100vh - 80px)' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <Canvas
        camera={{ position: [0, 20, 60], fov: 50 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
        style={{ cursor: hoveredNode ? 'pointer' : 'grab' }}
        onCreated={handleCreated}
      >
        <Edges nodes={nodes} edges={edges} />
        <Nodes nodes={nodes} meshRef={meshRef} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={120}
          enablePan
        />
      </Canvas>

      {hoveredNode && (
        <HoverPopup
          node={hoveredNode}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      )}

      <VideoModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </div>
  )
}
