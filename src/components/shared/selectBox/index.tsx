import { LabelValueType } from '@/types/generalTypes';
import { v4 as randomId } from 'uuid';

type Props = {
  options: LabelValueType[];
  placeholder?: string;
};

export default function SelectBox(props: Props) {
  return (
    <div className="relative flex justify-between ">
      <div>
        <svg
          className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <select className="appearance-none justify-end w-48 bg-white border border-gray-300 text-gray-700 py-2 pl-8 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="" disabled selected hidden>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={randomId()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
