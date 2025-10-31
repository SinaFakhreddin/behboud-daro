import {PaginationResponse} from "@/types/generalTypes";

export type GetAllDoctorsRq = {
  page?: number;
  gender?:GenderType;
  province_ids?: Array<string>;
  profession_ids?: Array<string>
  limit?: number;
  q?:string
};

export type createDoctorRq = {
  name: string;
  specialty: string;
  phone: string;
  province: string;
  gender: string;
};

export type ProfessionalsDataType = {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  parent_id: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ProvinceData = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export enum GenderType {
  MALE="male",
  FEMALE="female",
  NONE=""
}
export type DoctorsData = {
  id: number;
  profile_image: string;
  full_name: string;
  profession_name: string;
  profession_id: number;
  city_name: string;
  city_id: number;
  province_name: string;
  province_id: number;
  comments_count: number;
  average_rating: number;
  medical_system_code: string;
  phone: string;
  bio: string;
  address: string;
  gender: GenderType;
  withdraw_count: number;
  experience_years: number;
  partnership_months: number;
  transaction_count: number;
};

export type LinksRs = {
  first: string;
  last: string;
  prev: string | null;
  next: string;
};

export type LinkRs = {
  url: string | null;
  label: string;
  active: boolean;
};


