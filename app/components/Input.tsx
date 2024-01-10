"use client";
interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: () => {};
}
const Input = (props: InputProps) => {
  return (
    <div className="my-3">
      <label>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="border border-slate-400 rounded p-2 w-[100%] mt-2"
      />
    </div>
  );
};

export default Input;
