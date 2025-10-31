import {useForm} from "@mantine/form";
import {NewDoctorFormType} from "@/app/[locale]/home/components/filterSection/newDoctor/index.type";
import {GenderType} from "@/http/types/DoctorService.types";
import Button from "@/components/shared/Button";
import {useCreateDoctor} from "@/app/[locale]/home/components/index.hooks";
import SelectBox from "@/components/shared/selectBox";
import {professionsDataList, provincesDataList} from "@/app/constants/filterInfoDataBox";


type Props = {
    isOpened:boolean
}


export default function CreateNewDoctorForm(props:Props) {
    const {createDoctor , createDoctorPending}= useCreateDoctor()
    const form = useForm<NewDoctorFormType>({
        initialValues:{
            name:"",
            gender:GenderType.NONE,
            phone:"",
            province:"",
            specialty:""
        }
    })



    const submitHandler = ()=>{
        void createDoctor(form.getValues())
    }



    return (
        <form
            onSubmit={form.onSubmit(submitHandler)}
            className="space-y-4"
        >
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">نام پزشک</label>
                <input
                    className="appearance-none w-full sm:w-full md:w-full justify-end w-48 bg-white border border-gray-300 text-gray-700 py-2 pl-8 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="مثلاً دکتر احمدی"
                    {...form.getInputProps("name")}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">شماره تماس</label>
                <input
                    className="appearance-none w-full sm:w-full md:w-full justify-end  bg-white border border-gray-300 text-gray-700 py-2 pl-8 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0912xxxxxxx"
                    {...form.getInputProps("phone")}
                />
            </div>
            <SelectBox
                {...form.getInputProps("province")}
                placeholder="استان"
                options={provincesDataList}
            />
            <SelectBox
                {...form.getInputProps("specialty")}
                placeholder="تخصص"
                options={professionsDataList}
            />
            <SelectBox
                {...form.getInputProps("gender")}
                placeholder="جنسیت"
                options={[
                    {label:"زن" , value:GenderType.FEMALE},
                    {label:"مرد" , value:GenderType.MALE},
                ]}
            />
            <Button disabled={createDoctorPending} variant={'outline'} type='submit'>
                {createDoctorPending ? "در حال افزودن..." : "افزودن پزشک"}

            </Button>
        </form>
    )


}