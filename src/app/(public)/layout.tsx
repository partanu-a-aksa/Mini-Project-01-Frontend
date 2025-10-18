export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{props.children}</main>
      {/* <Footer /> */}
    </>
  );
}
