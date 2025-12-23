"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// 初回レンダリングのみを判定するためのフラグ（モジュールスコープ）
let isFirstRender = true;

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // フラグを更新するためのEffect
    useEffect(() => {
        isFirstRender = false;
    }, []);

    // トップページかつ初回アクセスの場合はアニメーションしない
    const isHomePage = pathname === "/";
    if (isHomePage && isFirstRender) {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
