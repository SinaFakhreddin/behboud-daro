import type { SessionEnvs } from "@/http/types/GeneralServiceTypes";
import { createStore } from "zustand";

export type PanelEnvStoreType = {
	envs: SessionEnvs;
	setEnvs: (envs: SessionEnvs) => void;
};

const envStore = createStore<PanelEnvStoreType>((set) => ({
	envs: {
		baseUrl: process.env.BASE_URL,
	},
	setEnvs: (envs) => set({ envs }),
}));

export default envStore;
