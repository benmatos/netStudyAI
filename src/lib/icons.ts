import type { ComponentType } from 'react';
import { OsiTcpIpIcon, SubnettingIcon, NetworkProtocolsIcon, NetworkDevicesIcon, NetworkSecurityIcon } from './icons.tsx';

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export const topics: Topic[] = [
  {
    id: 'osi-tcp-ip',
    name: 'OSI/TCP-IP Models',
    description: 'Understand the foundational models of network communication.',
    icon: OsiTcpIpIcon,
  },
  {
    id: 'subnetting',
    name: 'Subnetting and IP Addressing',
    description: 'Master IPv4/IPv6 addressing and network segmentation.',
    icon: SubnettingIcon,
  },
  {
    id: 'protocols',
    name: 'Network Protocols',
    description: 'Learn about TCP, UDP, HTTP, DNS, and other core protocols.',
    icon: NetworkProtocolsIcon,
  },
  {
    id: 'devices',
    name: 'Network Devices',
    description: 'Explore switches, routers, firewalls, and their functions.',
    icon: NetworkDevicesIcon,
  },
  {
    id: 'security',
    name: 'Network Security',
    description: 'Dive into the principles of securing network infrastructure.',
    icon: NetworkSecurityIcon,
  },
];

export interface Question {
  id: number;
  topicId: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    topicId: 'osi-tcp-ip',
    question: 'Which layer of the OSI model is responsible for routing and forwarding IP packets?',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    answer: 2,
    explanation: 'The Network Layer (Layer 3) is responsible for logical addressing, routing, and path determination. It moves packets between hosts on different networks.',
  },
  {
    id: 2,
    topicId: 'osi-tcp-ip',
    question: 'At which layer of the TCP/IP model does the TCP protocol operate?',
    options: ['Application', 'Transport', 'Internet', 'Network Access'],
    answer: 1,
    explanation: 'TCP (Transmission Control Protocol) is a connection-oriented protocol that operates at the Transport Layer, providing reliable, ordered, and error-checked delivery of a stream of octets.',
  },
   {
    id: 3,
    topicId: 'osi-tcp-ip',
    question: 'The Data Link layer is responsible for what?',
    options: ['Error detection and correction', 'Framing and MAC addressing', 'Routing', 'Signal generation'],
    answer: 1,
    explanation: 'The Data Link layer (Layer 2) is responsible for node-to-node data transfer and handles framing, physical addressing (MAC), and error detection for data on the physical link.',
  },
  {
    id: 4,
    topicId: 'subnetting',
    question: 'What is the subnet mask for a /27 network?',
    options: ['255.255.255.0', '255.255.255.192', '255.255.255.224', '255.255.255.240'],
    answer: 2,
    explanation: 'A /27 prefix means 27 bits are used for the network portion. This leaves 5 bits for hosts. The subnet mask is 11111111.11111111.11111111.11100000, which translates to 255.255.255.224.',
  },
  {
    id: 5,
    topicId: 'subnetting',
    question: 'How many usable host addresses are there in a /29 subnet?',
    options: ['6', '8', '14', '30'],
    answer: 0,
    explanation: 'A /29 prefix leaves 32 - 29 = 3 bits for hosts. This gives 2^3 = 8 total addresses. Subtracting the network address and the broadcast address leaves 6 usable host addresses.',
  },
  {
    id: 6,
    topicId: 'protocols',
    question: 'Which protocol is stateless?',
    options: ['TCP', 'HTTP', 'FTP', 'Telnet'],
    answer: 1,
    explanation: 'HTTP is a stateless protocol, meaning each request from a client to a server is treated as an independent transaction. The server does not retain any session information about the client.',
  },
  {
    id: 7,
    topicId: 'protocols',
    question: 'What port does DNS primarily use?',
    options: ['25', '53', '80', '443'],
    answer: 1,
    explanation: 'The Domain Name System (DNS) primarily uses UDP port 53 for queries. It can also use TCP port 53 for zone transfers or for queries that exceed the UDP size limit.',
  },
  {
    id: 8,
    topicId: 'devices',
    question: 'A device that connects multiple computers together in a single LAN and operates at Layer 2 is called a...?',
    options: ['Hub', 'Router', 'Switch', 'Modem'],
    answer: 2,
    explanation: 'A switch is a Layer 2 device that uses MAC addresses to forward data to specific devices on a local area network (LAN), improving efficiency over a hub.',
  },
  {
    id: 9,
    topicId: 'devices',
    question: 'Which device is used to connect different networks together and makes routing decisions based on IP addresses?',
    options: ['Switch', 'Router', 'Bridge', 'Repeater'],
    answer: 1,
    explanation: 'A router is a Layer 3 device that connects two or more different networks. It uses IP addresses to determine the best path to forward packets between these networks.',
  },
  {
    id: 10,
    topicId: 'security',
    question: 'Which of the following is a common type of firewall that monitors the state of active connections?',
    options: ['Packet-filtering firewall', 'Proxy firewall', 'Stateful inspection firewall', 'Next-generation firewall'],
    answer: 2,
    explanation: 'A stateful inspection firewall tracks the state of network connections and makes decisions based on the connection\'s context, offering more security than a simple packet-filtering firewall.',
  },
  {
    id: 11,
    topicId: 'security',
    question: 'What does "VPN" stand for?',
    options: ['Virtual Private Network', 'Very Private Network', 'Virtual Public Network', 'Verified Private Network'],
    answer: 0,
    explanation: 'VPN stands for Virtual Private Network. It creates a secure, encrypted connection over a less secure network, such as the public internet.',
  },
];

export const userPerformance = {
  'OSI/TCP-IP Models': 75,
  'Subnetting and IP Addressing': 45,
  'Network Protocols': 85,
  'Network Devices': 60,
  'Network Security': 30,
};

export const weeklyProgress = [
  { week: 'Week 1', points: 150 },
  { week: 'Week 2', points: 220 },
  { week: 'Week 3', points: 180 },
  { week: 'Week 4', points: 350 },
];