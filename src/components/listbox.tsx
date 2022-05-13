import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Employee } from "../types";

type Props = {
  optionList: Employee[];
  placeholder: string;
  setEmployeeIdSelected: React.Dispatch<React.SetStateAction<number>>
};

export function ListboxSelect(props: Props) {
  const { optionList, placeholder, setEmployeeIdSelected } = props;
  const [selected, setSelected] = useState({} as Employee);

  const onChange =  (selection: Employee) => {
    setSelected(selection);
    setEmployeeIdSelected(selection.id);
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button
          className="relative w-full py-2 pl-3 pr-10 text-left bg-white border-2 border-gray-400 border-opacity-50 cursor-default rounded-xl focus:outline-none focus-visible:ring-transparent"
        >
          {selected.name ? (
            <span className="block text-gray-500 truncate">{selected.name}</span>
          ) : (
            <span className="block text-gray-500 truncate text-opacity-70"> {placeholder}</span>
          )}
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg focus:outline-none max-h-60 ring-1 ring-black ring-opacity-5 sm:text-sm">
            {optionList.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-100 ${
                    active ? "bg-gray-100 text-blue-500" : "text-gray-400"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {person.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
