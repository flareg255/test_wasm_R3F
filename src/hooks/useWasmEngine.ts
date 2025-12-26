import { useState, useEffect } from 'react';
import { initWasm } from '../utils/wasm';

type WasmEngine = {
    free?: () => void;
    [key: string]: any;
};

export function useWasmEngine<T extends WasmEngine>(
    createEngine: (module: any) => T,
    deps: any[] = []
): T | null {
    const [engine, setEngine] = useState<T | null>(null);

    useEffect(() => {
        let active = true;
        let instance: T | null = null;

        initWasm().then((mod) => {
            if (active) {
                try {
                    instance = createEngine(mod);
                    setEngine(instance);
                } catch (e) {
                    console.error("Failed to initialize Wasm engine:", e);
                }
            }
        });

        return () => {
            active = false;
            // Clean up the instance if it was created and has a free method
            if (instance && typeof instance.free === 'function') {
                instance.free();
            }
            setEngine(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return engine;
}
