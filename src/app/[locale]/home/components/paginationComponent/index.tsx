"use client";

import { Pagination, Flex } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
    total: number;
    current: number;
    onChange:(value:number)=>void
};

export default function PaginationComponent({ total, current ,onChange }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (page: number) => {
            onChange(page)
        // const params = new URLSearchParams(searchParams);
        // params.set("page", String(page));
        // router.push(`?${params.toString()}`);
    };

    console.log("total",total)

    return (
        <Flex justify="center" mt={16}>
            <Pagination total={total} value={current} onChange={handleChange} />
        </Flex>
    );
}
