import * as React from "react";

import { Html, Button } from "@react-email/components";

export function Email() {
  return (
    <Html lang="en">
      <Button href={"test"}>Click me</Button>
    </Html>
  );
}
