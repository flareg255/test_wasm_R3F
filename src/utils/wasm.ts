let wasmInitPromise: Promise<typeof import("@/wasm-lib/pkg/wasm_lib")> | null = null;


export const initWasm = async () => {
    if (!wasmInitPromise) {
        wasmInitPromise = import("@/wasm-lib/pkg/wasm_lib").then(async (mod) => {

            const exports = await mod.default();


            if (!(window as any).wasmMemory) {

                (window as any).wasmMemory = exports.memory;
            }

            return mod;

        });
    }
    return wasmInitPromise;
};

