"use client";

import type { SessionEnvs } from "@/http/types/GeneralServiceTypes";
import envStore from "@/store/envStore";
import { Flex, Loader } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Props = PropsWithChildren<{
	envs: SessionEnvs;
}>;

export function EnvProvider(props: Props) {
	const store = useStore(
		envStore,
		useShallow((state) => ({
			envs: state.envs,
			setEnv: state.setEnvs,
		})),
	);
	// biome-ignore lint: useExhaustiveDependencies
	useEffect(() => {
		store.setEnv(props.envs);
	}, [props.envs]);

	if (!store.envs.baseUrl) {
		return (
			<Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
				<Loader />
			</Flex>
		);
	}

	return <>{props.children}</>;
}
