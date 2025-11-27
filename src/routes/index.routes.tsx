import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

export default function Routes({ usuario }: { usuario: any }) {
  return usuario ? <AppRoutes /> : <AuthRoutes />;
}
