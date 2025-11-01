import {useForm} from "@mantine/form";
import {NewDoctorFormType} from "@/app/[locale]/home/components/filterSection/newDoctor/index.type";


export type DoctorFormInputProps = {
    label: string;
    placeholder: string;
    name: string;
    form: ReturnType<typeof useForm<NewDoctorFormType>>;
}


export default function InputField(props:DoctorFormInputProps ) {

    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">{props.label}</label>
            <input
                key={props.form.key(props.name)}
                {...props.form.getInputProps(props.name)}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={props.placeholder}
            />
            {props.form.errors[props.name] && (
                <p className="text-red-500 text-xs mt-1">{props.form.errors[props.name] }</p>
            )}
        </div>
    );
}