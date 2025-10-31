import {GenderType} from "@/http/types/DoctorService.types";

export type NewDoctorFormType = {
    name: string;
    specialty: string;
    phone: string;
    province: string;
    gender: GenderType;
}