import "../globals.css";

export const metadata = {
  title: "GAF Admin Panel",
  description: "Global Awareness Foundation Administration Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fcf9e3]">
      {children}
    </div>
  );
}