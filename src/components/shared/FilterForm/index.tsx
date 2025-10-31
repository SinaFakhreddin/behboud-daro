import {useForm} from "@mantine/form";
import {FilterFormType} from "@/components/shared/FilterForm/index.types";
import {GenderType} from "@/http/types/DoctorService.types";
import {useAgentDetector} from "@/hooks/useAgentDetecor";
import {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import SelectBox from "@/components/shared/selectBox";
import {professionsDataList, provincesDataList} from "@/app/constants/filterInfoDataBox";


type Props = {
    // isOpened:boolean;
    // onClose:VoidFunction;
    onSubmit: (value: FilterFormType) => void
    onClearForm: VoidFunction;
    initialValue: FilterFormType
}

export default function FilterForm(props: Props) {
    // const searchParams = useSearchParams();
    const form = useForm<FilterFormType>({
        initialValues: {
            dociName: props.initialValue.dociName || "",
            gender: props.initialValue.gender || GenderType.NONE
        },
        mode: "uncontrolled",
        validate: {
            gender: (_value, values, _path) => {
                if (values.gender === null && values.dociName === null) {
                    return "حداقل یک فیلد اجباریست"
                } else return null
            },
            dociName: (_value, values, _path) => {
                if (values.gender === null && values.dociName === null) {
                    return "حداقل یک فیلد اجباریست"
                } else return null
            }
        }
    })


    // useEffect(() => {
    // const genderParam  = searchParams.get("gender");
    // const searchQ = searchParams.get("q");
    // const validGender =
    //     genderParam === GenderType.MALE || genderParam === GenderType.FEMALE
    //         ? genderParam
    //         : GenderType.FEMALE;
    // form.setValues({
    //     gender :validGender,
    //     dociName:searchQ
    // });
    // }, [searchParams])


    const submitHandler = () => {
        props.onSubmit(form.getValues())
    }

    const clearHandler = () => {
        form.reset()
        props.onClearForm()
    }

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">فیلتر</h2>
            <form onSubmit={form.onSubmit(submitHandler)} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">نام پزشک</label>
                    <input
                        key={form.key("dociName")}
                        {...form.getInputProps("dociName")}
                        type="text"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">جنسیت</label>
                    {/*<SelectBox*/}
                    {/*    value={selectedProf}*/}
                    {/*    onChange={handleProfChange}*/}
                    {/*    placeholder="تخصص"*/}
                    {/*    options={}*/}
                    {/*/>*/}
                    <select key={form.key("gender")}
                            {...form.getInputProps("gender")}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">انتخاب کنید</option>
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                    </select>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                        onClick={clearHandler}
                    >
                        پاک کردن فیلتر
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                    >
                        اعمال فیلتر
                    </button>
                </div>
            </form>
        </>
    );
}
