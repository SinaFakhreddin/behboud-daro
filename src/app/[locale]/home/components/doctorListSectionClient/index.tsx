"use client";

import FilterSection from "@/app/[locale]/home/components/filterSection";
import DoctorCard from "@/app/[locale]/home/components/doctorCard";
import PaginationComponent from "@/app/[locale]/home/components/paginationComponent";
import {LoadingOverlay} from "@mantine/core";
import {DoctorsData, GenderType, GetAllDoctorsRq} from "@/http/types/DoctorService.types";
import {MetaRs, PaginationResponse} from "@/types/generalTypes";
import {useState} from "react";
import {useSearchApiCall} from "@/app/[locale]/home/components/index.hooks";
import Button from "@/components/shared/Button";
import {useI18n} from "../../../../../../locales/client";

type Props = {
    initialData?: PaginationResponse<DoctorsData, MetaRs>;
};

export default function DoctorListSectionClient({initialData}: Props) {
    const [paramsRq, setParamsRq] = useState<GetAllDoctorsRq | undefined>(undefined);
    const t = useI18n()
    const {doctorData, loading, hasNextPage, fetchNextPage} = useSearchApiCall({
        doctorsDataRq: paramsRq,
        initialData,
    });

    const doctors = doctorData


    return (
        <>
            <div className="flex md:justify-between">
                <text className="text-lg font-bold">{t("doctorsList")}</text>
                <FilterSection
                    onAdvancedFilterSubmit={(value) => setParamsRq(prevState => ({
                        ...prevState,
                        q: value.dociName || "",
                        gender: value.gender || GenderType.FEMALE
                    }))}
                    initialFormValue={{
                        dociName: paramsRq?.q || "",
                        gender: paramsRq?.gender || GenderType.FEMALE
                    }}
                    onProfessionChange={(value) =>
                        setParamsRq(prev => {
                            const updated = {...prev};
                            if (!value || value.length === 0) {
                                delete updated.profession_ids;
                            } else {
                                updated.profession_ids = [value];
                            }
                            return updated;
                        })
                    }
                    onProvinceChange={(value) =>
                        setParamsRq(prev => {
                            const updated = {...prev};
                            if (!value || value.length === 0) {
                                delete updated.province_ids;
                            } else {
                                updated.province_ids = [value];
                            }
                            return updated;
                        })}
                    onClearFormHandler={() => setParamsRq(prevState => ({
                        ...prevState,
                        gender: GenderType.NONE,
                        q: ""
                    }))}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3 rounded-xl overflow-y-auto h-[80vh]">
                <LoadingOverlay visible={loading}/>
                {doctors.pages.length > 0 ? (
                    doctors.pages.map((page) => {

                        return page?.data?.items?.map((doc) => (<DoctorCard key={doc.id} doctor={doc}/>))

                    })
                ) : (
                    <p className="text-center text-gray-500">{t("noDoctorResults")}</p>
                )}
            </div>

            <div className={`flex w-full ${hasNextPage ? "justify-between" : "justify-end"} mt-4`}>
                {hasNextPage && <Button size={'sm'} onClick={() => fetchNextPage()} variant='outline'>{t("more")}</Button>}
                <PaginationComponent
                    total={Math.ceil((doctorData?.pages[0].data.meta.total || 0) / 10)}
                    current={doctorData?.pages[doctorData?.pages.length-1].data.meta.current_page || 1}
                    onChange={(page) => setParamsRq({...paramsRq, page})}
                />
            </div>
        </>
    );
}
