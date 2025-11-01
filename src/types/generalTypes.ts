import {AxiosError} from "axios";

export type LabelValueType = {
    label: string;
    value: string;
};


export type PaginationResponse<T, M = unknown> = {
    data: {
        items: T[];
        meta: M;
    };
    status: number;
};


export type CustomErrorRs = AxiosError<{
    code: number
  ,
    details: string | null,
    hint: string | null,
    message: string
}>;


export type MetaRs = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};