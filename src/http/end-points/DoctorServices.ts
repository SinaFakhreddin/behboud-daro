import { httpService } from '@/http/httpServices';
import {DoctorsData, GetAllDoctorsRq} from '@/http/types/DoctorService.types';
import {MetaRs, PaginationResponse} from "@/types/generalTypes";
import qs from "qs"

export const DoctorServicePath = '/api/v1';

async function getAllDoctors(params?: GetAllDoctorsRq) {

    console.log('>>> Request params:', qs.stringify(params, { arrayFormat: 'brackets' }));


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

export const DoctorServices = {
  getAllDoctors,
};
