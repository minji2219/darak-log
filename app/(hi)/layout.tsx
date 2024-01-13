export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1272px] mx-auto bg-white rounded-t-[100px] px-20 py-5 mt-40">
      {children}
    </div>
  );
}
