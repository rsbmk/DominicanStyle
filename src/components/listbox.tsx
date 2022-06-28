import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { Employee, Service } from "@/types";

type Props = {
  optionList: Employee[] | Service[];
  placeholder: string;
  hasError: boolean;
  setIdSelected: React.Dispatch<React.SetStateAction<number>>;
};

export function ListboxSelect(props: Props) {
  const { optionList, placeholder, hasError, setIdSelected } = props;
  const [selected, setSelected] = useState({} as Employee | Service);

  const onChange = (selection: Employee) => {
    setSelected(selection);
    setIdSelected(selection.id);
  };

  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button
          className={`relative w-full py-2 pl-3 pr-10 text-left border-2 border-opacity-50 cursor-default rounded-xl focus:outline-none focus-visible:ring-transparent ${
            hasError
              ? "border-red-500 bg-red-50 bg-opacity-50"
              : "border-gray-400 bg-slate-100 bg-opacity-50"
          }`}
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
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg focus:outline-none max-h-60 ring-1 ring-black ring-opacity-5 sm:text-sm">
            {optionList.length > 0 &&
              optionList.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-100 ${
                      active ? "bg-gray-100 text-blue-500" : "text-gray-400"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {option.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}

            {optionList.length === 0 && (
              <Listbox.Option
                value=""
                className={({ active }) =>
                  `cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-100 ${
                    active ? "bg-gray-100 text-blue-500" : "text-gray-400"
                  }`
                }
              >
                No hay resultados
              </Listbox.Option>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
