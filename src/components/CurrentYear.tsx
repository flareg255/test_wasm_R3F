"use client";

import { useSyncExternalStore } from "react";

// 値の変化を通知する必要はないため購読は何もしない
const subscribe = () => () => {};

// コピーライト表記の年を表示するコンポーネント。
// SSR とハイドレーション時は fallback（ビルド時の年）を使って hydration 不一致を避け、
// ハイドレーション後は閲覧者の現在年を表示する。
export function CurrentYear({ fallback }: { fallback: number }) {
    const year = useSyncExternalStore(
        subscribe,
        () => new Date().getFullYear(),
        () => fallback,
    );

    return <>{year}</>;
}
