import { useEffect } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  }, [signOut]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0f] p-4 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
        <p className="text-gray-400">Abmeldung erfolgt...</p>
      </div>
    </div>
  );
}

export default MainComponent;
