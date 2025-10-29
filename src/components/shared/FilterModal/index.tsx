import {isNotEmpty, useForm} from "@mantine/form";
import {FilterFormType} from "@/components/shared/FilterModal/index.types";
import {GenderType} from "@/http/types/DoctorService.types";
import {useCloseDrawerByOutSideClick} from "@/hooks/useCloseDrawerByOutSideClick";
import {useAgentDetector} from "@/hooks/useAgentDetecor";


type Props = {
    isOpened:boolean;
    onClose:VoidFunction;
    onSubmit:(value:FilterFormType)=>void
}

export default function FilterModal(props:Props) {
    const {isMobile} =useAgentDetector()
    const form = useForm<FilterFormType>({
        initialValues:{
            dociName:"",
            gender:GenderType.FEMALE
        },
        mode:"uncontrolled",
        validate:{
            gender:(_value, values, _path)=>{
                if (values.gender===null && values.dociName===null){
                    return "حداقل یک فیلد اجباریست"
                }else return null
            },
            dociName:(_value, values, _path)=>{
                if (values.gender===null && values.dociName===null){
                    return "حداقل یک فیلد اجباریست"
                }else return null
            }
        }
    })


    const submitHandler = ()=>{
        props.onSubmit(form.getValues())
    }

    const clearHandler = ()=>{
        form.reset()
    }


    const closeHandler = ()=>{
        form.reset()
        props.onClose()
    }

    return (
        <>
            {props.isOpened && (
                <div className=" absolute top-0 inset-0  bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`bg-white ${isMobile ? "w-full h-full" : ""} rounded-lg shadow-lg w-96 p-6 relative`}>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeHandler}
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-semibold mb-4">فیلتر</h2>
                        <form onSubmit={form.onSubmit(submitHandler)}  className="space-y-4">
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
                                <select  key={form.key("gender")}
                                         {...form.getInputProps("gender")} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
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
                    </div>
                </div>
            )}
        </>
    );
}
