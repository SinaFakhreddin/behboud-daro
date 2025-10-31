import {DoctorServices} from '@/http/end-points/DoctorServices';
import DoctorCard from "@/app/[locale]/home/components/doctorCard";
import PaginationComponent from "@/app/[locale]/home/components/paginationComponent";
import {Title} from "@mantine/core";
import {DoctorsData, GenderType} from "@/http/types/DoctorService.types";
import {MetaRs, PaginationResponse} from "@/types/generalTypes";
import {Filter} from "lucide-react";
import FilterSection from "@/app/[locale]/home/components/filterSection";
import DoctorListSectionClient from "@/app/[locale]/home/components/doctorListSectionClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getDoctors({
                              profession_ids,
                              page,
                              province_ids,
    gender,q
                          }: {
    page: number;
    profession_ids?: string[];
    province_ids?: string[];
    q?:string;
    gender?:GenderType
}) {
    console.log("page",page)
    try {
        const res = await DoctorServices.getAllDoctors({
            page,
            limit: 10,
            profession_ids,
            province_ids,
            gender,
            q
        });
        return res.data;
    } catch (e) {
        console.error(e);
        return {
            data: {
                meta: {
                    total: 0,
                    current_page: 1,
                    last_page: 0,
                    per_page: 10,
                },
                items: [],
            },
            status: 404,
        };
    }
}

export default async function ContractedDoctorsPage({
                                                        params,
                                                        searchParams,
                                                    }: {
    params: { locale: string };
    searchParams?: Record<string, any>;
}) {

    console.log("SearchParams",searchParams)

    const currentPage = Number(searchParams?.page) || 1;
    const profession_ids_raw =
        searchParams?.profession_ids ||
        searchParams?.["profession_ids[]"] ||
        [];

    // const profession_ids = Array.isArray(profession_ids_raw)
    //     ? profession_ids_raw
    //     : profession_ids_raw
    //         ? [profession_ids_raw]
    //         : [];

    // const province_ids_raw =
    //     searchParams?.province_ids ||
    //     searchParams?.["province_ids[]"] ||
    //     [];

    // const province_ids = Array.isArray(province_ids_raw)
    //     ? province_ids_raw
    //     : province_ids_raw
    //         ? [province_ids_raw]
    //         : [];

    const data = await getDoctors({page: currentPage}
        // profession_ids: profession_ids ,
        // province_ids ,
        // gender:searchParams?.gender,
        // q:searchParams?.q  }
    );

    console.log("data",data)


    return (
        <div className=" container p-8 bg-white rounded-md mt-10">
            <DoctorListSectionClient initialData={data}/>
        </div>
    );
}
