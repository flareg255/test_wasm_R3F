"use client";

import { useState, useEffect } from "react";

// コピーライト表記の年を表示するコンポーネント。
// fallback（ビルド時の年）を初期値にすることで SSR と初回描画を一致させ、
// hydration 不一致を避けつつ、マウント後に閲覧者の現在年へ更新する。
export function CurrentYear({ fallback }: { fallback: number }) {
    const [year, setYear] = useState(fallback);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return <>{year}</>;
}
