import type { ComponentType } from 'react';
import { Network, Layers, Globe, ShieldCheck, Server } from 'lucide-react';

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

export const OsiTcpIpIcon = Layers;
export const SubnettingIcon = Globe;
export const NetworkProtocolsIcon = Server;
export const NetworkDevicesIcon = Network;
export const NetworkSecurityIcon = ShieldCheck;
