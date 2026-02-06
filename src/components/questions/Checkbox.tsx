import React from 'react';
import { Check, Minus } from 'lucide-react';
interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}
export function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  id
}: CheckboxProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only" />

      <label
        htmlFor={id}
        className="flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded cursor-pointer transition-all hover:border-gray-400"
        style={{
          backgroundColor: checked || indeterminate ? '#EEEEEE' : 'transparent',
          borderColor: checked || indeterminate ? '#EEEEEE' : undefined
        }}>

        {indeterminate ?
        <Minus className="w-3.5 h-3.5 text-gray-700" strokeWidth={3} /> :
        checked ?
        <Check className="w-3.5 h-3.5 text-gray-700" strokeWidth={3} /> :
        null}
      </label>
    </div>);

}