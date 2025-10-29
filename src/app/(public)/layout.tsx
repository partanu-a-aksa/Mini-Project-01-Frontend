import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
