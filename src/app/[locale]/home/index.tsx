import ContractedDoctorsPage from "@/app/[locale]/home/components";

export default async function HomeComponent({
                                                params,
                                                searchParams,
                                            }: {
    params: { locale: string };
    searchParams?: Record<string, any>;
}) {


    return (<ContractedDoctorsPage params={params} searchParams={searchParams} />);
}
