import { httpService } from '@/http/httpServices';
import {createDoctorRq, DoctorsData, GetAllDoctorsRq} from '@/http/types/DoctorService.types';
import {MetaRs, PaginationResponse} from "@/types/generalTypes";
import qs from "qs"
import {supabase} from "@/app/lib/supaBaseClient";

export const DoctorServicePath = '/api/v1';

async function getAllDoctors(params?: GetAllDoctorsRq) {
    return httpService.get<PaginationResponse<DoctorsData, MetaRs>>(
      `${DoctorServicePath}/contracted-doctors`,
      {
        headers: {
            'Cache-Control': 'no-store',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Inertia': 'true',
            'Content-Type': 'application/json',
        },
        params,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
      }
  );
}
async function createDoctor(payload?: createDoctorRq) {
    const { data, error } = await supabase
        .from("doctors")
        .insert([payload])
        .select();

    if (error) throw new Error(error.message);
    return data;
}

export const DoctorServices = {
  getAllDoctors , createDoctor
};
