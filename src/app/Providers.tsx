"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

function Providers({children}: Props){
  return (
    // Proveedor de sesión de NextAuth
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Providers;