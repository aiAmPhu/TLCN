const posts = [
  { id: 1, title: "Thông báo nhập học 2024", description: "Làm thủ tục nhập học..." },
  { id: 2, title: "Thông báo tuyển sinh 2024", description: "Đợt bổ sung hồ sơ..." },
  { id: 3, title: "Điểm chuẩn xét tuyển", description: "Thông báo điểm chuẩn mới..." },
  { id: 1, title: "Thông báo nhập học 2024", description: "Làm thủ tục nhập học..." },
  { id: 2, title: "Thông báo tuyển sinh 2024", description: "Đợt bổ sung hồ sơ..." },
  { id: 3, title: "Điểm chuẩn xét tuyển", description: "Thông báo điểm chuẩn mới..." },
  { id: 1, title: "Thông báo nhập học 2024", description: "Làm thủ tục nhập học..." },
  { id: 2, title: "Thông báo tuyển sinh 2024", description: "Đợt bổ sung hồ sơ..." },
  { id: 3, title: "Điểm chuẩn xét tuyển", description: "Thông báo điểm chuẩn mới..." },
  { id: 1, title: "Thông báo nhập học 2024", description: "Làm thủ tục nhập học..." },
  { id: 2, title: "Thông báo tuyển sinh 2024", description: "Đợt bổ sung hồ sơ..." },
  { id: 3, title: "Điểm chuẩn xét tuyển", description: "Thông báo điểm chuẩn mới..." },
];

const PostList = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
        >
          <h3 className="text-blue-700 font-bold text-xl mb-2">{post.title}</h3>
          <p className="text-gray-600">{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
