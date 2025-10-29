"use client";

import useMantineBaseTheme from "@/hooks/useMantineBaseTheme";
import { type MantineColorScheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { PropsWithChildren } from "react";

export default function MantineBaseProvider(props: PropsWithChildren) {
	const { mantineBaseTheme } = useMantineBaseTheme();

	const defaultTheme = window.localStorage.getItem(
		"mantine-color-scheme-value",
	) as MantineColorScheme | undefined;

	return (
		<MantineProvider
			defaultColorScheme={defaultTheme === "dark" ? "dark" : "light"}
			withCssVariables
			theme={mantineBaseTheme}
		>
			<Notifications position="top-right" zIndex={Number.MAX_SAFE_INTEGER} />
			{props.children}
		</MantineProvider>
	);
}
