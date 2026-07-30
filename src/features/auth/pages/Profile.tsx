import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components/common/EmptyState";
import { useUser } from "../hooks/useAuth";

const ProfilePage = () => {
  // gọi api là để lấy dữ liệu: thì sau khi có dữ liệu rồi
  // thì phải set nó vào trong setUser để component re-render và hiển thị dữ liệu ra
  // nếu không set vào state thì component sẽ không biết dữ liệu đã thay đổi, nên sẽ không re-render
  // và tất nhiên là không hiển thị dữ liệu ra được
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [user, setUser] = useState<any>(null);

  const {
    data: user, // rename 'data' thành 'user' cho semantic - cái api trả về - hiển thị trên UI
    isError, // có bị lỗi ko ? => true: fetch bị lỗi
    error, // object chứa những lỗi trên
    refetch, // hàm: để gọi queryFn, fetch lại (manually)
    isFetching, // true = đang fetch (dù có data hay không) - có đang gọi api không ?
    isLoading, // biến để check xem có đang call api k - true = lần đầu fetch, ch có data - có gọi api lần đầu không ?
  } = useUser();

  /** useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authApi.getMe();
        console.log("Data user nhận được:", data);
        setUser(data);
      } catch (err) {
        setError("Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 
  */

  if (isLoading) return <LoadingState />;
  if (isError) {
    console.log();
    return (
      <ErrorState
        message={error?.message || "Failed to load profile"}
        onRetry={() => refetch()}
      />
    );
  }
  if (!user)
    return <EmptyState message="Không tìm thấy thông tin người dùng" />;

  return (
    <div>
      <div>Profile page</div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      {/* vì name, mail,... nằm ở ngoài nên chấm k sổ được, chỉ có mình thấy dc 
      chỉ có thể truy cập thông qua users.name, users.email, v.v. */}
    </div>
  );
};
export default ProfilePage;
