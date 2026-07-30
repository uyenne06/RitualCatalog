import { useRituals } from "../hooks/useRituals";
import RitualCard from "../components/ritualCard";
import { Pagination } from "@/shared/components/common/Pagination";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
// dữ liệu để search filter đang lưu dưới dạng state

export default function RitualsCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearch = useDebounce(searchInput, 500);
  const page = Number(searchParams.get("page")) || 1;
  const isHotParam = searchParams.get("isHot");
  const isHot =
    isHotParam === "true" ? true : isHotParam === "false" ? false : undefined;

  const { rituals, error, pagination } = useRituals({
    page: Number(searchParams.get("page")) || 1,
    search: searchParams.get("search") || undefined,
    isHot: isHot,
  });
  console.log(rituals);
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams); // searchParams ăn theo giá trị của param hiện tại trên url
    params.set("page", String(page));
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  useEffect(() => {
    if (debouncedSearch !== searchParams.get("search")) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      setSearchParams(params);
    }
  }, [debouncedSearch]);

  const handleSearchParam = (search: string) => {
    setSearchInput(search);
  };

  // const handlePageChange = (page: number) => {
  //   setPage(page);
  // };

  // const handleStatusChange = (status: string) => {
  //   if (status === "all") {
  //     setData(undefined);
  //   } else if (status === "true") {
  //     setData(true);
  //   } else {
  //     setData(false);
  //   }
  // };

  // if (isLoading) {
  //   return <p>Đang tải dữ liệu ritual...</p>;
  // }

  if (error) {
    return <p className="text-red-600">Lỗi khi tải ritual: {String(error)}</p>;
  }

  // if (!rituals || rituals.length === 0) {
  //   return <p>Không có ritual để hiển thị.</p>;
  // }

  return (
    <div className="grid gap-5 sm:grid-cols-5 lg:grid-cols2">
      {rituals.map((ritual) => (
        <RitualCard key={ritual.id} ritual={ritual} />
      ))}
      {pagination && (
        <Pagination
          meta={pagination}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchInput}
            onChange={(e) => handleSearchParam(e.target.value)}
            placeholder="Search rituals..."
            className="h-11 rounded-xl border-gray-200 bg-slate-50 pl-11 pr-4 text-sm shadow-sm transition focus:bg-white focus:border-blue-300"
          />
        </div>
        {searchInput ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSearchParam("")}
            className="h-11 min-w-[104px] rounded-xl border-blue-200 bg-blue-50 px-4 text-blue-700 shadow-sm transition hover:bg-blue-100 hover:text-blue-800"
          >
            Xóa
          </Button>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <SlidersHorizontal className="size-4 text-gray-500" />
          Trạng thái
        </div>
        <div className="w-full sm:w-auto">
          <Select
            value={searchParams.get("isHot") || "all"}
            onValueChange={(e) =>
              handleFilterChange("isHot", e === "all" ? undefined : e)
            }
          >
            <SelectTrigger className="h-11 w-full rounded-xl border-gray-200 bg-white shadow-sm">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="true">Hot</SelectItem>
                <SelectItem value="false">Không hot</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
