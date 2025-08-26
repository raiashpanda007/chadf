import { AuthConfigs } from "../../../config/AuthConfig";
import NextAuth from "next-auth"
const Handler = NextAuth(AuthConfigs);

export {Handler as POST , Handler as GET}