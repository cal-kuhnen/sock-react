import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";

export interface Visuals {
  begin: boolean;
  audio: AnalyserNode | null;
}

export interface SphereObject {
  xPos: number;
  zPos: number;
  mesh: Mesh<SphereGeometry, MeshStandardMaterial>;
}