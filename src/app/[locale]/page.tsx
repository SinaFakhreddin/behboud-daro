import HomeComponent from "@/app/[locale]/home";

export default async function HomePage({
									 params,
									 searchParams,
								 }: {
	params: { locale: string };
	searchParams?: Record<string, any>;
}) {
	const resolvedSearchParams = await searchParams;
	
	return <HomeComponent params={params} searchParams={resolvedSearchParams} />;
}
