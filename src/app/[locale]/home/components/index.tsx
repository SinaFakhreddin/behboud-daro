import {DoctorServices} from '@/http/end-points/DoctorServices';
import DoctorCard from "@/app/[locale]/home/components/doctorCard";
import PaginationComponent from "@/app/[locale]/home/components/paginationComponent";
import {Title} from "@mantine/core";
import {DoctorsData} from "@/http/types/DoctorService.types";
import {MetaRs, PaginationResponse} from "@/types/generalTypes";
import {Filter} from "lucide-react";
import FilterSection from "@/app/[locale]/home/components/filterSection";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getDoctors({
                              profession_ids,
                              page,
                              province_ids
                          }: {
    page: number;
    profession_ids?: string[];
    province_ids?: string[]
}) {
    console.log("KIR",province_ids , profession_ids);


    try {
        const res = await DoctorServices.getAllDoctors({
            page,
            limit: 10,
            profession_ids,
            province_ids
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


    const currentPage = Number(searchParams?.page) || 1;
    const profession_ids_raw =
        searchParams?.profession_ids ||
        searchParams?.["profession_ids[]"] ||
        [];

    const profession_ids = Array.isArray(profession_ids_raw)
        ? profession_ids_raw
        : profession_ids_raw
            ? [profession_ids_raw]
            : [];

    const province_ids_raw =
        searchParams?.province_ids ||
        searchParams?.["province_ids[]"] ||
        [];

    const province_ids = Array.isArray(province_ids_raw)
        ? province_ids_raw
        : province_ids_raw
            ? [province_ids_raw]
            : [];

    const data = await getDoctors({page: currentPage, profession_ids: profession_ids , province_ids });

    return (
        <div className=" container p-8 bg-white rounded-md mt-10">
            <div
                className='flex md:justify-between'
                // className="bg-red-800 md:bg-amber-400 xs:bg-blue-500 sm:flex-col md:flex-col lg:flex-row lg:justify-between mb-8"
            >
                <text
                    className='text-lg font-bold '
                >لیست پزشکان</text>
                <FilterSection/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3 rounded-xl overflow-y-auto h-[80vh]">
                {data.data.items.length > 0 ? (
                    data.data.items.map((doc) => <DoctorCard key={doc.id} doctor={doc}/>)
                ) : (
                    <p className="text-center text-gray-500">هیچ پزشکی یافت نشد</p>
                )}
            </div>
            <div className="flex w-full justify-end mt-4">
                <PaginationComponent
                    total={Math.ceil(data?.data.meta.total / 10)}
                    current={currentPage}
                />
            </div>

        </div>
    );
}
