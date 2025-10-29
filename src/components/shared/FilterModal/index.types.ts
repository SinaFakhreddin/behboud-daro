import {GenderType} from "@/http/types/DoctorService.types";

export type FilterFormType = {
    gender:GenderType | null,
    dociName:string | null

}