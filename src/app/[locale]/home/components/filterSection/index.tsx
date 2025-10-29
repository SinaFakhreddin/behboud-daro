"use client"
import Button from "@/components/shared/Button";
import {SlidersHorizontal} from "lucide-react";
import SelectBox from "@/components/shared/selectBox";
import FilterModal from "@/components/shared/FilterModal";
import {useState} from "react";
import {professionsDataList, provincesDataList} from "@/app/constants/filterInfoDataBox";
import {useRouter, useSearchParams} from "next/navigation";
import ResponsiveFilterModal from "@/components/shared/ResponsiveFilterModalMotion";

export default function FilterSection() {
    const [isOpenFilterModal , setFilterModalHandler] = useState<boolean>(false)
    const [selectedProf, setSelectedProf] = useState<string>()
    const [selectedProvince, setSelectedProvince] = useState<string>()
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleProfChange = (prof: string) => {
        setSelectedProf(prof)
        const params = new URLSearchParams(searchParams);
        params.set("profession_ids[]", String(prof));
        router.push(`?${params.toString()}`);
    };


    const handleProvinceChange = (prov: string) => {
        setSelectedProvince(prov)
        const params = new URLSearchParams(searchParams);
        params.set("province_ids[]", String(prov));
        router.push(`?${params.toString()}`);
    };



    const closeHandler = ()=>{
        setFilterModalHandler(false);
    }


  return (
      <div
      className='flex  flex-col-reverse w-full md:w-fit gap-4 md:flex-row '
          // className="flex justify-around gap-4 "
      >
          <Button className=' md:w-58 ' onClick={()=>setFilterModalHandler(true)} variant="outline" size="md">
              <div className="flex gap-2 items-center  ">
                  <SlidersHorizontal/>
                  <span className="text-cyan-800 font-bold">فیلتر پیشرفته</span>
              </div>
          </Button>
          <ResponsiveFilterModal
              isOpened={isOpenFilterModal}
              onClose={closeHandler}
          >
              <FilterModal
                  isOpened={isOpenFilterModal}
                  onSubmit={(value) => console.log(value)}
                  onClose={closeHandler}
              />
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
