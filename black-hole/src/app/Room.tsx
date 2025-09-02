"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_BAoOT5dq2rRX2jy-qH7JMgQiQQzN2e2-3AlpY5drY2MYfk1t9_wpljGH_b62_Rnk"
      }
    >
      <RoomProvider
        id="my-room"
        initialStorage={{
          board: new LiveObject({ id: "", title: "", content: "" }),
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
