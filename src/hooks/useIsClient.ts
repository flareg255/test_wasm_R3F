import { useSyncExternalStore } from 'react';

// 値が変化しないため購読は不要(何もしない解除関数を返す)
const subscribe = () => () => {};

// クライアントで描画されているかを返す。
// SSR とハイドレーション中は false、ハイドレーション後は true になる。
export function useIsClient() {
    return useSyncExternalStore(subscribe, () => true, () => false);
}
