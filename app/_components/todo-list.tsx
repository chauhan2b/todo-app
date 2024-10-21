import { Checkbox } from "@/components/ui/checkbox";

export default function TodoList() {
  return (
    <>
      <div className="flex items-center justify-start gap-2 px-10 py-2">
        <Checkbox />
        <label>Buy groceries</label>
      </div>
      <div className="flex items-center justify-start gap-2 px-10 py-2">
        <Checkbox />
        <label>Buy groceries</label>
      </div>
    </>
  );
}
