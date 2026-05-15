// perguntas.js — Banco de Perguntas do Quiz Segurança de Redes
// 3 arrays com 15 perguntas cada

const quizFundamentos = [
    {
        pergunta: "Qual é a tríade da Segurança da Informação?",
        opcoes: ["Confidencialidade, Integridade e Disponibilidade", "Autenticação, Autorização e Auditoria", "Prevenção, Detecção e Resposta", "Firewall, Antivírus e Backup"],
        resposta: 0,
        explicacao: "A tríade CIA (Confidentiality, Integrity, Availability) é a base da Segurança da Informação: Confidencialidade garante acesso restrito, Integridade garante dados íntegros e Disponibilidade garante acesso quando necessário."
    },
    {
        pergunta: "Qual a principal função de um firewall em uma rede?",
        opcoes: ["Acelerar a conexão com a internet", "Filtrar e controlar o tráfego de rede com base em regras", "Armazenar backups dos servidores", "Distribuir endereços IP automaticamente"],
        resposta: 1,
        explicacao: "O firewall atua como barreira entre redes, filtrando pacotes e controlando o tráfego com base em regras de segurança predefinidas."
    },
    {
        pergunta: "O que é phishing?",
        opcoes: ["Um tipo de firewall avançado", "Uma técnica de engenharia social para obter dados por meio de mensagens falsas", "Um protocolo de criptografia de e-mails", "Um software antivírus gratuito"],
        resposta: 1,
        explicacao: "Phishing é uma técnica de engenharia social em que o atacante envia mensagens falsas (e-mail, SMS, sites) para enganar a vítima e obter credenciais ou dados sensíveis."
    },
    {
        pergunta: "Qual protocolo opera na porta 53 e resolve nomes de domínio em endereços IP?",
        opcoes: ["DHCP", "HTTP", "DNS", "FTP"],
        resposta: 2,
        explicacao: "O DNS (Domain Name System) opera na porta 53 e traduz nomes de domínio (ex: google.com) em endereços IP para que os dispositivos possam se comunicar na rede."
    },
    {
        pergunta: "Qual a diferença principal entre TCP e UDP?",
        opcoes: ["TCP é mais rápido que UDP", "TCP garante entrega ordenada e confiável; UDP é mais rápido, sem garantia de entrega", "UDP é usado apenas para e-mails", "Não há diferença prática entre eles"],
        resposta: 1,
        explicacao: "TCP (Transmission Control Protocol) é orientado a conexão e garante entrega confiável. UDP (User Datagram Protocol) não garante entrega, mas é mais rápido, ideal para streaming e jogos."
    },
    {
        pergunta: "O que é uma VPN?",
        opcoes: ["Um tipo de vírus que se propaga pela rede", "Uma rede privada virtual que cria um túnel criptografado na internet", "Um servidor de e-mail seguro", "Um protocolo de backup remoto"],
        resposta: 1,
        explicacao: "VPN (Virtual Private Network) cria um túnel criptografado sobre a internet pública, permitindo comunicação segura entre redes ou usuários remotos."
    },
    {
        pergunta: "Qual tipo de malware se disfarça de software legítimo para enganar o usuário?",
        opcoes: ["Worm", "Ransomware", "Trojan (Cavalo de Troia)", "Adware"],
        resposta: 2,
        explicacao: "O Trojan (Cavalo de Troia) se disfarça de programa útil ou legítimo, mas executa ações maliciosas em segundo plano após ser instalado pelo usuário."
    },
    {
        pergunta: "Qual é a função do protocolo DHCP em uma rede?",
        opcoes: ["Criptografar dados transmitidos", "Atribuir endereços IP automaticamente aos dispositivos", "Resolver nomes de domínio", "Monitorar o tráfego de rede"],
        resposta: 1,
        explicacao: "O DHCP (Dynamic Host Configuration Protocol) atribui automaticamente endereços IP e outras configurações de rede aos dispositivos, facilitando a administração."
    },
    {
        pergunta: "O que é NAT (Network Address Translation)?",
        opcoes: ["Um tipo de antivírus corporativo", "Uma técnica que traduz endereços IP privados para públicos na saída da rede", "Um protocolo de autenticação de usuários", "Uma ferramenta de backup em nuvem"],
        resposta: 1,
        explicacao: "NAT traduz endereços IP privados da rede interna para um endereço IP público ao acessar a internet, permitindo que vários dispositivos compartilhem um único IP público."
    },
    {
        pergunta: "Qual porta padrão é utilizada pelo protocolo HTTPS?",
        opcoes: ["80", "21", "443", "3389"],
        resposta: 2,
        explicacao: "O HTTPS (HTTP Secure) utiliza a porta 443 por padrão. Ele adiciona uma camada de criptografia TLS/SSL ao HTTP para proteger a comunicação web."
    },
    {
        pergunta: "O que significa autenticação multifator (MFA)?",
        opcoes: ["Usar apenas senha forte para login", "Combinar dois ou mais fatores de autenticação diferentes", "Criar múltiplas contas de usuário", "Usar um firewall com múltiplas regras"],
        resposta: 1,
        explicacao: "MFA combina dois ou mais fatores: algo que você sabe (senha), algo que você tem (token/celular) e algo que você é (biometria), aumentando significativamente a segurança."
    },
    {
        pergunta: "Qual tipo de criptografia utiliza a mesma chave para cifrar e decifrar?",
        opcoes: ["Criptografia assimétrica", "Criptografia simétrica", "Criptografia de hash", "Criptografia quântica"],
        resposta: 1,
        explicacao: "Na criptografia simétrica, a mesma chave é usada para cifrar e decifrar os dados. Exemplos: AES, DES. É rápida, mas exige troca segura da chave."
    },
    {
        pergunta: "O que é um ataque de força bruta?",
        opcoes: ["Danificar fisicamente um servidor", "Tentar todas as combinações possíveis de senha até encontrar a correta", "Enviar e-mails falsos para obter dados", "Desligar o firewall remotamente"],
        resposta: 1,
        explicacao: "Ataque de força bruta consiste em testar sistematicamente todas as combinações possíveis de senha até descobrir a correta. Senhas longas e complexas dificultam esse ataque."
    },
    {
        pergunta: "Qual das seguintes é uma boa prática de segurança para senhas?",
        opcoes: ["Usar a mesma senha em todos os sistemas", "Anotar senhas em papel na mesa de trabalho", "Criar senhas longas com letras, números e caracteres especiais", "Compartilhar senhas com colegas de confiança"],
        resposta: 2,
        explicacao: "Senhas fortes devem ter pelo menos 12 caracteres, combinando maiúsculas, minúsculas, números e caracteres especiais. Nunca reutilize senhas entre sistemas diferentes."
    },
    {
        pergunta: "O que é controle de acesso baseado em perfil (RBAC)?",
        opcoes: ["Permitir acesso total a todos os usuários", "Restringir permissões com base no cargo ou função do usuário", "Bloquear todo acesso externo à rede", "Criptografar todos os arquivos do servidor"],
        resposta: 1,
        explicacao: "RBAC (Role-Based Access Control) atribui permissões com base no perfil/função do usuário na organização, seguindo o princípio do menor privilégio."
    }
];

const quizRiscos = [
    {
        pergunta: "Uma empresa recebeu um e-mail oferecendo 'atualização urgente do sistema'. O link direciona para um site falso que coleta credenciais. Qual tipo de ataque está sendo utilizado?",
        opcoes: ["DDoS", "Phishing por e-mail", "SQL Injection", "Man-in-the-Middle"],
        resposta: 1,
        explicacao: "Trata-se de phishing: um ataque de engenharia social que usa e-mails falsos com links para sites fraudulentos, visando coletar credenciais das vítimas."
    },
    {
        pergunta: "Um laboratório de informática teve todos os arquivos criptografados e uma mensagem exige pagamento em criptomoeda para liberar o acesso. Qual malware foi utilizado?",
        opcoes: ["Spyware", "Worm", "Ransomware", "Adware"],
        resposta: 2,
        explicacao: "Ransomware criptografa os dados da vítima e exige pagamento (geralmente em criptomoeda) para fornecer a chave de descriptografia. Backups regulares são a melhor defesa."
    },
    {
        pergunta: "Em uma análise de riscos, qual é o cálculo básico para determinar o nível de risco?",
        opcoes: ["Risco = Ameaça + Vulnerabilidade", "Risco = Probabilidade × Impacto", "Risco = Custo ÷ Benefício", "Risco = Número de incidentes por ano"],
        resposta: 1,
        explicacao: "O nível de risco é calculado como Risco = Probabilidade × Impacto. A probabilidade indica a chance de ocorrência e o impacto indica a severidade das consequências."
    },
    {
        pergunta: "Uma escola descobriu que alunos usam a mesma senha '123456' para acessar o sistema acadêmico. Qual controle deve ser implementado prioritariamente?",
        opcoes: ["Instalar mais câmeras de segurança", "Implementar política de senhas fortes e autenticação multifator", "Trocar todos os computadores", "Bloquear o acesso à internet"],
        resposta: 1,
        explicacao: "Senhas fracas são uma das maiores vulnerabilidades. A implementação de política de senhas fortes (complexidade mínima) e MFA reduz drasticamente o risco de acesso não autorizado."
    },
    {
        pergunta: "Qual estratégia de tratamento de risco consiste em contratar um seguro contra incidentes cibernéticos?",
        opcoes: ["Evitar o risco", "Reduzir o risco", "Transferir o risco", "Aceitar o risco"],
        resposta: 2,
        explicacao: "Transferir o risco significa passar a responsabilidade financeira para terceiros, como seguradoras. A organização ainda precisa manter controles, mas o impacto financeiro é compartilhado."
    },
    {
        pergunta: "Um administrador de rede precisa separar o tráfego do setor financeiro do restante da empresa. Qual tecnologia deve utilizar?",
        opcoes: ["NAT", "VLAN", "DNS", "DHCP"],
        resposta: 1,
        explicacao: "VLANs (Virtual LANs) permitem segmentar logicamente a rede, isolando o tráfego de diferentes setores mesmo usando a mesma infraestrutura física, aumentando a segurança."
    },
    {
        pergunta: "O que é hardening de servidores?",
        opcoes: ["Aumentar a capacidade de hardware do servidor", "Aplicar configurações de segurança para reduzir a superfície de ataque", "Instalar mais memória RAM", "Fazer backup diário automático"],
        resposta: 1,
        explicacao: "Hardening é o processo de reduzir a superfície de ataque: desabilitar serviços desnecessários, aplicar patches, configurar permissões restritivas e remover contas padrão."
    },
    {
        pergunta: "Qual protocolo é utilizado para coletar logs de dispositivos de rede de forma centralizada?",
        opcoes: ["SNMP", "Syslog", "FTP", "SMTP"],
        resposta: 1,
        explicacao: "O Syslog é o protocolo padrão para envio centralizado de logs de dispositivos de rede (roteadores, switches, firewalls) para um servidor de logs, facilitando auditoria e monitoramento."
    },
    {
        pergunta: "Na LGPD, qual é a base legal que permite o tratamento de dados pessoais de alunos para fins pedagógicos em uma instituição de ensino?",
        opcoes: ["Consentimento exclusivamente", "Execução de políticas públicas ou cumprimento de obrigação legal", "Interesse legítimo do professor", "Não existe base legal para isso"],
        resposta: 1,
        explicacao: "Instituições de ensino podem tratar dados de alunos com base na execução de políticas públicas de educação ou cumprimento de obrigação legal/regulatória, conforme Art. 7º da LGPD."
    },
    {
        pergunta: "Um funcionário encontrou um pendrive no estacionamento da empresa e conectou no computador corporativo. Qual risco principal ele introduziu?",
        opcoes: ["Risco de superaquecimento do computador", "Execução de malware ou código malicioso presente no dispositivo", "Aumento no consumo de energia", "Lentidão na rede Wi-Fi"],
        resposta: 1,
        explicacao: "Dispositivos USB desconhecidos podem conter malware que se executa automaticamente. Esta técnica de engenharia social é chamada de 'USB baiting' e pode comprometer toda a rede."
    },
    {
        pergunta: "Qual é a principal vantagem de realizar backups seguindo a regra 3-2-1?",
        opcoes: ["Economizar espaço em disco", "Ter 3 cópias em 2 mídias diferentes, sendo 1 offsite, garantindo recuperação", "Fazer backup apenas uma vez por mês", "Usar apenas armazenamento em nuvem"],
        resposta: 1,
        explicacao: "A regra 3-2-1 recomenda: 3 cópias dos dados, em 2 tipos de mídia diferentes, com 1 cópia armazenada fora do local (offsite), garantindo recuperação mesmo em desastres."
    },
    {
        pergunta: "O que significa GRC no contexto de segurança da informação?",
        opcoes: ["Grupo de Resposta Cibernética", "Governança, Risco e Compliance", "Gerenciamento de Redes e Configurações", "Gateway de Roteamento Central"],
        resposta: 1,
        explicacao: "GRC (Governança, Risco e Compliance) é uma abordagem integrada que alinha gestão de TI, gerenciamento de riscos e conformidade com normas e regulamentações."
    },
    {
        pergunta: "Durante o monitoramento da rede, o SNMP detectou uso de CPU acima de 95% em um servidor por 2 horas. Qual deve ser a primeira ação do administrador?",
        opcoes: ["Desligar o servidor imediatamente", "Investigar os processos em execução e verificar se há atividade anormal", "Ignorar, pois é comportamento normal", "Reinstalar o sistema operacional"],
        resposta: 1,
        explicacao: "Antes de qualquer ação drástica, o administrador deve investigar a causa do consumo elevado: pode ser um processo legítimo, um ataque ou um malware em execução."
    },
    {
        pergunta: "Qual é a primeira ação recomendada ao identificar um possível incidente de segurança em uma estação de trabalho?",
        opcoes: ["Formatar o computador imediatamente", "Isolar o equipamento da rede e documentar o incidente", "Desligar todos os servidores da empresa", "Enviar e-mail para todos os funcionários"],
        resposta: 1,
        explicacao: "A contenção é a primeira etapa: isolar o equipamento da rede para evitar propagação, preservar evidências e documentar o ocorrido para análise posterior."
    },
    {
        pergunta: "Uma empresa decide não implementar controles contra um risco de probabilidade muito baixa e impacto mínimo. Qual estratégia de tratamento de risco está sendo aplicada?",
        opcoes: ["Evitar o risco", "Reduzir o risco", "Transferir o risco", "Aceitar o risco"],
        resposta: 3,
        explicacao: "Aceitar o risco é apropriado quando o custo dos controles supera o impacto potencial. A decisão deve ser documentada e revisada periodicamente."
    }
];

const quizCyberAvancado = [
    {
        pergunta: "A norma ISO 27001 exige a implementação de um SGSI. O que significa SGSI?",
        opcoes: ["Sistema Geral de Serviços de Internet", "Sistema de Gestão de Segurança da Informação", "Serviço de Gerenciamento de Sistemas Integrados", "Software de Garantia de Segurança Industrial"],
        resposta: 1,
        explicacao: "SGSI (Sistema de Gestão de Segurança da Informação) é o conjunto de políticas, processos e controles para gerenciar riscos de segurança da informação, conforme a ISO 27001."
    },
    {
        pergunta: "Um SIEM detectou múltiplas tentativas de login falhadas seguidas de um acesso bem-sucedido às 3h da manhã com uma conta de administrador. Qual deve ser a resposta imediata?",
        opcoes: ["Aguardar o relatório mensal de segurança", "Isolar a conta, verificar a origem do acesso e ativar o plano de resposta a incidentes", "Reiniciar o servidor SIEM", "Enviar e-mail ao usuário perguntando se foi ele"],
        resposta: 1,
        explicacao: "O padrão indica possível ataque de força bruta bem-sucedido. A resposta imediata deve incluir bloqueio da conta, investigação da origem e ativação do plano de resposta a incidentes."
    },
    {
        pergunta: "Qual é a função principal de um IDS (Intrusion Detection System)?",
        opcoes: ["Bloquear automaticamente todo tráfego suspeito", "Detectar e alertar sobre atividades suspeitas na rede", "Criptografar todo o tráfego de rede", "Gerenciar as senhas dos usuários"],
        resposta: 1,
        explicacao: "O IDS monitora o tráfego e detecta atividades suspeitas, gerando alertas. Diferente do IPS, o IDS não bloqueia automaticamente — ele apenas detecta e notifica."
    },
    {
        pergunta: "Em um SOC (Security Operations Center), qual é a diferença principal entre um analista de Nível 1 (L1) e Nível 3 (L3)?",
        opcoes: ["L1 configura firewalls e L3 faz backups", "L1 faz triagem de alertas e L3 realiza análise avançada e resposta a incidentes complexos", "L1 gerencia servidores e L3 instala antivírus", "Não há diferença, ambos fazem as mesmas tarefas"],
        resposta: 1,
        explicacao: "No SOC, L1 faz triagem e classificação inicial de alertas. L2 investiga incidentes confirmados. L3 realiza análise forense avançada, threat hunting e resposta a incidentes complexos."
    },
    {
        pergunta: "O que é pentest ético e por que deve ser autorizado formalmente?",
        opcoes: ["É um ataque real para causar danos controlados à empresa", "É um teste autorizado que simula ataques para identificar vulnerabilidades antes que atacantes reais as explorem", "É a instalação de antivírus em todos os computadores", "É o monitoramento passivo da rede sem qualquer teste"],
        resposta: 1,
        explicacao: "Pentest ético é um teste de segurança autorizado que simula ataques reais para identificar vulnerabilidades. Deve ser formalmente autorizado com escopo definido para ser legal e ético."
    },
    {
        pergunta: "Durante uma análise forense, qual é o primeiro princípio que deve ser respeitado ao coletar evidências digitais?",
        opcoes: ["Formatar o disco para eliminar malware", "Preservar a integridade das evidências e manter a cadeia de custódia", "Reinstalar o sistema operacional", "Compartilhar as evidências por e-mail com a equipe"],
        resposta: 1,
        explicacao: "A preservação da integridade é fundamental: criar imagem forense bit-a-bit, calcular hashes, documentar cada etapa e manter a cadeia de custódia para validade legal."
    },
    {
        pergunta: "O que é movimentação lateral em um ataque cibernético?",
        opcoes: ["Mover fisicamente os servidores para outro local", "Técnica em que o atacante se move entre sistemas internos após comprometer um ponto de entrada", "Transferir dados entre filiais da empresa", "Atualizar lateralmente os patches de segurança"],
        resposta: 1,
        explicacao: "Movimentação lateral é quando o atacante, após comprometer um sistema, utiliza credenciais ou vulnerabilidades para acessar outros sistemas na mesma rede, escalando o ataque."
    },
    {
        pergunta: "O que é o princípio do menor privilégio e como ele se aplica à segurança de redes?",
        opcoes: ["Dar acesso total para facilitar o trabalho dos funcionários", "Conceder apenas as permissões mínimas necessárias para cada usuário executar suas funções", "Usar o menor número possível de senhas", "Instalar o menor número de softwares possível"],
        resposta: 1,
        explicacao: "O princípio do menor privilégio determina que cada usuário, processo ou sistema deve ter apenas as permissões estritamente necessárias, reduzindo o impacto de comprometimento."
    },
    {
        pergunta: "Uma empresa sofreu um ataque de ransomware que afetou o servidor principal. O plano de continuidade de negócios (PCN) prevê RTO de 4 horas. O que significa RTO?",
        opcoes: ["Relatório Técnico Operacional", "Recovery Time Objective — tempo máximo aceitável para restaurar o serviço", "Registro Total de Ocorrências", "Resposta Técnica Obrigatória"],
        resposta: 1,
        explicacao: "RTO (Recovery Time Objective) é o tempo máximo aceitável para restaurar um sistema após uma interrupção. Neste caso, o serviço deve ser restaurado em até 4 horas."
    },
    {
        pergunta: "Qual abordagem de segurança implementa múltiplas camadas de proteção para que, se uma falhar, as demais continuem protegendo?",
        opcoes: ["Segurança por obscuridade", "Defesa em profundidade", "Single Sign-On", "Zero Trust isolado"],
        resposta: 1,
        explicacao: "Defesa em profundidade usa múltiplas camadas de controles (firewall, IDS/IPS, antivírus, segmentação, autenticação) para que a falha de uma camada não comprometa toda a segurança."
    },
    {
        pergunta: "A LGPD define o 'Encarregado de Dados' (DPO). Qual é a principal responsabilidade desse profissional?",
        opcoes: ["Desenvolver softwares para a empresa", "Atuar como canal de comunicação entre o controlador, os titulares e a ANPD", "Gerenciar os backups diários", "Configurar os firewalls da rede"],
        resposta: 1,
        explicacao: "O Encarregado (DPO) é o ponto de contato entre a organização (controlador), os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD), orientando sobre conformidade."
    },
    {
        pergunta: "Um analista do SOC identificou que um atacante está exfiltrando dados usando consultas DNS codificadas. Qual técnica está sendo utilizada?",
        opcoes: ["DNS Spoofing", "DNS Tunneling", "DNS Amplification", "DNS Cache Poisoning"],
        resposta: 1,
        explicacao: "DNS Tunneling usa o protocolo DNS para encapsular dados dentro de consultas e respostas DNS, permitindo exfiltração de dados que pode passar despercebida por firewalls convencionais."
    },
    {
        pergunta: "Em uma auditoria de segurança, o auditor identificou que contas de ex-funcionários ainda estão ativas no Active Directory. Qual controle falhou?",
        opcoes: ["Controle de backup", "Gestão de identidades e ciclo de vida de contas", "Firewall de borda", "Política de senhas"],
        resposta: 1,
        explicacao: "A gestão de identidades deve incluir processos de offboarding que desativam contas imediatamente quando um funcionário deixa a organização, evitando acessos não autorizados."
    },
    {
        pergunta: "O que é uma análise de impacto nos negócios (BIA) no contexto de continuidade?",
        opcoes: ["Relatório financeiro trimestral da empresa", "Processo que identifica funções críticas e avalia o impacto de sua interrupção", "Teste de velocidade da rede interna", "Inventário de equipamentos de TI"],
        resposta: 1,
        explicacao: "BIA (Business Impact Analysis) identifica processos críticos, avalia o impacto de sua interrupção e define prioridades de recuperação, sendo base para o plano de continuidade de negócios."
    },
    {
        pergunta: "Um atacante comprometeu uma conta de usuário comum e conseguiu obter privilégios de administrador explorando uma falha no sistema. Qual tipo de ataque ocorreu?",
        opcoes: ["Phishing", "Escalação de privilégios", "Denial of Service", "Spoofing de IP"],
        resposta: 1,
        explicacao: "Escalação de privilégios ocorre quando um atacante explora vulnerabilidades para obter permissões superiores às iniciais, passando de usuário comum para administrador do sistema."
    }
];

export { quizFundamentos, quizRiscos, quizCyberAvancado };
