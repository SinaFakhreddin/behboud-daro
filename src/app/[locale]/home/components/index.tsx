// app/(routes)/contracted-doctors/page.tsx
// import { Button, Divider, Title, Container } from '@mantine/core';
import { SlidersHorizontal } from 'lucide-react';
import DoctorCard from '@/app/components/doctorCard';
import SelectBox from '../../components/shared/selectBox';
import classes from './index.module.css';
import { DoctorServices } from '@/http/end-points/DoctorServices';
import { DoctorsData } from '@/http/types/DoctorService.types';
import axios from 'axios';
import Button from '@/components/shared/Button';

export const revalidate = 0;
async function getDoctors(): Promise<DoctorsData[]> {
  try {
    const res = await DoctorServices.getAllDoctors();
    return res.data.data.items;
  } catch (error) {
    console.error('❌ Failed to fetch doctors:', error);
    return [];
  }
}

export default async function ContractedDoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="container bg-white rounded-md">
      <div className="flex justify-between">
        <div className="flex justify-around gap-4">
          <Button variant="outline" size="md">
            <div className="flex gap-2 items-center">
              <SlidersHorizontal />
              <span className="text-green-900 font-bold">فیلتر پیشرفته</span>
            </div>
          </Button>

          {/*<SelectBox*/}
          {/*  placeholder="استان"*/}
          {/*  options={[*/}
          {/*    { value: 'خوزستان', label: 'خوزستان' },*/}
          {/*    { value: 'فارس', label: 'فارس' },*/}
          {/*  ]}*/}
          {/*/>*/}
          {/*<SelectBox*/}
          {/*  placeholder="تخصص"*/}
          {/*  options={[*/}
          {/*    { value: 'زیبایی', label: 'زیبایی' },*/}
          {/*    { value: 'عمومی', label: 'عمومی' },*/}
          {/*  ]}*/}
          {/*/>*/}
        </div>
        {/*<Title order={3}>لیست پزشکان</Title>*/}
      </div>

      {/*<Divider m="md" />*/}

      <div
        className={`w-full ${classes.scrollLeft} h-[80vh] scrollbar-thumb-green-500 scrollbar-thin grid gap-4 p-3 rounded-xl overflow-y-auto
                grid-cols-1
                lg:grid-cols-2`}
      >
        {doctors.length > 0 ? (
          doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)
        ) : (
          <p className="text-center text-gray-500">هیچ پزشکی یافت نشد</p>
        )}
      </div>
    </div>
  );
}
