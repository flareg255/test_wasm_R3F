// WASM モジュール(wasm-pack が生成したバインディング)の型
export type WasmModule = typeof import("@/wasm-lib/pkg/wasm_lib");

declare global {
    interface Window {
        // WaveLine の描画で WASM の線形メモリを直接参照するために公開する
        wasmMemory?: WebAssembly.Memory;
    }
}

let wasmInitPromise: Promise<WasmModule> | null = null;


export const initWasm = async () => {
    if (!wasmInitPromise) {
        wasmInitPromise = import("@/wasm-lib/pkg/wasm_lib").then(async (mod) => {

            const exports = await mod.default();


            if (!window.wasmMemory) {

                window.wasmMemory = exports.memory;
            }

            return mod;

        });
    }
    return wasmInitPromise;
};
