// instance
import { QueryClient } from "@tanstack/react-query";

// QueryClient = "Người quản lý tất cả queries"
//  config Global Provider
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1. Refetch on Window Focus
      // k qtam thgian còn nhiêu - cứ bật thì khi qlai sẽ auto gọi lại
      // đkien refetch: khi có component đang dùng && data bị cũ
      // dữ liệu đã cũ mà ch qlai trang thì không refetch
      // lưu dưới dạng key - value
      // khi qlai trang cũ thì sẽ ghi đè value mới và set lại thời gian
      refetchOnWindowFocus: true,
      // mặc định: true (tự fetch lại khi user quay lại web)
      // học: tắt để debug (log đỡ nhảy loạn)
      // production: bật lại để data luôn tươi

      // 2. Retry Failed Requests - gọi api có thể lỗi - cố gắng để gọi lại khi lỗi
      // khi rớt mạng, có lại sẽ tự gọi
      retry: 1,
      // mặc định: 3 lần - gọi xong 3 lần vẫn k được thì mới báo lỗi
      // học: giảm xuống 1 để nhanh thấy lỗi
      // production: 2-3 là hợp lý (network chập chờn)

      // 3. Stale Time: đếm ngược từ lúc fetch data về & lưu vào cache
      // đảm bảo dữ liệu luôn tươi
      // cũ: data lấy từ server có thể bị cũ - define when data is old ?
      // nếu là 0 thì data luôn cũ - cũ thì nó gọi lại cái mới
      staleTime: 1000 * 60 * 5,
      // nếu set 0 => realtime
      // mặc định: 0 (data ngay lập tức cũ)
      // production: 30s - 5p tùy data

      // 4.Cache time (GC Time): đếm ngược từ lúc data k dùng nữa
      // - 5p k đụng gì tự động xóa - lưu trong RAM - tránh tràn bộ nhớ
      gcTime: 5 * 60 * 1000,
      // mặc định 5p
      // cache tồn tại 5p kể từ khi k còn component nào dùng
    },
  },
});
