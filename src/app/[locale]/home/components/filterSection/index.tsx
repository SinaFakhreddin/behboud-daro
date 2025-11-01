"use client"
import Button from "@/components/shared/Button";
import {SlidersHorizontal} from "lucide-react";
import SelectBox from "@/components/shared/selectBox";
import FilterModal from "../../../../../components/shared/FilterForm";
import {useState} from "react";
import {professionsDataList, provincesDataList} from "@/app/constants/filterInfoDataBox";
import {useRouter, useSearchParams} from "next/navigation";
import ResponsiveFilterModal from "@/components/shared/ResponsiveFilterModalMotion";
import {FilterFormType} from "@/components/shared/FilterForm/index.types";
import {useDisclosure} from "@mantine/hooks";
import CustomModal from "@/components/shared/CustomModal";
import FilterForm from "../../../../../components/shared/FilterForm";
import CreateNewDoctorForm from "@/app/[locale]/home/components/filterSection/newDoctor";



type Props = {
    onAdvancedFilterSubmit:(value:FilterFormType)=>void;
    onProvinceChange:(value:string)=>void;
    onProfessionChange:(value:string)=>void
    initialFormValue:FilterFormType;
    onClearFormHandler:VoidFunction
}

export default function FilterSection(props:Props) {
    const [isOpenFilterModal , setFilterModalHandler] = useState<boolean>(false)
    const [selectedProf, setSelectedProf] = useState<string>()
    const [isOpenCreateModal , createModalHandler] =useDisclosure(false)
    const [selectedProvince, setSelectedProvince] = useState<string>()
    // const router = useRouter();
    // const searchParams = useSearchParams();

    const handleProfChange = (prof: string) => {
        setSelectedProf(prof)
        props.onProfessionChange(prof)

        // const params = new URLSearchParams(searchParams);
        // params.set("profession_ids[]", String(prof));
        // router.push(`?${params.toString()}`);
    };


    const handleProvinceChange = (prov: string) => {
        setSelectedProvince(prov)
        props.onProvinceChange(prov)
        // const params = new URLSearchParams(searchParams);
        // params.set("province_ids[]", String(prov));
        // router.push(`?${params.toString()}`);
    };



    const closeHandler = ()=>{
        setFilterModalHandler(false);
    }


    const submitHandler = (value:FilterFormType)=>{
        // const params = new URLSearchParams(searchParams.toString());
        // const {gender , dociName} = value
        // params.delete("gender")
        // params.delete("q")
        // params.append("gender" , gender || "female")
        // params.append("q",dociName || "")
        // router.push(`?${params.toString()}`)
        props.onAdvancedFilterSubmit(value)
        setFilterModalHandler(false)
    }


    const clearHandler = () => {
        // const params = new URLSearchParams(searchParams.toString());
        // params.delete("gender")
        // params.delete("q")
        // router.push(`?${params.toString()}`)
        // params.set("page", "1");
        props.onClearFormHandler()
        setFilterModalHandler(false)
    }


  return (
      <div
      className='flex  flex-col-reverse w-full md:w-fit gap-4 md:flex-row '
      >
          <Button className=' md:w-58 ' onClick={()=>setFilterModalHandler(true)} variant="outline" size="md">
              <div className="flex gap-2 items-center  ">
                  <SlidersHorizontal/>
                  <span className="text-cyan-800 font-bold">فیلتر پیشرفته</span>
              </div>
          </Button>
          <Button className=' md:w-58 ' onClick={createModalHandler.open} variant="outline" size="md">
              <div className="flex gap-2 items-center  ">
                  <span className="text-cyan-800 font-bold">دکتر جدید :)</span>
              </div>
          </Button>
          <ResponsiveFilterModal
              isOpened={isOpenFilterModal}
              onClose={closeHandler}
          >
              <CustomModal
                  isOpened={isOpenFilterModal}
                  onClose={closeHandler}
              >
                  <FilterForm
                  initialValue={props.initialFormValue}
                  onClearForm={clearHandler}
                  onSubmit={submitHandler}
                  />
              </CustomModal>
          </ResponsiveFilterModal>
          <ResponsiveFilterModal
              isOpened={isOpenCreateModal}
              onClose={createModalHandler.close}
              type={'create'}
          >
              <CustomModal
                  isOpened={isOpenCreateModal}
                  onClose={createModalHandler.close}
              >
                  <CreateNewDoctorForm onSuccess={createModalHandler.close}/>
              </CustomModal>
          </ResponsiveFilterModal>
             <SelectBox
                 value={selectedProvince}
                 placeholder="استان"
                 options={provincesDataList}
                 onChange={handleProvinceChange}
             />
             <SelectBox
                 value={selectedProf}
                 onChange={handleProfChange}
                 placeholder="تخصص"
                 options={professionsDataList}
             />

      </div>

  );
}
