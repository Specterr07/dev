'use client';

import {
  MouseTrackerProvider,
  Pointer,
  PointerFollower,
  ThemedPointerIcon,
} from '@/components/ui/cursor';

export default function SiteCursor() {
  return (
    <MouseTrackerProvider global hideNativeCursor>
      <Pointer>
        <ThemedPointerIcon size={24} />
      </Pointer>
      <PointerFollower align="bottom-right">
        <div className="cursor-tag">
          <span className="cursor-tag__dot" />
          <span>&gt; vpcodes</span>
        </div>
      </PointerFollower>
    </MouseTrackerProvider>
  );
}
