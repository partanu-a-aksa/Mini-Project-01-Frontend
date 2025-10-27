import Image from "next/image";

export interface ISignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: ISignupLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/login/galaxybg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
