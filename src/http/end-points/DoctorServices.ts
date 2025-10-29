import { httpService } from '@/http/httpServices';
import { GetAllDoctorsRq, GetAllDoctorsRs } from '@/http/types/DoctorService.types';

export const DoctorServicePath = '/api/v1';

async function getAllDoctors(params?: GetAllDoctorsRq) {
  return httpService.get<GetAllDoctorsRs>(`${DoctorServicePath}/contracted-doctors`, {
    headers: { 'Cache-Control': 'no-store' },
  });
}

export const DoctorServices = {
  getAllDoctors,
};
