import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { DoctorServices } from "@/http/end-points/DoctorServices";
import { DoctorsData, GetAllDoctorsRq } from "@/http/types/DoctorService.types";
import { MetaRs, PaginationResponse } from "@/types/generalTypes";
// import {supabase} from "@/app/lib/supaBaseClient";
import {notifications} from "@mantine/notifications";

type ParamsType = {
    doctorsDataRq?: GetAllDoctorsRq;
    initialData?: PaginationResponse<DoctorsData, MetaRs>;
    enabled?: boolean;
};

export const useSearchApiCall = ({
                                     doctorsDataRq,
                                     initialData,
                                     enabled,
                                 }: ParamsType) => {

    const queryKey = ["get-all-doctors", doctorsDataRq?.page, doctorsDataRq?.limit, doctorsDataRq?.profession_ids, doctorsDataRq?.province_ids, doctorsDataRq?.gender, doctorsDataRq?.q];

    const { data, isFetching, refetch , fetchNextPage , hasNextPage } = useInfiniteQuery<PaginationResponse<DoctorsData, MetaRs>>({
        queryKey,
        initialPageParam:doctorsDataRq?.page,
        queryFn: ({ pageParam = doctorsDataRq?.page || 1 }) => {
            console.log("paramsPage",pageParam)
            return DoctorServices.getAllDoctors({ ...doctorsDataRq, page: pageParam as number}).then(res => res.data)
        },
        getNextPageParam: (lastPage) => {

            if (lastPage.data.meta.current_page < lastPage.data.meta.last_page) {
                return lastPage.data.meta.current_page + 1;
            }
            return undefined;
        },
        initialData: initialData
            ? {
                pageParams: [initialData.data.meta.current_page],
                pages: [initialData],
            }
            : undefined,
        enabled: !!doctorsDataRq,
    });

    return {
        doctorData: data,
        loading: isFetching,
        allDoctorsRefetch: refetch,
        fetchNextPage,
        hasNextPage,
    };
};


export const useCreateDoctor = () => {
    const queryClient = useQueryClient();
    const {mutateAsync:createDoctor , isPending:createDoctorPending} =useMutation({
        mutationFn:DoctorServices.createDoctor,
        mutationKey:["create-doctor"],
        onSuccess:()=>{
            notifications.show({
                title:"موفق",
                message:"رکورد جدید ساخته شد",
                color:"green"
            })
            queryClient.invalidateQueries({queryKey:["get-all-doctors"]})
        },
        onError:()=>{
            notifications.show({
                title:"خطا",
                message:"خطایی رخ داد",
                color:"red"
            })
        },
    })


    return {createDoctor , createDoctorPending}
};
