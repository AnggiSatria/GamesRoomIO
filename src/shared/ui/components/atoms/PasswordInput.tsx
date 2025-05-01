import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

export function PasswordInput({
  field,
}: {
  field: ControllerRenderProps<any, any>;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        placeholder="Enter your password"
        className="pr-10 text-white"
        {...field}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {show ? (
          <EyeOff className="h-4 w-4 text-white hover:!text-black" />
        ) : (
          <Eye className="h-4 w-4 text-white hover:text-[#0a0a0a]" />
        )}
      </Button>
    </div>
  );
}
