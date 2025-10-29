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




export type MetaRs = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};