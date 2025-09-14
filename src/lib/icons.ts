import type { ComponentType } from 'react';

const createIcon = (path: React.ReactNode): ComponentType<{ className?: string }> => {
  const IconComponent: ComponentType<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {path}
    </svg>
  );
  IconComponent.displayName = 'CustomIcon';
  return IconComponent;
};

export const OsiTcpIpIcon = createIcon(
  <>
    <rect x="3" y="15" width="18" height="4" rx="1" />
    <rect x="3" y="10" width="18" height="4" rx="1" />
    <rect x="3" y="5" width="18" height="4" rx="1" />
  </>
);

export const SubnettingIcon = createIcon(
  <>
    <path d="M12 20h.01" />
    <path d="M12 14v4" />
    <path d="M12 4v4" />
    <path d="M12 10h.01" />
    <path d="M15 17h.01" />
    <path d="M15 11v4" />
    <path d="M9 17h.01" />
    <path d="M9 11v4" />
    <path d="M5 10h.01" />
    <path d="M5 4v4" />
    <path d="M19 10h.01" />
    <path d="M19 4v4" />
  </>
);

export const NetworkProtocolsIcon = createIcon(
  <>
    <path d="M17 11h-1.26a2 2 0 1 0-3.48 0H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
    <path d="M7 11h1.26a2 2 0 1 1 3.48 0H19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" />
    <path d="M12 11V9" />
    <path d="M12 17v2" />
  </>
);

export const NetworkDevicesIcon = createIcon(
  <>
    <rect width="20" height="8" x="2" y="14" rx="2" />
    <path d="M6 18h.01" />
    <path d="M10 18h.01" />
    <path d="M14 18h.01" />
    <path d="M8 6h8" />
    <path d="M12 6V4" />
    <path d="m10 4-2-2" />
    <path d="m14 4 2-2" />
  </>
);

export const NetworkSecurityIcon = createIcon(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </>
);
