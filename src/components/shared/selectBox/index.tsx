'use client';

import { LabelValueType } from '@/types/generalTypes';
import { v4 as randomId } from 'uuid';
import { ChangeEvent } from 'react';

type Props = {
    options: LabelValueType[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
};

export default function SelectBox({ options, placeholder, value, onChange , className }: Props) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        if (onChange) onChange(newValue);
    };

    return (
        <div className={`relative flex justify-between `}>
            <svg
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                />
            </svg>

            <select
                className="appearance-none w-full sm:w-full md:w-full justify-end w-48 bg-white border border-gray-300 text-gray-700 py-2 pl-8 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value ?? ''}
                onChange={handleChange}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={randomId()} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
