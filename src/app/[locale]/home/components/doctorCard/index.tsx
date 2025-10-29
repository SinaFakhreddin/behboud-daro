import classes from './index.module.css';

type Props = {
  doctor: DoctorsData;
};

// import { Avatar, Card, Text } from '@mantine/core';
import { ChevronLeft, ClipboardClock, CreditCard, MapPin, MessageSquare, Star } from 'lucide-react';
import { getI18n, getScopedI18n } from '@/locale/server';
import { useI18n } from '@/locale/client';
import { DoctorsData } from '@/http/types/DoctorService.types';

export default async function DoctorCard({ doctor }: Props) {
  // const t = await getScopedI18n(locale);

  return (
    <div key={doctor.id}>
      <div className={classes.card}>
        <div className="flex flex-col w-full">
          <div className="flex w-full align-items-center gap-2 justify-between">
            <div className="flex gap-2">
              {/*<Avatar src={doctor.profile_image} radius="xl" size={70} />*/}
              <div className="flex flex-col">
                <text>{doctor.full_name}</text>
                <text>{doctor.profession_name}</text>
              </div>
            </div>
            <div className="flex mt-2 flex-col items-center">
              <Star color="green" fill={'green'} />
              {doctor.average_rating}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex mt-2 justify-between w-full">
              <div className="flex gap-2 items-center">
                <ClipboardClock size={15} />
                <text className="text-sm">{`${doctor.experience_years} سال تجربه`}</text>
              </div>
              <div className="flex gap-2 items-center">
                <MessageSquare size={15} />
                <text className="text-sm">{`${doctor.comments_count} نظر `}</text>
              </div>
              <div className="flex gap-2 items-center">
                <CreditCard size={15} />
                <text className="text-sm">{`${doctor.withdraw_count}پرداخت با اسکناس `}</text>
              </div>
            </div>
            <div className="flex mt-2 justify-between w-full">
              <div className="flex gap-2 items-center">
                <MapPin size={15} />
                <text className="text-sm">{doctor.address}</text>
              </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <text className="text-sm text-green-900 font-bold">مشاهده ی پر.فایل</text>
                <ChevronLeft color="green" size={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
