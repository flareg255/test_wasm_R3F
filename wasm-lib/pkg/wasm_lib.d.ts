/* tslint:disable */
/* eslint-disable */

export class PhysicsEngine {
  free(): void;
  [Symbol.dispose](): void;
  get_brightness(index: number): number;
  get_color_type(index: number): number;
  get_all_particles(): Float32Array;
  constructor(num: number);
  get_x(index: number): number;
  get_y(index: number): number;
  get_z(index: number): number;
  update(): void;
}

export class VerticalStreamEngine {
  free(): void;
  [Symbol.dispose](): void;
  get_all_particles(): Float32Array;
  constructor(num: number);
  update(): void;
}

export class WaveLineEngine {
  free(): void;
  [Symbol.dispose](): void;
  get_z_offset(line_index: number): number;
  get_wave_values(line_index: number): number;
  constructor(count: number, segments: number, width: number);
  update(time: number): void;
}

export function calculate_rotation(time: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_wavelineengine_free: (a: number, b: number) => void;
  readonly calculate_rotation: (a: number) => number;
  readonly wavelineengine_get_wave_values: (a: number, b: number) => number;
  readonly wavelineengine_get_z_offset: (a: number, b: number) => number;
  readonly wavelineengine_new: (a: number, b: number, c: number) => number;
  readonly wavelineengine_update: (a: number, b: number) => void;
  readonly __wbg_verticalstreamengine_free: (a: number, b: number) => void;
  readonly verticalstreamengine_get_all_particles: (a: number) => [number, number];
  readonly verticalstreamengine_new: (a: number) => number;
  readonly verticalstreamengine_update: (a: number) => void;
  readonly __wbg_physicsengine_free: (a: number, b: number) => void;
  readonly physicsengine_get_all_particles: (a: number) => [number, number];
  readonly physicsengine_get_brightness: (a: number, b: number) => number;
  readonly physicsengine_get_color_type: (a: number, b: number) => number;
  readonly physicsengine_get_x: (a: number, b: number) => number;
  readonly physicsengine_get_y: (a: number, b: number) => number;
  readonly physicsengine_get_z: (a: number, b: number) => number;
  readonly physicsengine_new: (a: number) => number;
  readonly physicsengine_update: (a: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
