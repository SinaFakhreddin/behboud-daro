"use client";

import { Pagination, Flex } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
    total: number;
    current: number;
};

export default function PaginationComponent({ total, current }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        router.push(`?${params.toString()}`);
    };

    return (
        <Flex justify="center" mt={16}>
            <Pagination total={total} value={current} onChange={handleChange} />
        </Flex>
    );
}
