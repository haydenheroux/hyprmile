import { useState } from "react";
import Select from "./Select";

interface SelectGroupProps {
  options: string[];
  onChange: (value: string[]) => void;
}

function SelectGroup({ options, onChange }: SelectGroupProps) {
  const [selections, setSelections] = useState<string[]>([]);

  const select = (index: number | null) => {
    return (value: string) => {
      const newSelections = [...selections];
      if (index == null) {
        newSelections.push(value);
      } else if (value == "") {
        newSelections.splice(index, 1);
      } else {
        newSelections[index] = value;
      }
      onChange(newSelections);
      setSelections(newSelections);
    };
  };

  const showEmpty = selections.length === 0 || selections.every((value) => value.length > 0);

  return (
    <>
      {selections.map((selection, index) => (
        <Select key={index} selection={selection} options={options} onChange={select(index)} standalone={false} />
      ))}
      {showEmpty && <Select selection="" options={options} onChange={select(null)} standalone={false} />}
    </>
  );
}

export default SelectGroup;
