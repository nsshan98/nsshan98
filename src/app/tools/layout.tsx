import SupportKoriWidget from "@/components/tools/support-kori-widget";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SupportKoriWidget />
    </>
  );
}
