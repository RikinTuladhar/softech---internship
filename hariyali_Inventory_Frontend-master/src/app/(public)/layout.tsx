
import PublicClientProvider from "./PublicClientProvider";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
   
  
      <PublicClientProvider>{children}</PublicClientProvider>
    
     
  );
}
