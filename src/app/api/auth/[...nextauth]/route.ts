import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { connect } from "@/app/libs/mongodb";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*******" },
      },
      async authorize(credentials, req) {
        await connect();

        // Validar si se proporcionan credenciales
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide valid email and password");
        }

        // Buscar el usuario por correo electrónico
        const userFound = await User.findOne({ email: credentials.email }).select("+password");
        if (!userFound) {
          throw new Error("Invalid email or password");
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada
        const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);
        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        return { ...userFound.toJSON(), username: userFound.username }; // Devuelve el nombre de usuario junto con el usuario encontrado
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  }
});

export { handler as GET, handler as POST }
