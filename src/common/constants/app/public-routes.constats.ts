import {ApiPath, AuthApiPath, ENV} from "@/common/enums";

type PublicRoutes = {
  path: string,
  method?: string
}

const PUBLIC_ROUTES: PublicRoutes[] = [
  {
    path: `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`
  },
];

export { PUBLIC_ROUTES };
