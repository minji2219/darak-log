export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1272px] mx-auto">
      <div className="text-center text-white">
        <div>다락로그</div>
        <h1 className="text-3xl font-bold pt-2 pb-10">카테고리</h1>
        <div>게시물 3개</div>
      </div>
      <div className="bg-white p-20 rounded-t-[100px] mt-2">{children}</div>
    </div>
  );
}
