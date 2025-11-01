import {isNotEmpty, useForm} from "@mantine/form";
import {NewDoctorFormType} from "@/app/[locale]/home/components/filterSection/newDoctor/index.type";
import {GenderType} from "@/http/types/DoctorService.types";
import Button from "@/components/shared/Button";
import {useCreateDoctor} from "@/app/[locale]/home/components/index.hooks";
import SelectBox from "@/components/shared/selectBox";
import {professionsDataList, provincesDataList} from "@/app/constants/filterInfoDataBox";
import {validateIranianPhoneNumber} from "@/app/lib/utils";
import InputField from "@/app/[locale]/home/components/filterSection/newDoctor/InputField";
import {useI18n} from "../../../../../../../locales/client";


type Props = {
    onSuccess:VoidFunction
}

export default function CreateNewDoctorForm(props:Props) {
    const {createDoctor , createDoctorPending}= useCreateDoctor()
    const t =useI18n()
    const form = useForm<NewDoctorFormType>({
        initialValues:{
            name:"",
            gender:GenderType.NONE,
            phone:"",
            province:"",
            specialty:""
        },
        validateInputOnBlur:true,
        validateInputOnChange:true,
        validate:{
            specialty:isNotEmpty("فیلد اجباری"),
            province:isNotEmpty("فیلد اجباری"),
            gender:isNotEmpty("فیلد اجباری"),
            name:isNotEmpty("فیلد اجباری"),
            phone:(value)=>{
                if (!value) return "فیلد اجباری"
                if (!validateIranianPhoneNumber(value)) return "فرمت شماره اشتباه است"
                return null
            }
        }
    })



    const submitHandler = ()=>{
        void createDoctor(form.getValues()).then(()=>{
            /////list must be refetch but we have not same DB
            props.onSuccess()

        })
    }

    return (
        <form
            onSubmit={form.onSubmit(submitHandler)}
            className="space-y-4"
        >
            <InputField
            form={form}
            name={"name"}
            placeholder={t("doctorName")}
            label={t("doctorName")}
            />
            <InputField
            label={t("phoneNumber")}
            placeholder={"0912xxxxxxx"}
            form={form}
            name={"phone"}
            />
            <SelectBox
                {...form.getInputProps("province")}
                placeholder="استان"
                options={provincesDataList}
            />
            {form.errors.province && (
                <p className="text-red-500 text-xs mt-1">{form.errors.province }</p>
            )}
            <SelectBox
                {...form.getInputProps("specialty")}
                placeholder="تخصص"
                options={professionsDataList}
            />
            {form.errors.specialty && (
            <p className="text-red-500 text-xs mt-1">{form.errors.specialty }</p>
            )}
            <SelectBox
                {...form.getInputProps("gender")}
                placeholder="جنسیت"
                options={[
                    {label:"زن" , value:GenderType.FEMALE},
                    {label:"مرد" , value:GenderType.MALE},
                ]}
            />
            {form.errors.gender && (
                <p className="text-red-500 text-xs mt-1">{form.errors.gender }</p>
            )}
            <Button disabled={createDoctorPending} variant={'outline'} type='submit'>
                {createDoctorPending ?t("addingDoctor") :t("addDoctor") }

            </Button>
        </form>
    )


}