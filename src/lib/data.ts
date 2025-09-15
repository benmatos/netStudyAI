import type { ComponentType } from 'react';
import { Network, Layers, Globe, ShieldCheck, Server } from 'lucide-react';

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export const topics: Topic[] = [
  {
    id: 'conceitos-basicos',
    name: 'Conceitos Básicos de Rede',
    description: 'Tipos de rede (LAN, WAN), topologias e hardware essencial como cabos e NICs.',
    icon: Network,
  },
  {
    id: 'modelos-osi-tcpip',
    name: 'Modelo OSI e TCP/IP',
    description: 'Entenda as camadas dos modelos de referência que governam a comunicação de rede.',
    icon: Layers,
  },
  {
    id: 'enderecamento-ip',
    name: 'Endereçamento IP e Sub-redes',
    description: 'Domine o endereçamento IPv4/IPv6, máscaras de sub-rede e o cálculo de redes.',
    icon: Globe,
  },
  {
    id: 'protocolos-essenciais',
    name: 'Protocolos Essenciais',
    description: 'Aprenda sobre TCP, UDP, HTTP, DNS, DHCP e outros protocolos chave.',
    icon: Server,
  },
  {
    id: 'seguranca-de-rede',
    name: 'Segurança de Rede',
    description: 'Explore os princípios de firewalls, VPNs, criptografia e políticas de segurança.',
    icon: ShieldCheck,
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
  name:string;
  description: string;
}


export function getIconForTopic(topicId: string): ComponentType<{ className?: string }> {
  const topic = topics.find(t => t.id === topicId);
  return topic ? topic.icon : () => null;
}

export const questions: Question[] = [
  // Conceitos Básicos de Rede - 20 questions
  {
    id: 1,
    topicId: 'conceitos-basicos',
    question: 'Qual topologia de rede conecta todos os dispositivos a um ponto central, como um switch?',
    options: ['Anel', 'Barramento', 'Estrela', 'Malha'],
    answer: 2,
    explanation: 'Na topologia em estrela, todos os dispositivos são conectados a um hub ou switch central. Falhas em um link afetam apenas um dispositivo, mas uma falha no ponto central paralisa a rede.',
  },
  {
    id: 2,
    topicId: 'conceitos-basicos',
    question: 'O que significa a sigla LAN?',
    options: ['Large Area Network', 'Local Area Network', 'Logical Area Network', 'Long Area Network'],
    answer: 1,
    explanation: 'LAN significa Local Area Network (Rede de Área Local). É uma rede que abrange uma área geográfica pequena, como um escritório, casa ou um prédio.',
  },
  {
    id: 3,
    topicId: 'conceitos-basicos',
    question: 'Qual tipo de cabo é mais comumente usado em redes Ethernet modernas?',
    options: ['Cabo Coaxial', 'Fibra Óptica', 'Par Trançado (UTP/STP)', 'Cabo Serial'],
    answer: 2,
    explanation: 'O cabo de Par Trançado, especialmente o UTP (Unshielded Twisted Pair) Cat 5e e Cat 6, é o padrão para conexões Ethernet com fio due to seu custo-benefício e desempenho.',
  },
  {
    id: 4,
    topicId: 'conceitos-basicos',
    question: 'Um dispositivo que opera na Camada 1 e simplesmente repete o sinal para todas as portas é um:',
    options: ['Switch', 'Roteador', 'Hub', 'Bridge'],
    answer: 2,
    explanation: 'Um hub é um dispositivo da Camada Física (Camada 1) que retransmite todos os dados recebidos para todas as suas portas, criando um único domínio de colisão.',
  },
  {
    id: 5,
    topicId: 'conceitos-basicos',
    question: 'Qual dispositivo é necessário para conectar uma LAN à Internet?',
    options: ['Switch', 'Roteador', 'Repetidor', 'Access Point'],
    answer: 1,
    explanation: 'Um roteador é usado para conectar redes diferentes, como a sua rede local (LAN) e a rede de área ampla (WAN) da Internet. Ele direciona o tráfego entre essas redes.',
  },
  {
    id: 6,
    topicId: 'conceitos-basicos',
    question: 'O que é uma WAN?',
    options: ['Uma rede dentro de um único prédio', 'Uma rede sem fio', 'Uma rede que conecta dispositivos via Bluetooth', 'Uma rede que abrange uma grande área geográfica, como cidades ou países'],
    answer: 3,
    explanation: 'WAN significa Wide Area Network (Rede de Área Ampla). Ela interliga múltiplas LANs que podem estar em diferentes cidades, estados ou até continentes.',
  },
  {
    id: 7,
    topicId: 'conceitos-basicos',
    question: 'Qual é a função de uma Placa de Rede (NIC)?',
    options: ['Armazenar arquivos da rede', 'Fornecer a interface física e de enlace para um computador se conectar a uma rede', 'Apenas modular o sinal de internet', 'Bloquear vírus'],
    answer: 1,
    explanation: 'A NIC (Network Interface Card) é o hardware que permite a um computador ou dispositivo se conectar a uma rede. Ela possui um endereço MAC único.',
  },
  {
    id: 8,
    topicId: 'conceitos-basicos',
    question: 'Na topologia de barramento (bus), como os dispositivos são conectados?',
    options: ['A um ponto central', 'Em um círculo fechado', 'A um único cabo principal (backbone)', 'Todos conectados a todos'],
    answer: 2,
    explanation: 'Na topologia de barramento, todos os dispositivos compartilham um único cabo. Embora simples e barata, uma falha no cabo principal pode derrubar toda a rede.',
  },
  {
    id: 9,
    topicId: 'conceitos-basicos',
    question: 'Qual topologia oferece a maior redundância, mas é também a mais cara?',
    options: ['Estrela', 'Barramento', 'Anel', 'Malha Completa (Full Mesh)'],
    answer: 3,
    explanation: 'Em uma topologia de malha completa, cada dispositivo está conectado a todos os outros. Isso oferece múltiplos caminhos para os dados, garantindo alta redundância, mas o custo de cabeamento é muito alto.',
  },
  {
    id: 10,
    topicId: 'conceitos-basicos',
    question: 'A Internet é o maior exemplo de qual tipo de rede?',
    options: ['LAN', 'MAN', 'WAN', 'PAN'],
    answer: 2,
    explanation: 'A Internet é uma rede global que conecta bilhões de dispositivos em todo o mundo, sendo o maior e mais conhecido exemplo de uma WAN (Wide Area Network).',
  },
  {
    id: 11,
    topicId: 'conceitos-basicos',
    question: 'O que é "throughput" (vazão) em uma rede?',
    options: ['O atraso na transmissão de dados', 'A medida real da quantidade de dados transferida em um período', 'A capacidade máxima teórica de uma rede', 'O número de dispositivos conectados'],
    answer: 1,
    explanation: 'Throughput, ou vazão, é a taxa de transferência de dados real e medida em uma rede, que pode ser afetada por latência, congestionamento e outros fatores. É diferente da largura de banda, que é a capacidade teórica.',
  },
  {
    id: 12,
    topicId: 'conceitos-basicos',
    question: 'O que é latência?',
    options: ['A velocidade de download', 'O tempo que um pacote de dados leva para ir do remetente ao destinatário', 'A quantidade de dados que pode ser enviada', 'A segurança da conexão'],
    answer: 1,
    explanation: 'Latência, ou atraso (delay), é o tempo total que um pacote de dados leva para viajar de um ponto a outro na rede. É um fator crucial para o desempenho de aplicações em tempo real.',
  },
  {
    id: 13,
    topicId: 'conceitos-basicos',
    question: 'Um switch Layer 2 toma decisões de encaminhamento com base em quê?',
    options: ['Endereços IP', 'Endereços MAC', 'Nomes de Host', 'Portas TCP/UDP'],
    answer: 1,
    explanation: 'Um switch padrão opera na Camada 2 (Enlace de Dados) e usa endereços MAC (Media Access Control) para encaminhar quadros (frames) para a porta correta onde o dispositivo de destino está localizado.',
  },
  {
    id: 14,
    topicId: 'conceitos-basicos',
    question: 'Qual é a principal vantagem de um switch sobre um hub?',
    options: ['É mais barato', 'Reduz as colisões de tráfego, encaminhando dados apenas para a porta de destino', 'É mais fácil de instalar', 'Usa menos energia'],
    answer: 1,
    explanation: 'Um switch cria um domínio de colisão por porta, encaminhando o tráfego de forma inteligente apenas para o destinatário. Um hub, por outro lado, envia os dados para todas as portas, aumentando as colisões.',
  },
  {
    id: 15,
    topicId: 'conceitos-basicos',
    question: 'Qual destas opções descreve uma rede MAN?',
    options: ['Uma rede que conecta seus dispositivos pessoais, como celular e fone de ouvido.', 'Uma rede que conecta computadores em um único quarto.', 'Uma rede que interconecta vários prédios em uma cidade.', 'Uma rede que conecta diferentes países.'],
    answer: 2,
    explanation: 'Uma MAN (Metropolitan Area Network) é uma rede que abrange uma área geográfica maior que uma LAN, mas menor que uma WAN, como uma cidade ou um campus universitário grande.',
  },
  {
    id: 16,
    topicId: 'conceitos-basicos',
    question: 'O que é um "domínio de colisão"?',
    options: ['A área física onde os roteadores estão localizados', 'Uma seção da rede onde pacotes de dados podem colidir uns com os outros', 'O alcance de um sinal Wi-Fi', 'Uma lista de sites bloqueados'],
    answer: 1,
    explanation: 'Um domínio de colisão é um segmento de rede onde duas ou mais estações podem transmitir ao mesmo tempo, causando uma colisão. Switches ajudam a segmentar esses domínios.',
  },
  {
    id: 17,
    topicId: 'conceitos-basicos',
    question: 'Qual o modo de transmissão onde a comunicação pode ocorrer em ambas as direções, mas não simultaneamente?',
    options: ['Simplex', 'Half-duplex', 'Full-duplex', 'Multiplex'],
    answer: 1,
    explanation: 'Half-duplex permite a comunicação bidirecional, mas apenas uma direção de cada vez. Walkie-talkies são um exemplo clássico.',
  },
  {
    id: 18,
    topicId: 'conceitos-basicos',
    question: 'Qual o modo de transmissão que permite a comunicação simultânea em ambas as direções?',
    options: ['Simplex', 'Half-duplex', 'Full-duplex', 'Complex'],
    answer: 2,
    explanation: 'Full-duplex permite que dados sejam enviados e recebidos ao mesmo tempo, como em uma conversa telefônica. A maioria das conexões de rede modernas opera em full-duplex.',
  },
  {
    id: 19,
    topicId: 'conceitos-basicos',
    question: 'Fibra óptica transmite dados usando:',
    options: ['Sinais elétricos', 'Pulsos de luz', 'Ondas de rádio', 'Sinais de fumaça'],
    answer: 1,
    explanation: 'A fibra óptica usa pulsos de luz para transmitir dados, o que permite velocidades muito mais altas, maiores distâncias e imunidade a interferência eletromagnética em comparação com cabos de cobre.',
  },
  {
    id: 20,
    topicId: 'conceitos-basicos',
    question: 'Qual dispositivo sem fio é usado para conectar uma rede sem fio a uma rede com fio?',
    options: ['Repetidor Wi-Fi', 'Adaptador Wi-Fi', 'Roteador Wi-Fi', 'Access Point (Ponto de Acesso)'],
    answer: 3,
    explanation: 'Um Access Point (AP) funciona como uma ponte, conectando clientes de uma rede sem fio (WLAN) a uma rede com fio (LAN). Roteadores Wi-Fi domésticos geralmente têm um AP integrado.',
  },

  // Modelo OSI e TCP/IP - 20 questions
  {
    id: 21,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual camada do modelo OSI é responsável pelo endereçamento lógico e roteamento?',
    options: ['Camada Física', 'Camada de Enlace de Dados', 'Camada de Rede', 'Camada de Transporte'],
    answer: 2,
    explanation: 'A Camada de Rede (Camada 3) é responsável pelo endereçamento lógico (endereços IP) e por determinar o melhor caminho para os pacotes viajarem entre redes (roteamento).',
  },
  {
    id: 22,
    topicId: 'modelos-osi-tcpip',
    question: 'Em qual camada do modelo OSI os switches operam?',
    options: ['Camada 1 (Física)', 'Camada 2 (Enlace de Dados)', 'Camada 3 (Rede)', 'Camada 4 (Transporte)'],
    answer: 1,
    explanation: 'Switches padrão (Layer 2) operam na Camada de Enlace de Dados, usando endereços MAC para encaminhar quadros para os dispositivos corretos dentro de uma mesma rede local.',
  },
  {
    id: 23,
    topicId: 'modelos-osi-tcpip',
    question: 'O TCP e o UDP são protocolos de qual camada?',
    options: ['Aplicação', 'Rede', 'Transporte', 'Enlace'],
    answer: 2,
    explanation: 'TCP (Protocolo de Controle de Transmissão) e UDP (Protocolo de Datagrama de Usuário) operam na Camada de Transporte (Camada 4), gerenciando a comunicação de ponta a ponta.',
  },
  {
    id: 24,
    topicId: 'modelos-osi-tcpip',
    question: 'A Camada de Apresentação (Camada 6) do modelo OSI é responsável por:',
    options: ['Roteamento de pacotes', 'Controle de fluxo', 'Formatação, criptografia e compressão de dados', 'Gerenciamento de sessão'],
    answer: 2,
    explanation: 'A Camada de Apresentação garante que os dados estejam em um formato utilizável e é onde a criptografia e a compressão de dados geralmente ocorrem.',
  },
  {
    id: 25,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual é a PDU (Unidade de Dados de Protocolo) da Camada de Enlace de Dados?',
    options: ['Bit', 'Pacote', 'Quadro (Frame)', 'Segmento'],
    answer: 2,
    explanation: 'A PDU da Camada 2 é o Quadro (Frame). A camada de Rede usa Pacotes, e a camada de Transporte usa Segmentos (TCP) ou Datagramas (UDP).',
  },
  {
    id: 26,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual camada do modelo TCP/IP corresponde às camadas de Aplicação, Apresentação e Sessão do modelo OSI?',
    options: ['Aplicação', 'Transporte', 'Internet', 'Acesso à Rede'],
    answer: 0,
    explanation: 'O modelo TCP/IP simplifica as coisas, combinando as funções das três camadas superiores do OSI em uma única camada chamada Aplicação.',
  },
  {
    id: 27,
    topicId: 'modelos-osi-tcpip',
    question: 'A Camada Física (Camada 1) lida com:',
    options: ['Endereçamento IP', 'Detecção de erros', 'Cabos, conectores e sinais elétricos', 'Nomes de domínio'],
    answer: 2,
    explanation: 'A Camada Física é responsável por todos os aspectos físicos da rede, como o tipo de cabeamento, voltagem dos sinais e pinagem dos conectores.',
  },
  {
    id: 28,
    topicId: 'modelos-osi-tcpip',
    question: 'O processo de adicionar cabeçalhos em cada camada à medida que os dados descem a pilha é chamado de:',
    options: ['Fragmentação', 'Encapsulamento', 'Desencapsulamento', 'Segmentação'],
    answer: 1,
    explanation: 'Encapsulamento é o processo de envolver os dados de uma camada superior com o cabeçalho da camada atual antes de passá-los para a camada inferior.',
  },
  {
    id: 29,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual camada OSI é responsável por estabelecer, gerenciar e encerrar diálogos entre aplicações?',
    options: ['Transporte', 'Sessão', 'Apresentação', 'Aplicação'],
    answer: 1,
    explanation: 'A Camada de Sessão (Camada 5) gerencia a conversação (sessão) entre dois computadores, controlando o início, o fim e a manutenção do diálogo.',
  },
  {
    id: 30,
    topicId: 'modelos-osi-tcpip',
    question: 'Quantas camadas tem o modelo OSI?',
    options: ['4', '5', '7', '8'],
    answer: 2,
    explanation: 'O modelo OSI (Open Systems Interconnection) é um modelo de referência conceitual que possui 7 camadas, da Física à de Aplicação.',
  },
  {
    id: 31,
    topicId: 'modelos-osi-tcpip',
    question: 'O endereço MAC é um endereço de qual camada?',
    options: ['Camada 2 (Enlace)', 'Camada 3 (Rede)', 'Camada 4 (Transporte)', 'Camada 7 (Aplicação)'],
    answer: 0,
    explanation: 'O endereço MAC (Media Access Control) é o endereço físico da placa de rede e é usado na Camada de Enlace de Dados para comunicação dentro da mesma rede local.',
  },
  {
    id: 32,
    topicId: 'modelos-osi-tcpip',
    question: 'O modelo TCP/IP é um modelo __________ enquanto o modelo OSI é um modelo _________.',
    options: ['prático, conceitual', 'conceitual, prático', 'obsoleto, moderno', 'moderno, obsoleto'],
    answer: 0,
    explanation: 'O modelo TCP/IP foi desenvolvido para a ARPANET e se tornou o padrão prático da Internet. O modelo OSI foi desenvolvido como um modelo de referência teórico e é usado para ensino e padronização.',
  },
  {
    id: 33,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual camada OSI garante a entrega de dados de ponta a ponta sem erros, em sequência e sem perdas ou duplicações?',
    options: ['Rede', 'Enlace', 'Sessão', 'Transporte'],
    answer: 3,
    explanation: 'A Camada de Transporte (Camada 4), através do protocolo TCP, é responsável pela entrega confiável de dados entre os processos de origem e destino.',
  },
  {
    id: 34,
    topicId: 'modelos-osi-tcpip',
    question: 'Roteadores operam principalmente em qual camada?',
    options: ['Camada 2 (Enlace)', 'Camada 3 (Rede)', 'Camada 4 (Transporte)', 'Camada 7 (Aplicação)'],
    answer: 1,
    explanation: 'Roteadores são dispositivos de Camada 3 que usam endereços IP para encaminhar pacotes entre redes diferentes.',
  },
  {
    id: 35,
    topicId: 'modelos-osi-tcpip',
    question: 'O que é a PDU da Camada de Rede?',
    options: ['Segmento', 'Datagrama', 'Quadro (Frame)', 'Pacote (Packet)'],
    answer: 3,
    explanation: 'A Unidade de Dados de Protocolo (PDU) da Camada 3 (Rede) é o Pacote (Packet).',
  },
  {
    id: 36,
    topicId: 'modelos-osi-tcpip',
    question: 'A camada do modelo TCP/IP responsável por endereçamento e roteamento é a:',
    options: ['Aplicação', 'Transporte', 'Internet', 'Acesso à Rede'],
    answer: 2,
    explanation: 'A camada de Internet do modelo TCP/IP (equivalente à camada de Rede do OSI) lida com o empacotamento, endereçamento e roteamento de pacotes.',
  },
  {
    id: 37,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual das seguintes opções NÃO é uma camada do modelo OSI?',
    options: ['Camada de Internet', 'Camada de Sessão', 'Camada de Rede', 'Camada Física'],
    answer: 0,
    explanation: 'A "Camada de Internet" pertence ao modelo TCP/IP, não ao modelo OSI. O modelo OSI possui uma "Camada de Rede" em seu lugar.',
  },
  {
    id: 38,
    topicId: 'modelos-osi-tcpip',
    question: 'HTTP, FTP, SMTP e DNS são protocolos de qual camada?',
    options: ['Transporte', 'Rede', 'Enlace', 'Aplicação'],
    answer: 3,
    explanation: 'Todos esses são protocolos da camada de Aplicação, que fornecem serviços diretamente aos aplicativos do usuário final.',
  },
  {
    id: 39,
    topicId: 'modelos-osi-tcpip',
    question: 'O controle de acesso ao meio (MAC) é uma subcamada de qual camada OSI?',
    options: ['Física', 'Enlace de Dados', 'Rede', 'Transporte'],
    answer: 1,
    explanation: 'A camada de Enlace de Dados é frequentemente dividida em duas subcamadas: LLC (Logical Link Control) e MAC (Media Access Control), que lida com o acesso ao meio físico.',
  },
  {
    id: 40,
    topicId: 'modelos-osi-tcpip',
    question: 'O processo de remover cabeçalhos à medida que os dados sobem a pilha de protocolos é chamado de:',
    options: ['Encapsulamento', 'Multiplexação', 'Desencapsulamento', 'Rearranjo'],
    answer: 2,
    explanation: 'Desencapsulamento é o processo inverso do encapsulamento. Cada camada remove seu respectivo cabeçalho, interpreta as informações e passa os dados para a camada superior.',
  },

  // Endereçamento IP e Sub-redes - 20 questions
  {
    id: 41,
    topicId: 'enderecamento-ip',
    question: 'Qual é a máscara de sub-rede padrão para uma rede Classe C?',
    options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
    answer: 2,
    explanation: 'No sistema de classes (hoje obsoleto, mas ainda referenciado), as redes Classe C usavam uma máscara /24, que é 255.255.255.0.',
  },
  {
    id: 42,
    topicId: 'enderecamento-ip',
    question: 'Quantos endereços de host utilizáveis existem em uma sub-rede /28?',
    options: ['14', '16', '30', '32'],
    answer: 0,
    explanation: 'Um prefixo /28 deixa 32 - 28 = 4 bits para hosts. Isso dá 2^4 = 16 endereços totais. Subtraindo 2 (um para a rede, um para broadcast), restam 14 endereços utilizáveis.',
  },
  {
    id: 43,
    topicId: 'enderecamento-ip',
    question: 'Qual dos seguintes é um endereço IP privado (RFC 1918)?',
    options: ['172.32.10.5', '192.169.1.1', '10.1.2.3', '1.1.1.1'],
    answer: 2,
    explanation: 'Os blocos de endereços privados são 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16. O endereço 10.1.2.3 está dentro do primeiro bloco.',
  },
  {
    id: 44,
    topicId: 'enderecamento-ip',
    question: 'Qual é o endereço de broadcast da rede 192.168.1.128/25?',
    options: ['192.168.1.192', '192.168.1.254', '192.168.1.255', '192.168.1.0'],
    answer: 2,
    explanation: 'Uma rede /25 tem 128 endereços. A primeira sub-rede é 0-127, a segunda é 128-255. O endereço de broadcast é sempre o último endereço da sub-rede, que neste caso é 192.168.1.255.',
  },
  {
    id: 45,
    topicId: 'enderecamento-ip',
    question: 'O endereço 127.0.0.1 é usado para quê?',
    options: ['Broadcast', 'Loopback', 'Gateway Padrão', 'Servidor DNS'],
    answer: 1,
    explanation: '127.0.0.1 é o endereço de loopback, usado por um host para enviar pacotes a si mesmo, principalmente para testes de software e da pilha de rede.',
  },
  {
    id: 46,
    topicId: 'enderecamento-ip',
    question: 'O que é NAT (Network Address Translation)?',
    options: ['Um protocolo de roteamento', 'Um método para traduzir endereços IP privados em endereços IP públicos', 'Um tipo de criptografia', 'Um protocolo de segurança sem fio'],
    answer: 1,
    explanation: 'NAT é uma técnica usada por roteadores para permitir que vários dispositivos em uma rede privada compartilhem um único endereço IP público para acessar a Internet.',
  },
  {
    id: 47,
    topicId: 'enderecamento-ip',
    question: 'Um endereço IPv6 tem quantos bits?',
    options: ['32', '48', '64', '128'],
    answer: 3,
    explanation: 'Endereços IPv6 são compostos por 128 bits, oferecendo um espaço de endereçamento imensamente maior em comparação com os 32 bits do IPv4.',
  },
  {
    id: 48,
    topicId: 'enderecamento-ip',
    question: 'Qual é a notação CIDR para a máscara de sub-rede 255.255.240.0?',
    options: ['/18', '/20', '/22', '/24'],
    answer: 1,
    explanation: 'A máscara 255.255.240.0 em binário é 11111111.11111111.11110000.00000000. Isso corresponde a 8 + 8 + 4 = 20 bits de rede, portanto, a notação CIDR é /20.',
  },
  {
    id: 49,
    topicId: 'enderecamento-ip',
    question: 'Para qual finalidade o endereço 255.255.255.255 é usado?',
    options: ['Loopback', 'Broadcast na rede local', 'Gateway', 'Unicast'],
    answer: 1,
    explanation: 'O endereço 255.255.255.255 é o endereço de broadcast limitado, que envia uma mensagem para todos os hosts no mesmo segmento de rede local.',
  },
  {
    id: 50,
    topicId: 'enderecamento-ip',
    question: 'O que é APIPA (Automatic Private IP Addressing)?',
    options: ['Um endereço público fixo', 'Um protocolo de segurança', 'Um endereço que um host Windows se atribui quando não encontra um servidor DHCP', 'Um endereço IPv6'],
    answer: 2,
    explanation: 'Quando um dispositivo Windows está configurado para DHCP, mas não encontra um servidor, ele se autoatribui um endereço no intervalo 169.254.0.0/16. Isso é chamado de APIPA.',
  },
  {
    id: 51,
    topicId: 'enderecamento-ip',
    question: 'Qual é o primeiro endereço de host utilizável na rede 172.16.8.0/22?',
    options: ['172.16.8.0', '172.16.8.1', '172.16.7.255', '172.16.11.254'],
    answer: 1,
    explanation: 'O endereço de rede é 172.16.8.0. O primeiro endereço de host utilizável é sempre o endereço de rede mais um, ou seja, 172.16.8.1.',
  },
  {
    id: 52,
    topicId: 'enderecamento-ip',
    question: 'Como o endereço IPv6 fe80:0000:0000:0000:0a00:00ff:fe64:0001 pode ser abreviado?',
    options: ['fe80::a00:ff:fe64:1', 'fe80:0:0:0:a00:ff:fe64:1', 'fe80::0a00:ff:fe64:1', 'fe80:a:f:fe64:1'],
    answer: 0,
    explanation: 'A maior sequência contígua de zeros pode ser substituída por "::" (uma vez por endereço), e os zeros à esquerda em cada bloco de 16 bits podem ser omitidos.',
  },
  {
    id: 53,
    topicId: 'enderecamento-ip',
    question: 'Uma empresa precisa de 500 endereços de host em uma única sub-rede. Qual prefixo CIDR atenderia a essa necessidade?',
    options: ['/24', '/23', '/22', '/21'],
    answer: 2,
    explanation: 'Para 500 hosts, precisamos de 9 bits de host (2^9 = 512 endereços). 32 - 9 = 23. Uma máscara /23 fornece 510 hosts utilizáveis, o que é insuficiente. Uma /22 (10 bits de host, 1022 hosts) é necessária.',
  },
  {
    id: 54,
    topicId: 'enderecamento-ip',
    question: 'O que é o Gateway Padrão (Default Gateway)?',
    options: ['O endereço do seu computador', 'O endereço IP de um servidor web', 'O endereço do roteador que sua rede usa para se comunicar com outras redes', 'O endereço MAC da sua placa de rede'],
    answer: 2,
    explanation: 'O gateway padrão é o dispositivo (geralmente um roteador) para onde o tráfego é enviado quando o destino está em uma rede diferente da rede local.',
  },
  {
    id: 55,
    topicId: 'enderecamento-ip',
    question: 'O que é VLSM (Variable Length Subnet Mask)?',
    options: ['Usar a mesma máscara de sub-rede em toda a rede', 'Usar diferentes máscaras de sub-rede para otimizar o uso do espaço de endereçamento', 'Um tipo de endereço IPv6', 'Um protocolo de roteamento obsoleto'],
    answer: 1,
    explanation: 'VLSM permite que engenheiros de rede usem máscaras de sub-rede de diferentes tamanhos para diferentes sub-redes, o que permite uma alocação de endereços IP muito mais eficiente.',
  },
  {
    id: 56,
    topicId: 'enderecamento-ip',
    question: 'Qual é o ID da rede para o host 10.150.75.200/12?',
    options: ['10.144.0.0', '10.128.0.0', '10.0.0.0', '10.150.0.0'],
    answer: 0,
    explanation: 'Uma máscara /12 (255.240.0.0) tem um tamanho de bloco de 16 no segundo octeto. Os múltiplos são 0, 16, 32, ..., 128, 144, 160. O endereço 150 cai no bloco que começa em 144. Portanto, a rede é 10.144.0.0.',
  },
  {
    id: 57,
    topicId: 'enderecamento-ip',
    question: 'O que é um endereço unicast?',
    options: ['Um endereço que representa um único dispositivo na rede', 'Um endereço que representa um grupo de dispositivos', 'Um endereço que representa todos os dispositivos na rede', 'Um endereço usado para streaming'],
    answer: 0,
    explanation: 'Unicast é a comunicação um-para-um. Um pacote enviado para um endereço unicast é destinado a uma única interface de rede.',
  },
  {
    id: 58,
    topicId: 'enderecamento-ip',
    question: 'Endereços que começam com fe80:: são de que tipo em IPv6?',
    options: ['Global Unicast', 'Unique Local', 'Link-Local', 'Multicast'],
    answer: 2,
    explanation: 'Endereços no bloco fe80::/10 são endereços Link-Local. Eles são usados para comunicação na mesma rede local e não são roteáveis na internet.',
  },
  {
    id: 59,
    topicId: 'enderecamento-ip',
    question: 'Qual máscara de sub-rede empresta 3 bits de host para a rede a partir de uma rede Classe C padrão?',
    options: ['255.255.255.192', '255.255.255.224', '255.255.255.240', '255.255.255.248'],
    answer: 1,
    explanation: 'Uma Classe C padrão é /24. Emprestar 3 bits a torna uma /27. A máscara /27 em binário é ...11100000, que corresponde a 128+64+32 = 224. Portanto, 255.255.255.224.',
  },
  {
    id: 60,
    topicId: 'enderecamento-ip',
    question: 'A principal razão para a criação do IPv6 foi:',
    options: ['Aumentar a velocidade da internet', 'Esgotamento dos endereços IPv4', 'Simplificar as sub-redes', 'Melhorar a segurança do Wi-Fi'],
    answer: 1,
    explanation: 'O crescimento exponencial da Internet levou ao esgotamento do espaço de endereçamento do IPv4. O IPv6, com seus 128 bits, foi criado para resolver esse problema.',
  },

  // Protocolos Essenciais - 20 questions
  {
    id: 61,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo da camada de transporte é não orientado à conexão e não garante a entrega?',
    options: ['TCP', 'UDP', 'IP', 'HTTP'],
    answer: 1,
    explanation: 'UDP (User Datagram Protocol) é um protocolo "fire-and-forget". Ele é rápido porque não tem a sobrecarga de estabelecer uma conexão ou confirmar a entrega, sendo ideal para aplicações como streaming e DNS.',
  },
  {
    id: 62,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo é usado para atribuir endereços IP dinamicamente a dispositivos em uma rede?',
    options: ['DNS', 'HTTP', 'DHCP', 'SMTP'],
    answer: 2,
    explanation: 'DHCP (Dynamic Host Configuration Protocol) automatiza a configuração de rede, fornecendo a clientes um endereço IP, máscara de sub-rede, gateway padrão e servidor DNS.',
  },
  {
    id: 63,
    topicId: 'protocolos-essenciais',
    question: 'O protocolo usado para traduzir nomes de domínio (como www.google.com) em endereços IP é o:',
    options: ['ARP', 'DNS', 'DHCP', 'ICMP'],
    answer: 1,
    explanation: 'DNS (Domain Name System) funciona como a "lista telefônica" da internet, resolvendo nomes fáceis de lembrar em endereços IP numéricos que os computadores entendem.',
  },
  {
    id: 64,
    topicId: 'protocolos-essenciais',
    question: 'Qual porta o protocolo HTTP usa por padrão?',
    options: ['21', '25', '80', '443'],
    answer: 2,
    explanation: 'HTTP (Hypertext Transfer Protocol), o protocolo fundamental da web, opera na porta 80.',
  },
  {
    id: 65,
    topicId: 'protocolos-essenciais',
    question: 'O que o "three-way handshake" do TCP estabelece?',
    options: ['O fim de uma conexão', 'Uma conexão confiável entre cliente e servidor', 'A rota para um pacote', 'O endereço MAC de um dispositivo'],
    answer: 1,
    explanation: 'O processo de três vias (SYN, SYN-ACK, ACK) é como o TCP estabelece e sincroniza uma conexão antes que qualquer dado seja transferido, garantindo a confiabilidade.',
  },
  {
    id: 66,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo é usado pelo comando "ping" para testar a conectividade?',
    options: ['TCP', 'UDP', 'ICMP', 'IGMP'],
    answer: 2,
    explanation: 'O utilitário "ping" usa o ICMP (Internet Control Message Protocol), enviando solicitações de eco e aguardando respostas de eco para verificar se um host está alcançável.',
  },
  {
    id: 67,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo é usado para resolver um endereço IP para um endereço MAC em uma rede local?',
    options: ['DNS', 'DHCP', 'RARP', 'ARP'],
    answer: 3,
    explanation: 'ARP (Address Resolution Protocol) é usado para descobrir o endereço de hardware (MAC) associado a um determinado endereço IP na mesma rede.',
  },
  {
    id: 68,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo é usado para enviar e-mails entre servidores?',
    options: ['POP3', 'IMAP', 'SMTP', 'HTTP'],
    answer: 2,
    explanation: 'SMTP (Simple Mail Transfer Protocol) é o protocolo padrão para "empurrar" (push) e-mails de um cliente para um servidor e para transferir e-mails entre servidores de e-mail.',
  },
  {
    id: 69,
    topicId: 'protocolos-essenciais',
    question: 'HTTPS é a versão segura do HTTP e usa qual porta por padrão?',
    options: ['80', '8080', '443', '22'],
    answer: 2,
    explanation: 'HTTPS (HTTP Secure) criptografa a comunicação HTTP usando TLS/SSL e opera na porta 443.',
  },
  {
    id: 70,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo permite que você acesse e gerencie sua caixa de e-mail em um servidor, mantendo os e-mails no servidor?',
    options: ['POP3', 'SMTP', 'IMAP', 'SNMP'],
    answer: 2,
    explanation: 'IMAP (Internet Message Access Protocol) permite que os clientes acessem e manipulem e-mails diretamente no servidor, sincronizando o estado entre múltiplos dispositivos.',
  },
  {
    id: 71,
    topicId: 'protocolos-essenciais',
    question: 'FTP (File Transfer Protocol) usa duas conexões. Para que serve a porta 21?',
    options: ['Para transferência de dados', 'Para o canal de controle (comandos)', 'Para criptografia', 'Para encerrar a conexão'],
    answer: 1,
    explanation: 'No FTP, a porta 21 é usada para a conexão de controle, onde os comandos (como listar diretórios, enviar arquivo) são trocados. Uma porta separada (20 no modo ativo ou dinâmica no passivo) é usada para a transferência de dados real.',
  },
  {
    id: 72,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo é usado para gerenciamento e monitoramento de dispositivos de rede?',
    options: ['NTP', 'SNMP', 'Telnet', 'RDP'],
    answer: 1,
    explanation: 'SNMP (Simple Network Management Protocol) é amplamente utilizado por administradores de rede para monitorar a saúde, o desempenho e a configuração de dispositivos como roteadores, switches e servidores.',
  },
  {
    id: 73,
    topicId: 'protocolos-essenciais',
    question: 'Qual é a principal vantagem do UDP sobre o TCP?',
    options: ['Garantia de entrega', 'Controle de congestionamento', 'Baixa sobrecarga (overhead) e velocidade', 'Ordenação de pacotes'],
    answer: 2,
    explanation: 'A simplicidade do UDP o torna muito mais rápido que o TCP, pois ele não precisa estabelecer uma conexão nem se preocupar com confirmações, tornando-o ideal para aplicações sensíveis ao tempo.',
  },
  {
    id: 74,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo fornece acesso a um terminal remoto de forma segura e criptografada?',
    options: ['Telnet', 'SSH', 'RDP', 'FTP'],
    answer: 1,
    explanation: 'SSH (Secure Shell), que opera na porta 22, é o sucessor seguro do Telnet. Ele fornece uma conexão de linha de comando criptografada para administrar sistemas remotamente.',
  },
  {
    id: 75,
    topicId: 'protocolos-essenciais',
    question: 'O que o processo DORA representa no contexto do DHCP?',
    options: ['Data, Operation, Request, Acknowledge', 'Discover, Offer, Request, Acknowledge', 'Domain, Organization, Registration, Authority', 'Download, Open, Read, Assign'],
    answer: 1,
    explanation: 'DORA é o acrônimo para os quatro passos do processo DHCP: Discover (cliente procura por um servidor), Offer (servidor oferece um IP), Request (cliente solicita o IP oferecido) e Acknowledge (servidor confirma a atribuição).',
  },
  {
    id: 76,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo é projetado para sincronizar relógios de computadores em uma rede?',
    options: ['TIME', 'DAYTIME', 'NTP', 'SNTP'],
    answer: 2,
    explanation: 'NTP (Network Time Protocol) é um protocolo robusto projetado para sincronizar com precisão os relógios de sistemas em uma rede com uma fonte de tempo de referência.',
  },
  {
    id: 77,
    topicId: 'protocolos-essenciais',
    question: 'Telnet é considerado inseguro porque:',
    options: ['É muito lento', 'Não está mais em desenvolvimento', 'Transmite todos os dados, incluindo senhas, em texto puro', 'Só funciona em sistemas Windows'],
    answer: 2,
    explanation: 'A principal falha de segurança do Telnet é que ele não possui criptografia, o que significa que qualquer pessoa que capture o tráfego pode ler tudo, inclusive nomes de usuário e senhas.',
  },
  {
    id: 78,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo de roteamento é classificado como "link-state"?',
    options: ['RIP', 'EIGRP', 'OSPF', 'BGP'],
    answer: 2,
    explanation: 'OSPF (Open Shortest Path First) é um protocolo de roteamento do tipo link-state. Cada roteador constrói um mapa completo da topologia da rede para tomar decisões de roteamento.',
  },
  {
    id: 79,
    topicId: 'protocolos-essenciais',
    question: 'Qual é o protocolo usado para transferências de arquivos muito simples, sem autenticação, operando sobre UDP?',
    options: ['FTP', 'SFTP', 'SCP', 'TFTP'],
    answer: 3,
    explanation: 'TFTP (Trivial File Transfer Protocol) é uma versão muito simplificada do FTP. Por usar UDP e não ter autenticação, é frequentemente usado para inicializar dispositivos de rede (boot) ou transferir firmware.',
  },
  {
    id: 80,
    topicId: 'protocolos-essenciais',
    question: 'POP3 (Post Office Protocol 3) geralmente funciona de que maneira?',
    options: ['Sincroniza e-mails em vários dispositivos', 'Baixa os e-mails para o dispositivo local e os remove do servidor', 'Envia e-mails do cliente para o servidor', 'Arquiva e-mails na nuvem'],
    answer: 1,
    explanation: 'O comportamento padrão do POP3 é conectar-se ao servidor, baixar todas as mensagens para o cliente local e, em seguida, excluí-las do servidor. É um modelo "offline".',
  },

  // Segurança de Rede - 20 questions
  {
    id: 81,
    topicId: 'seguranca-de-rede',
    question: 'O que a "Confidencialidade" na tríade da CIA garante?',
    options: ['Que os dados não foram alterados', 'Que os dados estão disponíveis quando necessários', 'Que o acesso aos dados é restrito a pessoas não autorizadas', 'Que a origem dos dados é autêntica'],
    answer: 2,
    explanation: 'Confidencialidade é o princípio que visa impedir a divulgação não autorizada de informações. Criptografia é uma ferramenta comum para garantir a confidencialidade.',
  },
  {
    id: 82,
    topicId: 'seguranca-de-rede',
    question: 'O que é um firewall?',
    options: ['Um dispositivo que aumenta a velocidade da rede', 'Um sistema que monitora e controla o tráfego de rede com base em regras de segurança', 'Um antivírus para servidores', 'Um software para criar backups'],
    answer: 1,
    explanation: 'Um firewall atua como uma barreira entre uma rede confiável e uma não confiável (como a Internet), permitindo ou bloqueando o tráfego com base em um conjunto de regras.',
  },
  {
    id: 83,
    topicId: 'seguranca-de-rede',
    question: 'Qual tipo de ataque tenta sobrecarregar um servidor com tanto tráfego que ele não consegue mais responder a solicitações legítimas?',
    options: ['Phishing', 'Man-in-the-Middle', 'Ransomware', 'Negação de Serviço (DoS/DDoS)'],
    answer: 3,
    explanation: 'Um ataque de Negação de Serviço (Denial of Service - DoS) visa tornar um recurso de rede indisponível. Quando o ataque vem de várias fontes, é chamado de DDoS (Distributed DoS).',
  },
  {
    id: 84,
    topicId: 'seguranca-de-rede',
    question: 'O que é uma VPN (Virtual Private Network)?',
    options: ['Uma rede Wi-Fi pública', 'Uma conexão segura e criptografada sobre uma rede pública, como a Internet', 'Um tipo de firewall', 'Um protocolo para acelerar downloads'],
    answer: 1,
    explanation: 'Uma VPN cria um "túnel" criptografado através de uma rede insegura, permitindo que os dados viajem com segurança, como se estivessem em uma rede privada.',
  },
  {
    id: 85,
    topicId: 'seguranca-de-rede',
    question: 'Qual é o protocolo de segurança sem fio mais robusto e recomendado atualmente?',
    options: ['WEP', 'WPA', 'WPA2', 'WPA3'],
    answer: 3,
    explanation: 'WPA3 é o padrão mais recente e seguro, oferecendo proteção mais forte contra ataques de força bruta e criptografia mais robusta em comparação com seus predecessores (WPA2, WPA, WEP).',
  },
  {
    id: 86,
    topicId: 'seguranca-de-rede',
    question: 'Um ataque de Phishing é uma forma de:',
    options: ['Ataque de força bruta', 'Engenharia Social', 'Malware', 'Ataque de Negação de Serviço'],
    answer: 1,
    explanation: 'Phishing é uma técnica de engenharia social que engana os usuários para que eles revelem informações confidenciais (como senhas ou números de cartão de crédito) ao se disfarçar de uma entidade confiável.',
  },
  {
    id: 87,
    topicId: 'seguranca-de-rede',
    question: 'O que é uma DMZ (Zona Desmilitarizada) em uma rede?',
    options: ['Uma área da rede sem qualquer segurança', 'Uma sub-rede que fica entre a rede interna e a Internet, contendo servidores públicos', 'O núcleo mais seguro da rede interna', 'Uma rede Wi-Fi para visitantes'],
    answer: 1,
    explanation: 'Uma DMZ é uma rede de perímetro que isola servidores acessíveis publicamente (como servidores web e de e-mail) do resto da rede interna, adicionando uma camada de segurança.',
  },
  {
    id: 88,
    topicId: 'seguranca-de-rede',
    question: 'Qual é a diferença entre um IDS e um IPS?',
    options: ['IDS é para redes internas, IPS para externas', 'IDS detecta ataques, enquanto IPS tenta bloqueá-los ativamente', 'IPS detecta ataques, enquanto IDS tenta bloqueá-los', 'Não há diferença'],
    answer: 1,
    explanation: 'Um IDS (Intrusion Detection System) é passivo e apenas alerta sobre possíveis ameaças. Um IPS (Intrusion Prevention System) é ativo e pode tomar medidas para impedir que o ataque seja bem-sucedido.',
  },
  {
    id: 89,
    topicId: 'seguranca-de-rede',
    question: 'Qual política de firewall é considerada a mais segura?',
    options: ['Permitir tudo por padrão e negar exceções', 'Negar tudo por padrão e permitir exceções (negação implícita)', 'Permitir todo tráfego de saída', 'Bloquear apenas a porta 80'],
    answer: 1,
    explanation: 'A política de "negação implícita" é a mais segura. Por padrão, nada é permitido, e apenas o tráfego explicitamente necessário para as operações é liberado através de regras específicas.',
  },
  {
    id: 90,
    topicId: 'seguranca-de-rede',
    question: 'O que é um ataque "Man-in-the-Middle" (MitM)?',
    options: ['Um vírus que se espalha por e-mail', 'Um atacante que intercepta e possivelmente altera a comunicação entre duas partes', 'Um ataque que adivinha senhas', 'Um tipo de ransomware'],
    answer: 1,
    explanation: 'Em um ataque MitM, o invasor se posiciona secretamente entre duas partes que acreditam estar se comunicando diretamente, permitindo que ele leia e modifique o tráfego.',
  },
  {
    id: 91,
    topicId: 'seguranca-de-rede',
    question: 'O que o hashing (ex: SHA-256) garante?',
    options: ['Confidencialidade', 'Disponibilidade', 'Autenticação', 'Integridade'],
    answer: 3,
    explanation: 'Funções de hash criam uma "impressão digital" de tamanho fixo para um bloco de dados. Se os dados forem alterados, o hash resultante será diferente, o que permite verificar se os dados mantiveram sua integridade.',
  },
  {
    id: 92,
    topicId: 'seguranca-de-rede',
    question: 'Usar uma senha e um código de uso único gerado em seu smartphone é um exemplo de:',
    options: ['Autenticação de Fator Único', 'Autenticação de Dois Fatores (2FA)', 'Criptografia Simétrica', 'Biometria'],
    answer: 1,
    explanation: '2FA combina dois tipos diferentes de prova: algo que você sabe (senha) e algo que você tem (seu smartphone). Isso torna o acesso muito mais seguro.',
  },
  {
    id: 93,
    topicId: 'seguranca-de-rede',
    question: 'O que é um "honeypot"?',
    options: ['Uma senha mestra para a rede', 'Um sistema de chamariz para atrair e estudar atacantes', 'Um tipo de firewall avançado', 'Um software de backup seguro'],
    answer: 1,
    explanation: 'Um honeypot é um sistema sacrificial projetado para parecer valioso e vulnerável, com o objetivo de atrair atacantes para que suas táticas possam ser estudadas e eles sejam desviados dos sistemas reais.',
  },
  {
    id: 94,
    topicId: 'seguranca-de-rede',
    question: 'O que significa "hardening" de um sistema?',
    options: ['Aumentar sua capacidade de processamento', 'Torná-lo fisicamente mais resistente', 'Reduzir sua superfície de ataque, desativando serviços e portas desnecessários', 'Instalar mais memória RAM'],
    answer: 2,
    explanation: 'Hardening é o processo de proteger um sistema, tornando-o mais seguro. Isso envolve remover softwares desnecessários, aplicar patches, configurar permissões e fechar portas que não estão em uso.',
  },
  {
    id: 95,
    topicId: 'seguranca-de-rede',
    question: 'Qual tipo de malware se anexa a um programa legítimo e se espalha quando esse programa é executado?',
    options: ['Worm', 'Vírus', 'Spyware', 'Adware'],
    answer: 1,
    explanation: 'Um vírus de computador precisa de um programa hospedeiro. Ele se insere em um arquivo executável e, quando o usuário roda esse arquivo, o vírus é ativado e tenta infectar outros programas.',
  },
  {
    id: 96,
    topicId: 'seguranca-de-rede',
    question: 'A filtragem de endereços MAC em uma rede Wi-Fi é uma medida de segurança forte?',
    options: ['Sim, é à prova de falhas.', 'Não, porque endereços MAC podem ser facilmente falsificados (spoofed).', 'Sim, porque endereços MAC são criptografados.', 'Não, porque é muito caro de implementar.'],
    answer: 1,
    explanation: 'Embora possa impedir usuários casuais, a filtragem de MAC é considerada uma segurança fraca, pois um atacante pode facilmente monitorar a rede, descobrir os MACs permitidos e falsificar o seu próprio.',
  },
  {
    id: 97,
    topicId: 'seguranca-de-rede',
    question: 'O que é uma vulnerabilidade de "dia zero" (zero-day)?',
    options: ['Uma vulnerabilidade que é explorada no primeiro dia do mês.', 'Uma falha de segurança que é desconhecida pelo fornecedor e para a qual não existe correção.', 'Uma vulnerabilidade que só afeta sistemas por um dia.', 'Uma falha que permite acesso total ao sistema.'],
    answer: 1,
    explanation: 'Um ataque de "dia zero" explora uma vulnerabilidade que acaba de ser descoberta e para a qual o fornecedor do software ainda não teve tempo de criar um patch, deixando os usuários indefesos.',
  },
  {
    id: 98,
    topicId: 'seguranca-de-rede',
    question: 'Qual o objetivo do padrão IEEE 802.1X?',
    options: ['Aumentar a velocidade do Wi-Fi.', 'Fornecer autenticação de dispositivos na rede antes de conceder o acesso.', 'Padronizar cabos de rede.', 'Criptografar todo o tráfego da Internet.'],
    answer: 1,
    explanation: '802.1X é um padrão de controle de acesso à rede baseado em portas. Ele exige que os dispositivos se autentiquem (geralmente contra um servidor RADIUS) antes de poderem acessar os recursos da LAN ou WLAN.',
  },
  {
    id: 99,
    topicId: 'seguranca-de-rede',
    question: 'Qual tipo de malware se propaga automaticamente por redes, sem precisar de um programa hospedeiro?',
    options: ['Vírus', 'Cavalo de Troia (Trojan)', 'Worm', 'Rootkit'],
    answer: 2,
    explanation: 'Diferente de um vírus, um worm é um malware autônomo que pode se replicar e se espalhar por uma rede por conta própria, explorando vulnerabilidades para infectar outros sistemas.',
  },
  {
    id: 100,
    topicId: 'seguranca-de-rede',
    question: 'Criptografia assimétrica usa:',
    options: ['Uma única chave secreta', 'Duas chaves: uma pública e uma privada', 'Nenhuma chave', 'Uma chave que muda a cada sessão'],
    answer: 1,
    explanation: 'Na criptografia assimétrica, uma chave pública é usada para criptografar os dados, e apenas a chave privada correspondente pode descriptografá-los, o que permite a comunicação segura sem o compartilhamento prévio de um segredo.',
  },
  {
    id: 101,
    topicId: 'modelos-osi-tcpip',
    question: 'A PDU da camada de Transporte que utiliza o protocolo TCP é chamada de:',
    options: ['Pacote', 'Quadro', 'Datagrama', 'Segmento'],
    answer: 3,
    explanation: 'No contexto do TCP, a Unidade de Dados de Protocolo (PDU) da camada de Transporte é chamada de Segmento.',
  },
  {
    id: 102,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual camada do modelo OSI lida com a sincronização, o diálogo e o gerenciamento de sessões entre aplicações?',
    options: ['Camada de Sessão', 'Camada de Transporte', 'Camada de Apresentação', 'Camada de Aplicação'],
    answer: 0,
    explanation: 'A Camada de Sessão (Camada 5) é responsável por estabelecer, gerenciar e encerrar as sessões de comunicação entre os hosts.',
  },
  {
    id: 103,
    topicId: 'protocolos-essenciais',
    question: 'Qual comando é usado em sistemas Windows para visualizar a tabela ARP?',
    options: ['arp -a', 'show arp', 'netstat -r', 'ipconfig /displayarp'],
    answer: 0,
    explanation: 'O comando "arp -a" é usado tanto no Windows quanto em sistemas baseados em Unix/Linux para exibir as entradas da tabela ARP.',
  },
  {
    id: 104,
    topicId: 'conceitos-basicos',
    question: 'A capacidade máxima de dados que um link de comunicação pode transmitir em um determinado período é conhecida como:',
    options: ['Vazão (Throughput)', 'Latência (Latency)', 'Largura de Banda (Bandwidth)', 'Jitter'],
    answer: 2,
    explanation: 'Largura de Banda (Bandwidth) refere-se à capacidade teórica máxima de um link, enquanto a vazão (throughput) é a taxa real de transferência de dados.',
  },
  {
    id: 105,
    topicId: 'enderecamento-ip',
    question: 'No endereço IP 192.168.10.50 com máscara 255.255.255.0, qual é o endereço de rede?',
    options: ['192.168.10.0', '192.168.10.255', '192.168.0.0', '192.168.1.0'],
    answer: 0,
    explanation: 'Aplicando a máscara de sub-rede 255.255.255.0 ao endereço IP 192.168.10.50, a porção da rede é identificada como 192.168.10.0.',
  },
  {
    id: 106,
    topicId: 'seguranca-de-rede',
    question: 'Um ataque onde o agressor envia uma grande quantidade de pacotes SYN para um servidor, sem completar o handshake, é conhecido como:',
    options: ['Ataque de Phishing', 'Ataque de Força Bruta', 'Ataque SYN Flood', 'Ataque Man-in-the-Middle'],
    answer: 2,
    explanation: 'Um ataque SYN Flood explora o processo de handshake do TCP, deixando o servidor com um grande número de conexões semi-abertas, o que esgota seus recursos e o impede de aceitar novas conexões legítimas.',
  },
  {
    id: 107,
    topicId: 'protocolos-essenciais',
    question: 'Qual tipo de registro DNS é usado para mapear um nome de domínio para um endereço IPv4?',
    options: ['AAAA', 'CNAME', 'MX', 'A'],
    answer: 3,
    explanation: 'O registro "A" (Address) é o tipo de registro DNS fundamental que associa um nome de domínio a um endereço IPv4.',
  },
  {
    id: 108,
    topicId: 'conceitos-basicos',
    question: 'Em uma topologia de anel, como os dados são transmitidos?',
    options: ['Para um dispositivo central que os distribui', 'Em uma única direção, passando de um nó para o próximo até chegar ao destino', 'Para todos os dispositivos ao mesmo tempo', 'Por múltiplos caminhos redundantes'],
    answer: 1,
    explanation: 'Na topologia em anel, cada dispositivo está conectado a exatamente dois outros, e os dados circulam em uma única direção. Cada dispositivo atua como um repetidor.',
  },
  {
    id: 109,
    topicId: 'enderecamento-ip',
    question: 'Quantos bits compõem um endereço MAC?',
    options: ['32 bits', '64 bits', '128 bits', '48 bits'],
    answer: 3,
    explanation: 'Um endereço MAC (Media Access Control) é um identificador único de 48 bits, geralmente representado em formato hexadecimal (ex: 00-1A-2B-3C-4D-5E).',
  },
  {
    id: 110,
    topicId: 'seguranca-de-rede',
    question: 'Qual o principal objetivo de um sistema de detecção de intrusão (IDS)?',
    options: ['Bloquear ativamente o tráfego malicioso', 'Monitorar o tráfego da rede e gerar alertas sobre atividades suspeitas', 'Criptografar todos os dados da rede', 'Atribuir endereços IP'],
    answer: 1,
    explanation: 'A função primária de um IDS é a vigilância. Ele analisa o tráfego em busca de padrões de ataque conhecidos ou anomalias e alerta os administradores, mas não bloqueia o tráfego por si só.',
  },
  {
    id: 111,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo é usado para transferir páginas web de um servidor para um navegador?',
    options: ['FTP', 'SMTP', 'HTTP', 'SNMP'],
    answer: 2,
    explanation: 'HTTP (Hypertext Transfer Protocol) é o protocolo fundamental usado para a comunicação entre servidores web e clientes (navegadores), permitindo a transferência de recursos como documentos HTML.',
  },
  {
    id: 112,
    topicId: 'modelos-osi-tcpip',
    question: 'Qual é a PDU (Unidade de Dados de Protocolo) da camada Física?',
    options: ['Bit', 'Quadro', 'Pacote', 'Segmento'],
    answer: 0,
    explanation: 'Na camada Física (Camada 1), a unidade de dados é o Bit, que representa o sinal elétrico, óptico ou de rádio sendo transmitido.',
  },
  {
    id: 113,
    topicId: 'enderecamento-ip',
    question: 'Um endereço IP do tipo 172.20.15.10 pertence a qual classe de endereço privado?',
    options: ['Classe A', 'Classe B', 'Classe C', 'Não é um endereço privado'],
    answer: 1,
    explanation: 'O intervalo de endereços privados da Classe B vai de 172.16.0.0 a 172.31.255.255. O endereço 172.20.15.10 está dentro deste intervalo.',
  },
  {
    id: 114,
    topicId: 'conceitos-basicos',
    question: 'Qual equipamento é capaz de segmentar tanto domínios de colisão quanto domínios de broadcast?',
    options: ['Hub', 'Switch', 'Roteador', 'Repetidor'],
    answer: 2,
    explanation: 'Um switch segmenta domínios de colisão (cada porta é um domínio). Um roteador segmenta domínios de broadcast, pois, por padrão, não encaminha pacotes de broadcast entre suas interfaces.',
  },
  {
    id: 115,
    topicId: 'seguranca-de-rede',
    question: 'Qual protocolo foi o predecessor inseguro do WPA para segurança de redes sem fio?',
    options: ['WEP', 'WPA2', '802.1X', 'TKIP'],
    answer: 0,
    explanation: 'WEP (Wired Equivalent Privacy) foi um dos primeiros protocolos de segurança para Wi-Fi e é notoriamente inseguro devido a falhas criptográficas que o tornam fácil de quebrar.',
  },
  {
    id: 116,
    topicId: 'protocolos-essenciais',
    question: 'Qual é a porta padrão para o protocolo de acesso remoto seguro SSH?',
    options: ['23', '22', '21', '25'],
    answer: 1,
    explanation: 'O protocolo SSH (Secure Shell) usa a porta TCP 22 por padrão para fornecer acesso remoto seguro a sistemas.',
  },
  {
    id: 117,
    topicId: 'modelos-osi-tcpip',
    question: 'A camada de Enlace de Dados é dividida em duas subcamadas. Quais são elas?',
    options: ['LLC e MAC', 'TCP e UDP', 'IP e ICMP', 'Física e Lógica'],
    answer: 0,
    explanation: 'A camada de Enlace de Dados (Layer 2) é dividida em LLC (Logical Link Control), que se comunica com a camada de rede, e MAC (Media Access Control), que interage com a camada física.',
  },
  {
    id: 118,
    topicId: 'enderecamento-ip',
    question: 'Qual tipo de endereço IPv6 é usado para comunicação na Internet pública, sendo globalmente único e roteável?',
    options: ['Link-Local', 'Unique Local', 'Global Unicast', 'Multicast'],
    answer: 2,
    explanation: 'Endereços Global Unicast são o equivalente IPv6 dos endereços IPv4 públicos. Eles são únicos globalmente e podem ser roteados através da Internet.',
  },
  {
    id: 119,
    topicId: 'seguranca-de-rede',
    question: 'Um malware que se disfarça de software legítimo para enganar o usuário a instalá-lo é chamado de:',
    options: ['Worm', 'Vírus', 'Spyware', 'Cavalo de Troia (Trojan Horse)'],
    answer: 3,
    explanation: 'Um Cavalo de Troia é um tipo de malware que se apresenta como um programa útil ou inofensivo, mas que na verdade executa funções maliciosas em segundo plano após a instalação.',
  },
  {
    id: 120,
    topicId: 'protocolos-essenciais',
    question: 'Qual protocolo de roteamento usa a contagem de saltos (hop count) como sua principal métrica?',
    options: ['OSPF', 'BGP', 'EIGRP', 'RIP'],
    answer: 3,
    explanation: 'RIP (Routing Information Protocol) é um protocolo de roteamento do tipo vetor de distância que usa o número de roteadores (saltos) como métrica para determinar o melhor caminho.',
  },
  {
    id: 121,
    topicId: "modelo-osi",
    question: "Qual camada do modelo OSI é responsável pela entrega fim-a-fim e controle de fluxo?",
    options: [
      "Camada de Aplicação",
      "Camada de Transporte",
      "Camada de Rede",
      "Camada de Enlace"
    ],
    answer: 1,
    explanation: "A camada de Transporte (usando protocolos como TCP/UDP) é responsável pela entrega fim-a-fim dos dados e pelo controle de fluxo."
  },
  {
    id: 122,
    topicId: "protocolos",
    question: "O que faz o protocolo ARP (Address Resolution Protocol)?",
    options: [
      "Resolve nomes DNS para endereços IP",
      "Define rotas entre redes diferentes",
      "Traduz endereços IP para endereços de enlace (MAC)",
      "Criptografa pacotes na camada de rede"
    ],
    answer: 2,
    explanation: "O ARP resolve endereços IP para endereços MAC na mesma rede local, permitindo a comunicação entre dispositivos."
  },
  {
    id: 123,
    topicId: "protocolos",
    question: "O protocolo UDP oferece garantia de entrega dos pacotes. (Verdadeiro ou Falso)",
    options: [
      "Verdadeiro",
      "Falso"
    ],
    answer: 1,
    explanation: "Falso. O UDP é um protocolo não orientado à conexão e não oferece garantias de entrega, sendo mais rápido e utilizado para tráfego que tolera perdas, como streaming de vídeo."
  },
  {
    id: 124,
    topicId: "dispositivos",
    question: "Uma rede LAN típica usa qual dos seguintes dispositivos para dividir domínios de colisão?",
    options: [
      "Hub",
      "Switch",
      "Roteador",
      "Repeater"
    ],
    answer: 1,
    explanation: "O switch segmenta domínios de colisão, já que ele encaminha o tráfego apenas para a porta de destino, ao contrário de um hub que envia para todas as portas."
  },
  {
    id: 125,
    topicId: "ipv4-subnetting",
    question: "Qual máscara de sub-rede corresponde à /24 em notação decimal?",
    options: [
      "255.255.0.0",
      "255.255.255.0",
      "255.255.255.128",
      "255.255.255.255"
    ],
    answer: 1,
    explanation: "A notação /24 indica que os 24 primeiros bits do endereço são da rede, o que em decimal corresponde a 255.255.255.0."
  },
  {
    id: 126,
    topicId: "ipv4",
    question: "Em uma rede IPv4, qual endereço é reservado para broadcast?",
    options: [
      "Endereço da rede +1",
      "Endereço do gateway",
      "O maior endereço da sub-rede",
      "O menor endereço da sub-rede"
    ],
    answer: 2,
    explanation: "O endereço de broadcast é o último endereço de uma sub-rede, onde todos os bits da porção de host são '1'. Ele é usado para enviar dados a todos os hosts daquela rede."
  },
  {
    id: 127,
    topicId: "protocolos",
    question: "Qual dos seguintes protocolos é orientado à conexão?",
    options: [
      "UDP",
      "ICMP",
      "TCP",
      "IP"
    ],
    answer: 2,
    explanation: "TCP (Transmission Control Protocol) é um protocolo orientado à conexão que estabelece uma conexão confiável antes de enviar os dados."
  },
  {
    id: 128,
    topicId: "dispositivos",
    question: "Em qual camada do modelo OSI opera o switch de camada 2?",
    options: [
      "Camada de Rede",
      "Camada Física",
      "Camada de Enlace",
      "Camada Física + Enlace"
    ],
    answer: 2,
    explanation: "Um switch de camada 2 opera na camada de Enlace de Dados, utilizando endereços MAC para tomar decisões de encaminhamento."
  },
  {
    id: 129,
    topicId: "servicos-de-rede",
    question: "Qual serviço converte nomes de domínio em endereços IP?",
    options: [
      "SMTP",
      "DNS",
      "FTP",
      "DHCP"
    ],
    answer: 1,
    explanation: "O DNS (Domain Name System) é o serviço que traduz nomes de domínio legíveis por humanos (ex: www.google.com) para endereços IP numéricos."
  },
  {
    id: 130,
    topicId: "topologias",
    question: "Qual topologia de rede consiste de todos os nós conectados a um único ponto central?",
    options: [
      "Barramento",
      "Anel",
      "Estrela",
      "Malha"
    ],
    answer: 2,
    explanation: "Na topologia em estrela, todos os dispositivos se conectam a um ponto central, como um switch ou hub."
  },
  {
    id: 131,
    topicId: "servicos-de-rede",
    question: "Qual o propósito do protocolo DHCP?",
    options: [
      "Atribuir dinamicamente endereços IP",
      "Converter nomes para IP",
      "Fornecer serviço de e-mail",
      "Sincronizar relógios"
    ],
    answer: 0,
    explanation: "O DHCP (Dynamic Host Configuration Protocol) atribui automaticamente endereços IP e outras configurações de rede a dispositivos conectados."
  },
  {
    id: 132,
    topicId: "protocolos",
    question: "O que faz o protocolo ICMP?",
    options: [
      "Transporte de dados de aplicação",
      "Diagnóstico e mensagens de controle (ex: ping)",
      "Roteamento entre AS",
      "Criptografia de tráfego"
    ],
    answer: 1,
    explanation: "O ICMP (Internet Control Message Protocol) é usado para enviar mensagens de erro e diagnóstico, como as usadas pelo comando 'ping'."
  },
  {
    id: 133,
    topicId: "nat-e-seguranca",
    question: "Qual é a função do NAT (Network Address Translation)?",
    options: [
      "Converter endereços MAC",
      "Converter endereços IP privados em públicos",
      "Aumentar a velocidade do link",
      "Filtrar pacotes por conteúdo"
    ],
    answer: 1,
    explanation: "O NAT traduz endereços IP privados, usados em uma rede local, para um ou mais endereços IP públicos, permitindo que a rede interna acesse a Internet."
  },
  {
    id: 134,
    topicId: "protocolos",
    question: "Qual protocolo é normalmente usado para transferência segura de arquivos (com criptografia)?",
    options: [
      "FTP",
      "TFTP",
      "SFTP",
      "HTTP"
    ],
    answer: 2,
    explanation: "O SFTP (SSH File Transfer Protocol) é um protocolo seguro que transfere arquivos sobre uma conexão SSH, garantindo a criptografia dos dados."
  },
  {
    id: 135,
    topicId: "portas-e-servicos",
    question: "Qual porta TCP padrão é utilizada pelo HTTP sem TLS?",
    options: [
      "80",
      "443",
      "21",
      "25"
    ],
    answer: 0,
    explanation: "O protocolo HTTP, que não usa criptografia, utiliza a porta TCP padrão 80."
  },
  {
    id: 136,
    topicId: "portas-e-servicos",
    question: "Qual porta TCP padrão é utilizada pelo HTTPS?",
    options: [
      "80",
      "443",
      "22",
      "110"
    ],
    answer: 1,
    explanation: "O protocolo HTTPS, que é a versão segura (com TLS/SSL) do HTTP, utiliza a porta TCP padrão 443."
  },
  {
    id: 137,
    topicId: "conceitos-basicos",
    question: "O que significa 'half-duplex' em comunicações de rede?",
    options: [
      "Comunicação em ambos sentidos simultaneamente",
      "Comunicação apenas em um sentido",
      "Comunicação em ambos sentidos, mas não simultaneamente",
      "Comunicação por fibra óptica"
    ],
    answer: 2,
    explanation: "Half-duplex permite a comunicação em ambos os sentidos, mas um de cada vez. É como um walkie-talkie: ou você fala ou escuta."
  },
  {
    id: 138,
    topicId: "dispositivos",
    question: "Qual dispositivo opera na camada 3 e escolhe caminhos entre redes?",
    options: [
      "Hub",
      "Switch L2",
      "Roteador",
      "Repeater"
    ],
    answer: 2,
    explanation: "Um roteador opera na camada de Rede (camada 3) e utiliza endereços IP para determinar o melhor caminho para encaminhar os pacotes entre redes diferentes."
  },
  {
    id: 139,
    topicId: "vlan-e-segmentacao",
    question: "O que é uma VLAN?",
    options: [
      "Uma sub-rede física separada",
      "Uma rede virtual que segmenta domínios de broadcast",
      "Um protocolo de roteamento",
      "Uma técnica para aumentar largura de banda"
    ],
    answer: 1,
    explanation: "VLANs (Virtual LANs) permitem segmentar uma única infraestrutura de rede física em múltiplas redes lógicas, isolando os domínios de broadcast."
  },
  {
    id: 140,
    topicId: "protocolos",
    question: "Qual é a finalidade do protocolo TCP three-way handshake?",
    options: [
      "Descoberta de caminho",
      "Estabelecer conexão confiável entre cliente e servidor",
      "Encryptar dados",
      "Resolver endereços MAC"
    ],
    answer: 1,
    explanation: "O three-way handshake (troca de pacotes SYN, SYN-ACK, ACK) é o processo pelo qual um cliente e um servidor estabelecem uma conexão TCP confiável antes de começar a troca de dados."
  },
  {
    id: 141,
    topicId: "ipv4-cabecalho",
    question: "Qual campo do cabeçalho IP indica o protocolo de camada superior (TCP/UDP/ICMP)?",
    options: [
      "Source IP",
      "Destination IP",
      "Protocol",
      "TTL"
    ],
    answer: 2,
    explanation: "O campo 'Protocol' no cabeçalho IPv4 indica qual protocolo da camada de transporte (como TCP, UDP ou ICMP) está contido no payload do pacote IP."
  },
  {
    id: 142,
    topicId: "ipv4-cabecalho",
    question: "O que significa TTL em cabeçalho IP?",
    options: [
      "Tipo de Transporte",
      "Time To Live (tempo de vida)",
      "Tamanho do pacote",
      "Token de segurança"
    ],
    answer: 1,
    explanation: "TTL (Time to Live) é um contador que garante que os pacotes não fiquem circulando indefinidamente na rede. Ele é decrementado a cada 'salto' (hop), e o pacote é descartado quando o TTL chega a zero."
  },
  {
    id: 143,
    topicId: "servicos-de-rede",
    question: "Qual protocolo é usado para sincronizar relógios entre hosts na internet?",
    options: [
      "NTP",
      "SNMP",
      "DNS",
      "DHCP"
    ],
    answer: 0,
    explanation: "O NTP (Network Time Protocol) é usado para sincronizar os relógios de computadores em uma rede de dados com alta precisão."
  },
  {
    id: 144,
    topicId: "servicos-de-rede",
    question: "Qual é a função do protocolo SNMP?",
    options: [
      "Gerenciamento e monitoramento de dispositivos de rede",
      "Transferência de arquivos",
      "Resolução de nomes",
      "Estabelecer sessões TCP"
    ],
    answer: 0,
    explanation: "O SNMP (Simple Network Management Protocol) é usado para gerenciar e monitorar dispositivos em uma rede IP."
  },
  {
    id: 145,
    topicId: "ipv4-subnetting",
    question: "Qual mecanismo divide uma rede grande em sub-redes menores?",
    options: [
      "VLAN",
      "Subnetting",
      "NAT",
      "ARP"
    ],
    answer: 1,
    explanation: "Subnetting é o processo de dividir um bloco de endereços IP em sub-redes menores, o que ajuda a otimizar o uso do espaço de endereços e a gerenciar melhor o tráfego de rede."
  },
  {
    id: 146,
    topicId: "ipv4-especiais",
    question: "Qual endereço IPv4 é considerado 'loopback'?",
    options: [
      "0.0.0.0",
      "127.0.0.1",
      "255.255.255.255",
      "192.168.0.1"
    ],
    answer: 1,
    explanation: "O endereço 127.0.0.1 é reservado para 'loopback', permitindo que um host envie pacotes para si mesmo para fins de teste e diagnóstico."
  },
  {
    id: 147,
    topicId: "protocolos",
    question: "O que faz o protocolo FTP?",
    options: [
      "Envia e-mails",
      "Transferência de arquivos sem criptografia",
      "Resolução de nomes",
      "Gerenciamento de rede"
    ],
    answer: 1,
    explanation: "O FTP (File Transfer Protocol) é usado para transferir arquivos entre um cliente e um servidor. Por padrão, ele não usa criptografia."
  },
  {
    id: 148,
    topicId: "modelo-osi",
    question: "Qual camada do modelo TCP/IP corresponde aproximadamente à camada de sessão e apresentação do modelo OSI?",
    options: [
      "Aplicação",
      "Transporte",
      "Internet",
      "Link"
    ],
    answer: 0,
    explanation: "No modelo simplificado TCP/IP, as funcionalidades das camadas de Sessão, Apresentação e Aplicação do modelo OSI são combinadas na única camada de Aplicação."
  },
  {
    id: 149,
    topicId: "ipv4-privados",
    question: "Qual é o endereço IPv4 privado presente no bloco 10.0.0.0/8?",
    options: [
      "10.0.0.1",
      "172.16.0.1",
      "192.168.1.1",
      "169.254.0.1"
    ],
    answer: 0,
    explanation: "Os endereços da classe A privada estão na faixa 10.0.0.0 a 10.255.255.255, ou seja, no bloco 10.0.0.0/8."
  },
  {
    id: 150,
    topicId: "ipv4-privados",
    question: "Qual é a faixa de endereços IPv4 privados para 192.168.0.0/16?",
    options: [
      "192.168.0.0 - 192.168.255.255",
      "192.168.0.0 - 192.168.0.255",
      "192.0.0.0 - 192.168.255.255",
      "192.168.1.0 - 192.168.1.255"
    ],
    answer: 0,
    explanation: "O bloco 192.168.0.0/16 engloba todos os endereços que começam com 192.168, desde 192.168.0.0 até 192.168.255.255."
  },
  {
    id: 151,
    topicId: "redes-locais",
    question: "O que é 'broadcast domain'?",
    options: [
      "Área onde broadcasts são limitados ao mesmo segmento de rede",
      "Área onde roteadores encaminham broadcasts",
      "Uma técnica de segurança",
      "Um protocolo de roteamento"
    ],
    answer: 0,
    explanation: "Um 'broadcast domain' é uma área de uma rede onde um pacote de broadcast enviado por um dispositivo pode ser ouvido por todos os outros dispositivos. Roteadores e VLANs segmentam esses domínios."
  },
  {
    id: 152,
    topicId: "protocolos",
    question: "Qual protocolo permite descobrir o endereço MAC de um IP conhecido (IPv4) na mesma rede?",
    options: [
      "DNS",
      "ARP",
      "DHCP",
      "ICMP"
    ],
    answer: 1,
    explanation: "O ARP (Address Resolution Protocol) é usado para encontrar o endereço de hardware (MAC) de um host quando apenas o endereço IP é conhecido, dentro de um mesmo segmento de rede."
  },
  {
    id: 153,
    topicId: "redes-locais",
    question: "O que é 'collision domain' em redes Ethernet antigas?",
    options: [
      "Área onde switches isolam tráfego",
      "Área onde frames podem colidir quando usando hubs",
      "Domínio gerenciado por roteador",
      "Um tipo de VLAN"
    ],
    answer: 1,
    explanation: "Um 'collision domain' é a parte de uma rede onde pacotes de dados podem 'colidir' uns com os outros, causando a perda de dados. Isso era comum em redes que usavam hubs e foi resolvido com o uso de switches."
  },
  {
    id: 154,
    topicId: "q-o-s",
    question: "Qual técnica divide o tráfego em diferentes prioridades (voz, dados) em uma rede?",
    options: [
      "NAT",
      "QoS",
      "ARP",
      "STP"
    ],
    answer: 1,
    explanation: "QoS (Quality of Service) é uma técnica usada para gerenciar o tráfego de rede e priorizar o tráfego mais importante (como voz e vídeo) em detrimento de outros, garantindo uma melhor experiência do usuário."
  },
  {
    id: 155,
    topicId: "roteamento",
    question: "O que faz o protocolo BGP?",
    options: [
      "Roteamento dentro de um AS (Interior)",
      "Roteamento entre sistemas autônomos (Exterior)",
      "Resolving ARP",
      "Gerenciar switches"
    ],
    answer: 1,
    explanation: "BGP (Border Gateway Protocol) é o principal protocolo de roteamento usado para trocar informações de roteamento entre diferentes Sistemas Autônomos (AS) na Internet."
  },
  {
    id: 156,
    topicId: "protocolos",
    question: "Qual protocolo é usado para envio de e-mail entre servidores?",
    options: [
      "IMAP",
      "POP3",
      "SMTP",
      "FTP"
    ],
    answer: 2,
    explanation: "O SMTP (Simple Mail Transfer Protocol) é o protocolo padrão para enviar e-mails de um servidor para outro e de um cliente de e-mail para um servidor de e-mail."
  },
  {
    id: 157,
    topicId: "servicos-de-rede",
    question: "Qual protocolo permite acessar e gerenciar remotamente um shell de forma segura?",
    options: [
      "Telnet",
      "FTP",
      "SSH",
      "RDP"
    ],
    answer: 2,
    explanation: "O SSH (Secure Shell) é um protocolo que fornece uma conexão de shell segura e criptografada para acesso remoto a sistemas."
  },
  {
    id: 158,
    topicId: "dispositivos-e-protocolos",
    question: "Qual técnica previne loops em redes com switches por meio de bloqueio de portas redundantes?",
    options: [
      "STP (Spanning Tree Protocol)",
      "QoS",
      "ARP",
      "OSPF"
    ],
    answer: 0,
    explanation: "O STP (Spanning Tree Protocol) é um protocolo que detecta e desativa caminhos redundantes em uma rede com switches, evitando a criação de loops de broadcast."
  },
  {
    id: 159,
    topicId: "roteamento",
    question: "Qual protocolo de roteamento é tipicamente usado em redes corporativas para roteamento interno (link-state)?",
    options: [
      "RIP",
      "OSPF",
      "BGP",
      "EIGRP"
    ],
    answer: 1,
    explanation: "O OSPF (Open Shortest Path First) é um protocolo de roteamento interno (IGP) do tipo link-state, muito utilizado em redes corporativas grandes e complexas."
  },
  {
    id: 160,
    topicId: "conceitos-basicos",
    question: "Qual é a função do gateway padrão em uma estação de trabalho?",
    options: [
      "Servir como nome do host",
      "Encaminhar pacotes para fora da sub-rede local",
      "Atribuir IPs dinâmicos",
      "Resolver MACs"
    ],
    answer: 1,
    explanation: "O gateway padrão é o endereço IP do roteador que o host usa para enviar pacotes para redes externas (ou seja, para fora de sua sub-rede local)."
  },
  {
    id: 161,
    topicId: "conceitos-basicos",
    question: "O que é 'MTU' (Maximum Transmission Unit)?",
    options: [
      "Máxima taxa de transferência",
      "Tamanho máximo de payload que pode ser transmitido em um único quadro",
      "Tempo de vida do pacote",
      "Número de saltos permitido"
    ],
    answer: 1,
    explanation: "MTU (Maximum Transmission Unit) é o maior tamanho de um pacote de dados, em bytes, que pode ser transmitido em uma rede sem ser fragmentado."
  },
  {
    id: 162,
    topicId: "protocolos",
    question: "Qual protocolo de transporte usa números de porta e oferece controle de congestionamento?",
    options: [
      "UDP",
      "ICMP",
      "TCP",
      "ARP"
    ],
    answer: 2,
    explanation: "O TCP usa números de porta para identificar aplicações e inclui mecanismos robustos para controle de fluxo e de congestionamento, garantindo a entrega confiável dos dados."
  },
  {
    id: 163,
    topicId: "ipv4-cabecalho",
    question: "O que é 'fragmentação' em IPv4?",
    options: [
      "Divisão de pacotes grandes em pacotes menores para atravessar redes com MTU menor",
      "Criptografia de pacotes",
      "Conversão de IPv4 para IPv6",
      "Segmentação por VLAN"
    ],
    answer: 0,
    explanation: "Fragmentação é o processo de dividir um pacote IP grande em pacotes menores quando ele precisa passar por uma rede que suporta um MTU menor do que o pacote original."
  },
  {
    id: 164,
    topicId: "vlan-e-segmentacao",
    question: "Qual técnica permite múltiplos dispositivos compartilharem uma única interface física usando subinterfaces lógicas (ex: roteador)?",
    options: [
      "NAT",
      "Subinterfaces e encapsulamentos (802.1Q)",
      "ARP",
      "DHCP"
    ],
    answer: 1,
    explanation: "Subinterfaces de roteador, combinadas com o padrão de encapsulamento 802.1Q (VLAN tagging), permitem que uma única porta física de roteador gerencie o tráfego de várias VLANs (redes lógicas)."
  },
  {
    id: 165,
    topicId: "redes-locais",
    question: "O que é 'link aggregation' (LACP)?",
    options: [
      "Protocolo para balancear carga por múltiplos links físicos",
      "Protocolo de roteamento",
      "Técnica de encapsulamento",
      "Uma forma de NAT"
    ],
    answer: 0,
    explanation: "Link Aggregation, através de protocolos como o LACP, combina múltiplos links físicos entre dois dispositivos (como switches) para aumentar a largura de banda e fornecer redundância."
  },
  {
    id: 166,
    topicId: "ipv6",
    question: "Qual tipo de endereço IPv6 representa múltiplos destinos (um para muitos)?",
    options: [
      "Unicast",
      "Multicast",
      "Anycast",
      "Broadcast"
    ],
    answer: 1,
    explanation: "O endereço Multicast em IPv6 é usado para enviar pacotes de um único remetente para um grupo de destinatários, otimizando o envio de tráfego para múltiplos hosts."
  },
  {
    id: 167,
    topicId: "ipv6-especiais",
    question: "O que é um endereço IPv6 'link-local' que começa com 'fe80::' usado para?",
    options: [
      "Roteamento na Internet",
      "Comunicação apenas no segmento local",
      "Broadcast global",
      "Endereçamento privado para VPNs"
    ],
    answer: 1,
    explanation: "Endereços link-local IPv6, que começam com fe80::, são usados para comunicação entre dispositivos no mesmo segmento de rede e não podem ser roteados para fora."
  },
  {
    id: 168,
    topicId: "ipv6",
    question: "Qual é o propósito do IPv6 SLAAC (StateLess Address Auto-Configuration)?",
    options: [
      "Atribuir endereços IPv6 automaticamente sem DHCPv6",
      "Substituir DNS",
      "Criptografar pacotes",
      "Converter MACs"
    ],
    answer: 0,
    explanation: "SLAAC permite que dispositivos configurem seus próprios endereços IPv6 automaticamente, usando informações do roteador e seu próprio endereço MAC, sem a necessidade de um servidor DHCPv6."
  },
  {
    id: 169,
    topicId: "comandos-de-rede",
    question: "Qual comando é comumente usado para testar conectividade entre dois hosts (ICMP echo)?",
    options: [
      "traceroute",
      "telnet",
      "ping",
      "nslookup"
    ],
    answer: 2,
    explanation: "O comando 'ping' envia pacotes ICMP 'echo request' para um host de destino e mede o tempo de resposta, sendo uma ferramenta básica para testar a conectividade."
  },
  {
    id: 170,
    topicId: "comandos-de-rede",
    question: "O que faz o comando traceroute (ou tracert)?",
    options: [
      "Mede velocidade da rede",
      "Mostra rota e saltos entre origem e destino",
      "Resolve nomes DNS",
      "Atribui IPs"
    ],
    answer: 1,
    explanation: "O comando 'traceroute' (ou 'tracert' no Windows) exibe o caminho que um pacote percorre na rede, listando cada roteador ('hop') por onde o pacote passa até chegar ao destino."
  },
  {
    id: 171,
    topicId: "nat-e-seguranca",
    question: "Qual é o propósito de um 'proxy' em rede?",
    options: [
      "Atribuir endereços",
      "Intermediar requisições entre cliente e servidor, podendo cachear e filtrar",
      "Gerenciar VLANs",
      "Roteamento BGP"
    ],
    answer: 1,
    explanation: "Um servidor proxy atua como um intermediário entre um cliente e um servidor, podendo armazenar em cache páginas da web, filtrar conteúdo e fornecer anonimato."
  },
  {
    id: 172,
    topicId: "nat-e-seguranca",
    question: "O que é 'port forwarding' em NAT?",
    options: [
      "Converter endereços MAC",
      "Encaminhar conexões externas para uma porta/host interno específico",
      "Bloquear portas no firewall",
      "Atribuir IPs públicos automaticamente"
    ],
    answer: 1,
    explanation: "Port forwarding é a técnica de redirecionar o tráfego que chega em uma porta pública do roteador para um host e porta específicos na rede interna."
  },
  {
    id: 173,
    topicId: "portas-e-servicos",
    question: "Qual protocolo usa portas 20 e 21 por padrão?",
    options: [
      "HTTPS",
      "FTP",
      "SSH",
      "SMTP"
    ],
    answer: 1,
    explanation: "O FTP (File Transfer Protocol) usa a porta 21 para o canal de controle e a porta 20 (em modo ativo) para o canal de dados."
  },
  {
    id: 174,
    topicId: "redes-locais",
    question: "O que significa 'sticky MAC' em switches?",
    options: [
      "MACs que não podem ser aprendidos",
      "Associação de um MAC a uma porta específica para segurança",
      "Técnica para acelerar switching",
      "Protocolo de roteamento"
    ],
    answer: 1,
    explanation: "'Sticky MAC' é um recurso de segurança de switches que permite associar dinamicamente os endereços MAC aprendidos a uma porta, evitando que outros dispositivos usem a mesma porta para se comunicar."
  },
  {
    id: 175,
    topicId: "protocolos",
    question: "Qual protocolo detecta topologia de rede e fornece informações a switches gerenciáveis (ex: LLDP)?",
    options: [
      "LLDP",
      "OSPF",
      "BGP",
      "ARP"
    ],
    answer: 0,
    explanation: "O LLDP (Link Layer Discovery Protocol) é um protocolo de camada de enlace que permite que dispositivos de rede anunciem sua identidade e capacidades para outros dispositivos conectados."
  },
  {
    id: 176,
    topicId: "nat-e-seguranca",
    question: "O que é 'masquerading' em NAT?",
    options: [
      "Uma forma de NAT onde múltiplos hosts compartilham um único endereço IP público, típicamente usando portas",
      "Substituir MAC por IP",
      "Técnica de criptografia",
      "Protocolo de roteamento"
    ],
    answer: 0,
    explanation: "Masquerading é uma forma de NAT dinâmico onde vários hosts de uma rede privada compartilham um único endereço IP público, diferenciando-se pelas portas de origem."
  },
  {
    id: 177,
    topicId: "nat-e-seguranca",
    question: "Qual é a diferença principal entre 'stateful' e 'stateless' firewall?",
    options: [
      "Stateful analisa/ mantém estado das conexões; stateless apenas filtra pacotes individualmente",
      "Stateless é mais lento",
      "Stateful não filtra portas",
      "Não há diferença"
    ],
    answer: 0,
    explanation: "Um firewall 'stateful' rastreia o estado das conexões e permite o tráfego de retorno automaticamente, enquanto um firewall 'stateless' filtra cada pacote individualmente, sem considerar o contexto da conexão."
  },
  {
    id: 178,
    topicId: "servicos-de-rede",
    question: "O que é 'SSDP' comumente usado em redes domésticas (UPnP)?",
    options: [
      "Protocolo de roteamento",
      "Simple Service Discovery Protocol para descoberta de serviços UPnP",
      "Substituição de DHCP",
      "Criptografia de dados"
    ],
    answer: 1,
    explanation: "SSDP (Simple Service Discovery Protocol) é um protocolo usado em redes domésticas para que dispositivos possam se descobrir mutuamente e anunciar seus serviços (UPnP)."
  },
  {
    id: 179,
    topicId: "nat-e-seguranca",
    question: "Qual tecnologia é usada para criar redes privadas virtuais (VPN) em nível de IP que encapsulam pacotes?",
    options: [
      "EtherChannel",
      "IPsec",
      "STP",
      "ARP"
    ],
    answer: 1,
    explanation: "IPsec (Internet Protocol Security) é um conjunto de protocolos que fornece segurança para a comunicação IP, sendo amplamente utilizado para criar túneis VPNs que encapsulam e criptografam o tráfego."
  },
  {
    id: 180,
    topicId: "roteamento",
    question: "O que é 'split-horizon' em protocolos de roteamento distance-vector como RIP?",
    options: [
      "Evitar que rotas sejam anunciadas de volta pela interface de origem para prevenir loops",
      "Aumentar banda",
      "Criptografar atualizações",
      "Usar diferentes caminhos para tráfego de saída"
    ],
    answer: 0,
    explanation: "Split-horizon é uma regra de roteamento que impede que um roteador anuncie uma rota de volta pela mesma interface de onde a aprendeu, prevenindo loops de roteamento."
  },
  {
    id: 181,
    topicId: "protocolos",
    question: "Qual é a finalidade do protocolo RARP (Reverse ARP)?",
    options: [
      "Mapear IP para MAC",
      "Mapear MAC para IP (originalmente usado por discos sem memória)",
      "Sincronizar tempo",
      "Resolver nomes"
    ],
    answer: 1,
    explanation: "O RARP (Reverse Address Resolution Protocol) era usado para permitir que um dispositivo descobrisse seu endereço IP a partir de seu endereço MAC. Ele foi amplamente substituído pelo DHCP."
  },
  {
    id: 182,
    topicId: "ipv4-especiais",
    question: "Qual é a faixa de endereços APIPA/Link-local IPv4 usada quando DHCP falha (169.254.0.0)?",
    options: [
      "169.254.0.0 - 169.254.255.255",
      "192.168.0.0 - 192.168.255.255",
      "10.0.0.0 - 10.255.255.255",
      "127.0.0.0 - 127.255.255.255"
    ],
    answer: 0,
    explanation: "O APIPA (Automatic Private IP Addressing) atribui endereços na faixa 169.254.0.0/16 a dispositivos quando eles não conseguem obter um endereço IP de um servidor DHCP."
  },
  {
    id: 183,
    topicId: "redes-locais",
    question: "O que é 'port security' em switches gerenciáveis?",
    options: [
      "Metodo para balancear portas",
      "Limitar/associar endereços MAC por porta para prevenir acesso não autorizado",
      "Configurar QoS automaticamente",
      "Roteamento interno"
    ],
    answer: 1,
    explanation: "'Port security' é um recurso de segurança de switch que permite associar um ou mais endereços MAC a uma porta específica, bloqueando o acesso de endereços não autorizados."
  },
  {
    id: 184,
    topicId: "protocolos",
    question: "Qual protocolo transporta e-mails recebidos de um servidor para um cliente (download)?",
    options: [
      "SMTP",
      "POP3",
      "BGP",
      "DNS"
    ],
    answer: 1,
    explanation: "POP3 (Post Office Protocol version 3) e IMAP são protocolos usados para que os clientes de e-mail recuperem e-mails de um servidor."
  },
  {
    id: 185,
    topicId: "roteamento",
    question: "O que significa 'asymmetric routing'?",
    options: [
      "Roteamento com caminhos de ida e volta diferentes entre dois hosts",
      "Uso de switches em rede",
      "Roteamento apenas com BGP",
      "Roteamento sem gateways"
    ],
    answer: 0,
    explanation: "Roteamento assimétrico ocorre quando o caminho que os pacotes de uma comunicação fazem para ir da origem ao destino é diferente do caminho que eles fazem para voltar."
  },
  {
    id: 186,
    topicId: "servicos-de-rede",
    question: "Qual é a função do protocolo 'mDNS' (multicast DNS)?",
    options: [
      "Resolução de nomes em redes locais sem servidor DNS central",
      "Roteamento de multicast global",
      "Sincronização de tempo",
      "Criptografia de nomes"
    ],
    answer: 0,
    explanation: "O mDNS (multicast DNS) permite a resolução de nomes de domínio para endereços IP em redes pequenas que não têm um servidor DNS central, facilitando a descoberta de serviços e dispositivos locais."
  },
  {
    id: 187,
    topicId: "modelo-osi",
    question: "Qual camada do modelo OSI é responsável pela representação de dados (por exemplo, compressão, encriptação)?",
    options: [
      "Camada de Sessão",
      "Camada de Apresentação",
      "Camada de Enlace",
      "Camada Física"
    ],
    answer: 1,
    explanation: "A Camada de Apresentação (camada 6) é responsável por garantir que os dados de uma camada de aplicação possam ser lidos por outra. Funções como formatação, compressão e criptografia são realizadas nela."
  },
  {
    id: 188,
    topicId: "servicos-de-rede",
    question: "Qual protocolo fornece tradução de nomes reversa (IP para nome) em DNS?",
    options: [
      "PTR records usados por DNS",
      "A record",
      "CNAME",
      "MX"
    ],
    answer: 0,
    explanation: "O DNS usa registros PTR (Pointer) para tradução de nomes reversa, permitindo que um endereço IP seja traduzido para um nome de domínio associado."
  },
  {
    id: 189,
    topicId: "conceitos-basicos",
    question: "O que é 'carrier sense' no CSMA/CD?",
    options: [
      "Mecanismo para detectar se o meio está ocupado antes de transmitir",
      "Protocolo para configuração de VLANs",
      "Método de criptografia",
      "Uma topologia de rede"
    ],
    answer: 0,
    explanation: "'Carrier sense' é a capacidade de um dispositivo de ouvir o meio de transmissão (cabo) para verificar se ele está livre antes de tentar transmitir dados, parte do protocolo CSMA/CD usado em redes Ethernet."
  },
  {
    id: 190,
    topicId: "protocolos",
    question: "O que é 'flow control' em TCP?",
    options: [
      "Controle de rotas",
      "Mecanismo para evitar que receptor seja sobrecarregado (janela TCP)",
      "Filtro de pacotes",
      "Mapeamento de portas"
    ],
    answer: 1,
    explanation: "O controle de fluxo do TCP usa o conceito de 'janela de recebimento' para garantir que o remetente não envie dados mais rápido do que o receptor pode processá-los, evitando sobrecarga."
  },
  {
    id: 191,
    topicId: "comandos-de-rede",
    question: "Qual comando mostra a tabela de roteamento em sistemas Linux?",
    options: [
      "ifconfig",
      "route -n ou ip route",
      "nslookup",
      "netstat -a"
    ],
    answer: 1,
    explanation: "Os comandos 'route -n' ou 'ip route' são usados em sistemas Linux para exibir a tabela de roteamento do kernel, que contém as rotas que os pacotes seguem."
  },
  {
    id: 192,
    topicId: "gerenciamento-de-rede",
    question: "Qual protocolo permite gerenciamento remoto via interface web de devices e usa SNMP para monitoramento?",
    options: [
      "HTTP/HTTPS com interface de gerenciamento; SNMP para dados",
      "FTP",
      "SMTP",
      "ICMP"
    ],
    answer: 0,
    explanation: "Dispositivos de rede modernos (roteadores, switches) são gerenciados via interface web (HTTP/HTTPS) para configuração e usam SNMP para monitoramento de desempenho."
  },
  {
    id: 193,
    topicId: "gerenciamento-de-rede",
    question: "O que é 'heartbeat' em cluster de roteadores?",
    options: [
      "Mensagem periódica entre nós para verificar disponibilidade e sincronizar estado",
      "Comando para reiniciar switch",
      "Protocolo de roteamento",
      "Tipo de NAT"
    ],
    answer: 0,
    explanation: "Um 'heartbeat' é uma mensagem periódica enviada entre dispositivos em um cluster para verificar se eles estão ativos e funcionando, permitindo detecção de falhas e failover rápido."
  },
  {
    id: 194,
    topicId: "ipv6",
    question: "Qual é a principal vantagem do IPv6 sobre IPv4?",
    options: [
      "Menor cabeçalho",
      "Espaço de endereçamento muito maior e outras melhorias (autoconfig, eliminação de NAT obrigatório)",
      "Uso de TCP por padrão",
      "Menor segurança"
    ],
    answer: 1,
    explanation: "A principal vantagem do IPv6 é o seu vasto espaço de endereçamento, resolvendo a escassez de IPs do IPv4. Ele também traz melhorias como autoconfiguração de endereços e maior eficiência no roteamento."
  },
  {
    id: 195,
    topicId: "ipv6",
    question: "O que significa 'anycast' em IPv6?",
    options: [
      "Endereço entregue a todas as interfaces",
      "Endereço entregue ao host mais próximo de um grupo de interfaces que o anunciam",
      "Endereço broadcast",
      "Endereço multicast"
    ],
    answer: 1,
    explanation: "Anycast é um tipo de endereçamento onde um pacote enviado para um endereço anycast é entregue a apenas um dos hosts do grupo (o 'mais próximo'), o que é útil para serviços como o DNS."
  },
  {
    id: 196,
    topicId: "servicos-de-rede",
    question: "Qual é o papel do 'DNS root servers' na resolução de nomes?",
    options: [
      "Armazenar registros A de todos os domínios",
      "Fornecer referência para TLDs, iniciando a resolução recursiva",
      "Substituir DHCP",
      "Gerenciar certificados TLS"
    ],
    answer: 1,
    explanation: "Os servidores raiz do DNS (root servers) são o ponto de partida na hierarquia do DNS. Eles não armazenam todos os registros, mas direcionam as consultas para os servidores de domínio de nível superior (TLD) apropriados."
  },
  {
    id: 197,
    topicId: "roteamento",
    question: "O que é 'route summarization' (agregação de rotas)?",
    options: [
      "Dividir uma rota em várias pequenas",
      "Combinar várias rotas em uma rota agregada para reduzir tamanho de tabelas de roteamento",
      "Técnica de encriptação de rotas",
      "Balancear carga entre rotas"
    ],
    answer: 1,
    explanation: "A agregação de rotas é uma técnica que agrupa múltiplas rotas de rede em uma única rota, reduzindo o tamanho das tabelas de roteamento e melhorando a eficiência."
  },
  {
    id: 198,
    topicId: "comandos-de-rede",
    question: "Qual comando permite verificar resolução DNS para um nome específico e servidor?",
    options: [
      "ping",
      "nslookup ou dig",
      "ifconfig",
      "route"
    ],
    answer: 1,
    explanation: "Os comandos 'nslookup' e 'dig' são ferramentas de linha de comando para consultar servidores DNS e obter informações sobre nomes de domínio."
  },
  {
    id: 199,
    topicId: "portas-e-servicos",
    question: "Qual é a porta padrão do protocolo SSH?",
    options: [
      "20",
      "21",
      "22",
      "23"
    ],
    answer: 2,
    explanation: "A porta TCP padrão para o protocolo SSH (Secure Shell) é a porta 22."
  },
  {
    id: 200,
    topicId: "protocolos",
    question: "Qual é a função do protocolo TFTP em comparação ao FTP?",
    options: [
      "Transferência de arquivos simples sem autenticação",
      "Transferência com criptografia",
      "Gerenciamento de rede",
      "Resolução de nomes"
    ],
    answer: 0,
    explanation: "O TFTP (Trivial File Transfer Protocol) é uma versão simplificada do FTP. Ele não exige autenticação e usa UDP, sendo adequado para transferências rápidas e simples, como boot de dispositivos de rede."
  },
  {
    id: 201,
    topicId: "protocolos-essenciais",
    question: "Qual protocolo é responsável por atribuir dinamicamente endereços IP aos dispositivos em uma rede?",
    options: [
      "DNS",
      "DHCP",
      "HTTP",
      "FTP"
    ],
    answer: 1,
    explanation: "O DHCP (Dynamic Host Configuration Protocol) é responsável por atribuir endereços IP automaticamente aos dispositivos."
  },
  {
    id: 202,
    topicId: "modelos-osi-tcpip",
    question: "Qual camada do modelo OSI é responsável pelo roteamento de pacotes?",
    options: [
      "Camada de Enlace",
      "Camada de Transporte",
      "Camada de Rede",
      "Camada de Sessão"
    ],
    answer: 2,
    explanation: "A camada de rede é responsável pelo roteamento de pacotes entre redes diferentes."
  },
  {
    id: 203,
    topicId: "seguranca-de-rede",
    question: "Qual técnica é utilizada para garantir a confidencialidade dos dados transmitidos?",
    options: [
      "Compressão",
      "Criptografia",
      "Fragmentação",
      "Checksum"
    ],
    answer: 1,
    explanation: "A criptografia é usada para proteger os dados contra acesso não autorizado, garantindo a confidencialidade."
  },
  {
    id: 204,
    topicId: "enderecamento-ip",
    question: "Qual das alternativas representa um endereço IP válido na versão IPv4?",
    options: [
      "192.168.1.256",
      "192.168.1.1",
      "192.168.1",
      "192.168.1.1.1"
    ],
    answer: 1,
    explanation: "O endereço 192.168.1.1 é um endereço IPv4 válido. Os demais estão fora do padrão."
  },
  {
    id: 205,
    topicId: "conceitos-basicos",
    question: "Na topologia em estrela, os dispositivos são conectados a:",
    options: [
      "Um cabo central",
      "Um nó intermediário",
      "Um hub ou switch central",
      "Cada dispositivo diretamente ao outro"
    ],
    answer: 2,
    explanation: "Na topologia em estrela, todos os dispositivos são conectados a um hub ou switch central."
  }
];


export const weeklyProgress = [
  { week: 'Semana 1', points: 150 },
  { week: 'Semana 2', points: 220 },
  { week: 'Semana 3', points: 180 },
  { week: 'Semana 4', points: 350 },
];

    