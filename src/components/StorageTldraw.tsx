"use client";

import "tldraw/tldraw.css";
import {
  Tldraw,
  DefaultStylePanel,
  DefaultStylePanelContent,
  DefaultColorThemePalette,
} from "tldraw";
import { useStorageStore } from "./useStorageStore";
import { useSelf } from "@liveblocks/react/suspense";
import { Avatars } from "@/components/Avatars";
import { Badge } from "@/components/Badge";
import Image from "next/image";
import backgroundImage from "@/public/maps/de_ancient.webp";

/**
 * IMPORTANT: LICENSE REQUIRED
 * To remove the watermark, you must first purchase a license
 * Learn more: https://tldraw.dev/community/license
 */
DefaultColorThemePalette.lightMode.black.solid = "white";
export function StorageTldraw() {
  // Getting authenticated user info. Doing this using selectors instead
  // of just `useSelf()` to prevent re-renders on Presence changes
  const id = useSelf((me) => me.id);
  const info = useSelf((me) => me.info);

  const store = useStorageStore({
    user: { id, color: info.color, name: info.name },
  });

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Tldraw
        store={store}
        components={{
          Background: () => (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="bg-gradient-to-br from-emerald-400 to-emerald-800"
            ></div>
          ),
          OnTheCanvas: () => (
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: 50,
                left: 50,
                width: "85vw",
                height: "80vh",
                padding: 12,
                borderRadius: 8,
                zIndex: 0,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={backgroundImage}
                  alt="Background map"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                  priority
                />
              </div>
            </div>
          ),
          StylePanel: () => (
            <div
              style={{
                display: "flex-column",
                marginTop: 4,
              }}
            >
              <Avatars />
              <DefaultStylePanel />
            </div>
          ),
        }}
        autoFocus
      />
    </div>
  );
}
