import { Suspense } from "react";
import { Spin } from "antd";
export function lazyLoader(Component: any): React.ReactNode {
  return (
    <Suspense
      fallback={
        <Spin
          size="small"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
}
