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
    name: 'Modelos OSI/TCP-IP',
    description: 'Entenda os modelos fundamentais da comunicação de rede.',
    icon: OsiTcpIpIcon,
  },
  {
    id: 'subnetting',
    name: 'Sub-redes e Endereçamento IP',
    description: 'Domine o endereçamento IPv4/IPv6 e a segmentação de rede.',
    icon: SubnettingIcon,
  },
  {
    id: 'protocols',
    name: 'Protocolos de Rede',
    description: 'Aprenda sobre TCP, UDP, HTTP, DNS e outros protocolos essenciais.',
    icon: NetworkProtocolsIcon,
  },
  {
    id: 'devices',
    name: 'Dispositivos de Rede',
    description: 'Explore switches, roteadores, firewalls e suas funções.',
    icon: NetworkDevicesIcon,
  },
  {
    id: 'security',
    name: 'Segurança de Rede',
    description: 'Mergulhe nos princípios de segurança da infraestrutura de rede.',
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

export interface ClientTopic {
  id: string;
  name: string;
  description: string;
}

export function getIconForTopic(topicId: string): ComponentType<{ className?: string }> {
  const topic = topics.find(t => t.id === topicId);
  return topic ? topic.icon : () => null;
}

export const questions: Question[] = [
  {
    id: 1,
    topicId: 'osi-tcp-ip',
    question: 'Qual camada do modelo OSI é responsável pelo roteamento e encaminhamento de pacotes IP?',
    options: ['Camada Física', 'Camada de Enlace de Dados', 'Camada de Rede', 'Camada de Transporte'],
    answer: 2,
    explanation: 'A Camada de Rede (Camada 3) é responsável pelo endereçamento lógico, roteamento e determinação de caminho. Ela move pacotes entre hosts em redes diferentes.',
  },
  {
    id: 2,
    topicId: 'osi-tcp-ip',
    question: 'Em qual camada do modelo TCP/IP o protocolo TCP opera?',
    options: ['Aplicação', 'Transporte', 'Internet', 'Acesso à Rede'],
    answer: 1,
    explanation: 'O TCP (Protocolo de Controle de Transmissão) é um protocolo orientado à conexão que opera na Camada de Transporte, fornecendo entrega confiável, ordenada e com verificação de erros de um fluxo de octetos.',
  },
   {
    id: 3,
    topicId: 'osi-tcp-ip',
    question: 'A camada de Enlace de Dados é responsável por quê?',
    options: ['Detecção e correção de erros', 'Enquadramento e endereçamento MAC', 'Roteamento', 'Geração de sinal'],
    answer: 1,
    explanation: 'A camada de Enlace de Dados (Camada 2) é responsável pela transferência de dados de nó a nó e lida com enquadramento, endereçamento físico (MAC) и detecção de erros para dados no enlace físico.',
  },
  {
    id: 4,
    topicId: 'subnetting',
    question: 'Qual é a máscara de sub-rede para uma rede /27?',
    options: ['255.255.255.0', '255.255.255.192', '255.255.255.224', '255.255.255.240'],
    answer: 2,
    explanation: 'Um prefixo /27 significa que 27 bits são usados para a porção de rede. Isso deixa 5 bits para hosts. A máscara de sub-rede é 11111111.11111111.11111111.11100000, que se traduz em 255.255.255.224.',
  },
  {
    id: 5,
    topicId: 'subnetting',
    question: 'Quantos endereços de host utilizáveis existem em uma sub-rede /29?',
    options: ['6', '8', '14', '30'],
    answer: 0,
    explanation: 'A /29 prefixo deixa 32 - 29 = 3 bits para hosts. Isso dá 2^3 = 8 endereços totais. Subtraindo o endereço de rede e o endereço de broadcast, restam 6 endereços de host utilizáveis.',
  },
  {
    id: 6,
    topicId: 'protocols',
    question: 'Qual protocolo não tem estado (stateless)?',
    options: ['TCP', 'HTTP', 'FTP', 'Telnet'],
    answer: 1,
    explanation: 'O HTTP é um protocolo sem estado, o que significa que cada solicitação de um cliente para um servidor é tratada como uma transação independente. O servidor não retém nenhuma informação de sessão sobre o cliente.',
  },
  {
    id: 7,
    topicId: 'protocols',
    question: 'Qual porta o DNS usa principalmente?',
    options: ['25', '53', '80', '443'],
    answer: 1,
    explanation: 'O Sistema de Nomes de Domínio (DNS) usa principalmente a porta UDP 53 para consultas. Ele também pode usar a porta TCP 53 para transferências de zona ou para consultas que excedem o limite de tamanho do UDP.',
  },
  {
    id: 8,
    topicId: 'devices',
    question: 'Um dispositivo que conecta vários computadores em uma única LAN e opera na Camada 2 é chamado de...?',
    options: ['Hub', 'Roteador', 'Switch', 'Modem'],
    answer: 2,
    explanation: 'Um switch é um dispositivo da Camada 2 que usa endereços MAC para encaminhar dados para dispositivos específicos em uma rede local (LAN), melhorando a eficiência em relação a um hub.',
  },
  {
    id: 9,
    topicId: 'devices',
    question: 'Qual dispositivo é usado para conectar redes diferentes e toma decisões de roteamento com base em endereços IP?',
    options: ['Switch', 'Roteador', 'Bridge', 'Repetidor'],
    answer: 1,
    explanation: 'Um roteador é um dispositivo da Camada 3 que conecta duas ou mais redes diferentes. Ele usa endereços IP para determinar o melhor caminho para encaminhar pacotes entre essas redes.',
  },
  {
    id: 10,
    topicId: 'security',
    question: 'Qual dos seguintes é um tipo comum de firewall que monitora o estado das conexões ativas?',
    options: ['Firewall de filtragem de pacotes', 'Firewall de proxy', 'Firewall de inspeção de estado', 'Firewall de próxima geração'],
    answer: 2,
    explanation: 'Um firewall de inspeção de estado rastreia o estado das conexões de rede e toma decisões com base no contexto da conexão, oferecendo mais segurança do que um simples firewall de filtragem de pacotes.',
  },
  {
    id: 11,
    topicId: 'security',
    question: 'O que significa "VPN"?',
    options: ['Rede Privada Virtual', 'Rede Muito Privada', 'Rede Pública Virtual', 'Rede Privada Verificada'],
    answer: 0,
    explanation: 'VPN significa Rede Privada Virtual. Ela cria uma conexão segura e criptografada em uma rede menos segura, como a internet pública.',
  },
];

export const weeklyProgress = [
  { week: 'Semana 1', points: 150 },
  { week: 'Semana 2', points: 220 },
  { week: 'Semana 3', points: 180 },
  { week: 'Semana 4', points: 350 },
];
