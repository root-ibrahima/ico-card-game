"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/game/choix-action-revelation/ActionReveal");
    }, [router]);

    return <div>Chargement...</div>;
};

export default Page;
