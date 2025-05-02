"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useReadPlatforms } from "@/shared/lib/helpers/client/services/platforms";
import { IResponseGetPlatformList } from "@/shared/lib/helpers/client/services/interfaces/platform.interfaces";

const activeFilter = {
  search: "",
  page: ``,
};

export default function SidebarFilter({
  onSearchChange,
  onPlatformChange,
}: {
  onSearchChange?: (value: string) => void;
  onPlatformChange?: (selected: string[]) => void;
}) {
  const { data: dataPlatforms } = useReadPlatforms(activeFilter);

  const platforms = dataPlatforms && dataPlatforms?.data;

  console.log(dataPlatforms);

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    const newSelected = selectedPlatforms.includes(id)
      ? selectedPlatforms.filter((item) => item !== id)
      : [...selectedPlatforms, id];
    setSelectedPlatforms(newSelected);
    onPlatformChange?.(newSelected);
  };

  return (
    <div className="w-full xl:max-w-xs p-4 border border-white order-1 xl:order-2 space-y-4 rounded-md shadow-md">
      <div>
        <Label htmlFor="search" className="block mb-2 text-white">
          Search Game
        </Label>
        <Input
          id="search"
          placeholder="Enter game title..."
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <div>
        <Label className="block mb-2 text-white">Filter by Platform</Label>
        <div className="space-y-2">
          {platforms?.map((platform: IResponseGetPlatformList, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <Checkbox
                id={platform?.id}
                checked={selectedPlatforms.includes(platform?.id)}
                onCheckedChange={() => handleCheckboxChange(platform?.id)}
              />
              <Label htmlFor={platform?.id} className="text-white">
                {platform?.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
