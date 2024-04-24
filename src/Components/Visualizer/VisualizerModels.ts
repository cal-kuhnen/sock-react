import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";

export interface Visuals {
  visualize: boolean;
  audio: AnalyserNode | null;
}

export interface SphereObject {
  xPos: number;
  zPos: number;
  mesh: Mesh<SphereGeometry, MeshStandardMaterial>;
}