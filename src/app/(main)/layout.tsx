import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover flex-grow bg-black/40 backdrop-blur-sm "
      style={{
        backgroundImage: "url('/login/galaxybg.jpg')",
      }}
    >
      <Header />
      <main className="flex-grow">{props.children}</main>
      <Footer />
    </div>
  );
}
