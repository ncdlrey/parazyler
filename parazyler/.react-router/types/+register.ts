import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/technology": {};
  "/mission": {};
  "/send": {};
  "/team": {};
  "/test": {};
};