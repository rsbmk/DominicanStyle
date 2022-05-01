import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

type objOption = {
  name: string;
};

type Props = {
  optionList: objOption[];
  name: string;
};

export function ListboxSelect(props: Props) {
  const { optionList, name } = props;
  const [selected, setSelected] = useState<objOption>({ name: "Seleccione un empleado" });

  return (
    <Listbox name={name} value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button  className="relative w-full py-2 pl-3 pr-10 text-left bg-white border-2 border-gray-400 border-opacity-50 cursor-default rounded-xl focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block text-gray-500 truncate">{selected.name}</span>
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
