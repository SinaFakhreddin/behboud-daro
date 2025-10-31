"use client"
import classes from './index.module.css';

type Props = {
  doctor: DoctorsData;
};

import { ChevronLeft, ClipboardClock, CreditCard, MapPin, MessageSquare, Star } from 'lucide-react';
import { DoctorsData } from '@/http/types/DoctorService.types';


export default  function DoctorCard({ doctor }: Props) {



  return (
    <div key={doctor.id}>
      <div className={classes.card}>
        <div className="flex flex-col w-full">
          <div className="flex w-full align-items-center gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <img className="size-20 shadow-xl rounded-full" src={`https://skenass.com${doctor.profile_image}`}/>
                {/*/*<Avatar src={`https://skenass.com/${doctor.profile_image}`} radius="xl" size={70} />*!/*/}
              <div className="flex flex-col ">
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
                <text className="text-sm max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{doctor.address}</text>
              </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <text className="text-sm text-cyan-800 font-bold">مشاهده ی پروفایل</text>
                <ChevronLeft color="green" size={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
