// perguntas.js — Banco de Perguntas do Quiz Segurança de Redes
// 30 perguntas por categoria (Mínimo solicitado)
// Estrutura atualizada com correctAnswer (valor) e explicação pedagógica detalhada

const quizFundamentos = [
    {
        question: "Qual é a tríade da Segurança da Informação?",
        options: [
            "Autenticação, Autorização e Auditoria",
            "Prevenção, Detecção e Resposta",
            "Confidencialidade, Integridade e Disponibilidade",
            "Firewall, Antivírus e Backup"
        ],
        correctAnswer: "Confidencialidade, Integridade e Disponibilidade",
        explanation: {
            correct: "A tríade CIA (Confidentiality, Integrity, Availability) é a base da Segurança da Informação.",
            details: [
                "Confidencialidade garante que a informação seja acessada apenas por quem tem direito.",
                "Integridade garante que a informação não seja alterada sem autorização.",
                "Disponibilidade garante que o sistema esteja acessível quando necessário."
            ],
            tip: "Estes três princípios devem guiar qualquer política de segurança."
        }
    },
    {
        question: "Qual a principal função de um firewall em uma rede?",
        options: [
            "Acelerar a conexão com a internet",
            "Filtrar e controlar o tráfego de rede com base em regras",
            "Armazenar backups dos servidores",
            "Distribuir endereços IP automaticamente"
        ],
        correctAnswer: "Filtrar e controlar o tráfego de rede com base em regras",
        explanation: {
            correct: "O firewall atua como uma barreira de proteção para a rede.",
            details: [
                "Ele analisa os pacotes de dados que entram e saem.",
                "Bloqueia tráfego não autorizado com base em regras predefinidas.",
                "Pode ser baseado em hardware ou software."
            ],
            tip: "Um firewall bem configurado é a primeira linha de defesa perimetral."
        }
    },
    {
        question: "O que é phishing?",
        options: [
            "Um tipo de firewall avançado",
            "Um protocolo de criptografia de e-mails",
            "Um software antivírus gratuito",
            "Uma técnica de engenharia social para obter dados por meio de mensagens falsas"
        ],
        correctAnswer: "Uma técnica de engenharia social para obter dados por meio de mensagens falsas",
        explanation: {
            correct: "Phishing é uma tentativa de enganar os usuários para que revelem informações confidenciais.",
            details: [
                "Geralmente envolve e-mails, SMS ou sites falsos que imitam marcas reais.",
                "O objetivo é roubar senhas, dados de cartão ou instalar malware.",
                "Explora a falha humana (engenharia social)."
            ],
            tip: "Sempre desconfie de links urgentes e verifique o remetente real do e-mail."
        }
    },
    {
        question: "Qual protocolo opera na porta 53 e resolve nomes de domínio em endereços IP?",
        options: [
            "DHCP",
            "DNS",
            "HTTP",
            "FTP"
        ],
        correctAnswer: "DNS",
        explanation: {
            correct: "O DNS (Domain Name System) traduz nomes (como google.com) em IPs numéricos.",
            details: [
                "Funciona como a lista telefônica da internet.",
                "Opera na porta 53 (UDP geralmente, TCP para transferências de zona).",
                "Sem ele, teríamos que decorar os IPs de todos os sites."
            ],
            tip: "Ataques de envenenamento de cache DNS podem redirecionar usuários para sites falsos."
        }
    },
    {
        question: "Qual a diferença principal entre TCP e UDP?",
        options: [
            "TCP é mais rápido que UDP",
            "UDP é usado apenas para e-mails",
            "TCP garante entrega ordenada e confiável; UDP é mais rápido, sem garantia de entrega",
            "Não há diferença prática entre eles"
        ],
        correctAnswer: "TCP garante entrega ordenada e confiável; UDP é mais rápido, sem garantia de entrega",
        explanation: {
            correct: "TCP é orientado à conexão, enquanto UDP não é.",
            details: [
                "TCP faz controle de fluxo e retransmissão de pacotes perdidos.",
                "UDP envia os dados sem verificar se chegaram, priorizando a velocidade.",
                "Streaming e jogos usam UDP; navegação web e e-mail usam TCP."
            ],
            tip: "Escolha o protocolo baseado na necessidade de velocidade vs. confiabilidade."
        }
    },
    {
        question: "O que é uma VPN?",
        options: [
            "Um tipo de vírus que se propaga pela rede",
            "Uma rede privada virtual que cria um túnel criptografado na internet",
            "Um servidor de e-mail seguro",
            "Um protocolo de backup remoto"
        ],
        correctAnswer: "Uma rede privada virtual que cria um túnel criptografado na internet",
        explanation: {
            correct: "VPN (Virtual Private Network) protege seus dados ao navegar em redes públicas.",
            details: [
                "Cria um túnel seguro entre seu dispositivo e o servidor VPN.",
                "Criptografa todo o tráfego que passa por esse túnel.",
                "Mascará seu endereço IP real."
            ],
            tip: "Use VPN ao se conectar a Wi-Fi públicos de hotéis ou cafeterias."
        }
    },
    {
        question: "Qual tipo de malware se disfarça de software legítimo para enganar o usuário?",
        options: [
            "Worm",
            "Ransomware",
            "Trojan (Cavalo de Troia)",
            "Adware"
        ],
        correctAnswer: "Trojan (Cavalo de Troia)",
        explanation: {
            correct: "O Trojan parece inofensivo, mas carrega uma carga maliciosa.",
            details: [
                "Diferente dos vírus e worms, ele geralmente não se auto-replica.",
                "Precisa que o usuário o execute para infectar o sistema.",
                "Pode abrir portas dos fundos (backdoors) para invasores."
            ],
            tip: "Nunca baixe softwares de fontes não confiáveis ou piratas."
        }
    },
    {
        question: "Qual é a função do protocolo DHCP em uma rede?",
        options: [
            "Criptografar dados transmitidos",
            "Atribuir endereços IP automaticamente aos dispositivos",
            "Resolver nomes de domínio",
            "Monitorar o tráfego de rede"
        ],
        correctAnswer: "Atribuir endereços IP automaticamente aos dispositivos",
        explanation: {
            correct: "O DHCP automatiza a configuração de rede dos dispositivos.",
            details: [
                "Distribui IP, máscara de sub-rede, gateway e DNS.",
                "Evita conflitos de IP na rede (dois dispositivos com o mesmo IP).",
                "Facilita a administração de redes grandes."
            ],
            tip: "Em servidores, prefira IPs estáticos em vez de DHCP dinâmico."
        }
    },
    {
        question: "O que é NAT (Network Address Translation)?",
        options: [
            "Um tipo de antivírus corporativo",
            "Um protocolo de autenticação de usuários",
            "Uma técnica que traduz endereços IP privados para públicos na saída da rede",
            "Uma ferramenta de backup em nuvem"
        ],
        correctAnswer: "Uma técnica que traduz endereços IP privados para públicos na saída da rede",
        explanation: {
            correct: "O NAT economiza endereços IPv4 públicos.",
            details: [
                "Permite que toda uma rede interna use apenas um IP público para sair para a internet.",
                "Oculta os IPs reais dos dispositivos internos da rede externa.",
                "É comumente executado em roteadores de borda."
            ],
            tip: "O NAT adiciona uma camada básica de segurança por não expor IPs internos diretamente."
        }
    },
    {
        question: "Qual porta padrão é utilizada pelo protocolo HTTPS?",
        options: [
            "80",
            "21",
            "443",
            "3389"
        ],
        correctAnswer: "443",
        explanation: {
            correct: "O HTTPS usa a porta 443 para conexões seguras.",
            details: [
                "A porta 80 é usada pelo HTTP padrão (não seguro).",
                "A porta 21 é usada pelo FTP.",
                "A porta 3389 é usada pelo RDP (Acesso Remoto Windows)."
            ],
            tip: "Certifique-se de que seus servidores web redirecionem a porta 80 para a 443."
        }
    },
    {
        question: "O que significa autenticação multifator (MFA)?",
        options: [
            "Usar apenas senha forte para login",
            "Combinar dois ou mais fatores de autenticação diferentes",
            "Criar múltiplas contas de usuário",
            "Usar um firewall com múltiplas regras"
        ],
        correctAnswer: "Combinar dois ou mais fatores de autenticação diferentes",
        explanation: {
            correct: "MFA aumenta a segurança exigindo mais do que apenas a senha.",
            details: [
                "Fatores comuns: Algo que você sabe (senha), Algo que você tem (celular/token), Algo que você é (biometria).",
                "Se a senha vazar, o invasor ainda precisará do segundo fator.",
                "É uma das defesas mais eficazes contra roubo de credenciais."
            ],
            tip: "Ative MFA em todas as suas contas importantes, especialmente e-mails."
        }
    },
    {
        question: "Qual tipo de criptografia utiliza a mesma chave para cifrar e decifrar?",
        options: [
            "Criptografia assimétrica",
            "Criptografia de hash",
            "Criptografia quântica",
            "Criptografia simétrica"
        ],
        correctAnswer: "Criptografia simétrica",
        explanation: {
            correct: "Na criptografia simétrica, emissor e receptor compartilham a mesma chave secreta.",
            details: [
                "É muito rápida e eficiente para grandes volumes de dados.",
                "O grande desafio é como compartilhar a chave com segurança.",
                "Exemplos: AES, DES, 3DES."
            ],
            tip: "O AES é o padrão atual para proteção de dados armazenados devido à sua velocidade e segurança."
        }
    },
    {
        question: "O que é um ataque de força bruta?",
        options: [
            "Danificar fisicamente um servidor",
            "Enviar e-mails falsos para obter dados",
            "Desligar o firewall remotamente",
            "Tentar todas as combinações possíveis de senha até encontrar a correta"
        ],
        correctAnswer: "Tentar todas as combinações possíveis de senha até encontrar a correta",
        explanation: {
            correct: "Ataques de força bruta tentam adivinhar a senha por exaustão.",
            details: [
                "Usam softwares automatizados para testar milhares de senhas por segundo.",
                "Senhas curtas e comuns são quebradas em segundos.",
                "Dicionários de senhas comuns são frequentemente usados para acelerar o processo."
            ],
            tip: "Use senhas longas (mais de 12 caracteres) e ative bloqueio de conta após poucas tentativas falhas."
        }
    },
    {
        question: "Qual das seguintes é uma boa prática de segurança para senhas?",
        options: [
            "Usar a mesma senha em todos os sistemas",
            "Anotar senhas em papel na mesa de trabalho",
            "Compartilhar senhas com colegas de confiança",
            "Criar senhas longas com letras, números e caracteres especiais"
        ],
        correctAnswer: "Criar senhas longas com letras, números e caracteres especiais",
        explanation: {
            correct: "A complexidade e o tamanho da senha aumentam sua resistência a ataques.",
            details: [
                "Evite palavras do dicionário ou dados pessoais (como datas de aniversário).",
                "Use gerenciadores de senhas para não precisar lembrar de todas.",
                "Nunca reutilize a mesma senha em sites diferentes."
            ],
            tip: "Uma frase secreta longa (passphrase) costuma ser mais segura e fácil de lembrar do que uma senha aleatória curta."
        }
    },
    {
        question: "O que é controle de acesso baseado em perfil (RBAC)?",
        options: [
            "Permitir acesso total a todos os usuários",
            "Bloquear todo acesso externo à rede",
            "Criptografar todos os arquivos do servidor",
            "Restringir permissões com base no cargo ou função do usuário"
        ],
        correctAnswer: "Restringir permissões com base no cargo ou função do usuário",
        explanation: {
            correct: "RBAC simplifica a gestão de permissões em organizações.",
            details: [
                "Em vez de dar permissão usuário por usuário, dá-se permissão ao 'papel' (ex: Gerente, Analista).",
                "Os usuários herdam as permissões de seus respectivos papéis.",
                "Facilita a auditoria e a conformidade."
            ],
            tip: "Combine RBAC com o princípio do menor privilégio."
        }
    },
    // Adicionando mais 15 perguntas para Fundamentos (Total 30)
    {
        question: "Qual protocolo é usado para transferir arquivos de forma não segura?",
        options: ["SFTP", "SSH", "HTTPS", "FTP"],
        correctAnswer: "FTP",
        explanation: {
            correct: "O FTP transfere dados em texto claro, incluindo senhas.",
            details: [
                "Não possui criptografia nativa.",
                "Qualquer pessoa interceptando o tráfego pode ver os dados.",
                "SFTP é a alternativa segura que usa SSH."
            ],
            tip: "Sempre prefira SFTP ou FTPS para transferência de arquivos corporativos."
        }
    },
    {
        question: "Qual camada do modelo OSI é responsável pelo endereçamento IP?",
        options: ["Camada Física", "Camada de Enlace", "Camada de Transporte", "Camada de Rede"],
        correctAnswer: "Camada de Rede",
        explanation: {
            correct: "A Camada de Rede (Camada 3) lida com o roteamento e endereçamento lógico.",
            details: [
                "O protocolo IP opera nesta camada.",
                "Roteadores são dispositivos típicos da camada de rede.",
                "A camada de enlace lida com endereços MAC."
            ],
            tip: "Lembre-se: Camada 2 = MAC, Camada 3 = IP."
        }
    },
    {
        question: "O que identifica unicamente uma placa de rede no mundo?",
        options: ["Endereço IP", "Porta TCP", "Nome do Host", "Endereço MAC"],
        correctAnswer: "Endereço MAC",
        explanation: {
            correct: "O endereço MAC é o endereço físico gravado na placa de rede pelo fabricante.",
            details: [
                "Possui 48 bits (geralmente representado em hexadecimal).",
                "É usado para comunicação na rede local (Camada 2).",
                "Diferente do IP, ele não muda dependendo da rede onde você está."
            ],
            tip: "Embora seja fixo no hardware, muitos sistemas permitem 'mascarar' ou alterar o MAC via software."
        }
    },
    {
        question: "Qual algoritmo é um exemplo clássico de criptografia assimétrica?",
        options: ["AES", "DES", "Blowfish", "RSA"],
        correctAnswer: "RSA",
        explanation: {
            correct: "O RSA utiliza um par de chaves (pública e privada).",
            details: [
                "A chave pública cifra os dados; a chave privada decifra.",
                "É muito usado para troca segura de chaves e assinaturas digitais.",
                "AES e DES são algoritmos simétricos."
            ],
            tip: "A criptografia assimétrica resolve o problema da distribuição de chaves da criptografia simétrica."
        }
    },
    {
        question: "Qual padrão Wi-Fi é atualmente o mais seguro para redes domésticas e corporativas?",
        options: ["WEP", "WPA", "WPA2", "WPA3"],
        correctAnswer: "WPA3",
        explanation: {
            correct: "WPA3 é a terceira geração do protocolo de segurança Wi-Fi.",
            details: [
                "Lançado para corrigir vulnerabilidades do WPA2 (como o ataque KRACK).",
                "Oferece melhor proteção contra ataques de força bruta offline.",
                "WEP é considerado totalmente obsoleto e inseguro."
            ],
            tip: "Sempre que seus dispositivos suportarem, configure seu roteador para usar WPA3."
        }
    },
    {
        question: "O que é engenharia social?",
        options: ["Programação de redes sociais", "Desenvolvimento de softwares colaborativos", "Um tipo de criptografia de dados", "Manipulação psicológica de pessoas para que executem ações ou divulguem informações confidenciais"],
        correctAnswer: "Manipulação psicológica de pessoas para que executem ações ou divulguem informações confidenciais",
        explanation: {
            correct: "Engenharia social foca no 'elo mais fraco' da segurança: as pessoas.",
            details: [
                "Não ataca vulnerabilidades de software, mas a confiança humana.",
                "Exemplos incluem phishing, pretexting e baiting.",
                "Treinamento de conscientização é a melhor defesa."
            ],
            tip: "Lembre-se: nenhum antivírus pode bloquear um usuário que voluntariamente entrega sua senha."
        }
    },
    {
        question: "Uma função de hash criptográfica deve ser:",
        options: ["Reversível", "Lenta para descriptografar", "Fácil de gerar colisões", "Unidirecional"],
        correctAnswer: "Unidirecional",
        explanation: {
            correct: "Um hash não deve poder ser revertido para o texto original.",
            details: [
                "Um hash gera uma 'impressão digital' de tamanho fixo para qualquer dado.",
                "Mesmo mudando um único bit no arquivo, o hash gerado é completamente diferente.",
                "Usado para verificar integridade e armazenar senhas."
            ],
            tip: "Nunca armazene senhas em texto claro. Armazene o hash delas com 'salt'."
        }
    },
    {
        question: "Qual protocolo é usado para acesso remoto seguro via linha de comando?",
        options: ["Telnet", "RDP", "FTP", "SSH"],
        correctAnswer: "SSH",
        explanation: {
            correct: "O SSH (Secure Shell) criptografa toda a comunicação do terminal.",
            details: [
                "Substituiu o Telnet, que enviava tudo em texto claro.",
                "Usa a porta padrão 22.",
                "Permite autenticação por senha ou por par de chaves."
            ],
            tip: "Desabilite o login direto do usuário root via SSH para aumentar a segurança."
        }
    },
    {
        question: "O que significa o princípio do menor privilégio?",
        options: ["Dar acesso de administrador a todos para evitar chamados de suporte", "Restringir o uso de internet na empresa", "Bloquear o uso de celulares no trabalho", "Conceder aos usuários apenas as permissões necessárias para realizar seu trabalho"],
        correctAnswer: "Conceder aos usuários apenas as permissões necessárias para realizar seu trabalho",
        explanation: {
            correct: "Limita o dano potencial caso uma conta seja comprometida.",
            details: [
                "Se um usuário comum for infectado por ransomware, o malware só poderá afetar o que o usuário tem acesso.",
                "Reduz a superfície de ataque interna.",
                "Evita que usuários façam alterações acidentais perigosas."
            ],
            tip: "Não use contas de administrador para tarefas do dia a dia como ler e-mails."
        }
    },
    {
        question: "Qual tipo de malware se auto-replica pela rede sem precisar de interação humana?",
        options: ["Virus", "Trojan", "Spyware", "Worm"],
        correctAnswer: "Worm",
        explanation: {
            correct: "Worms exploram vulnerabilidades de rede para se espalhar automaticamente.",
            details: [
                "Diferente dos vírus, não precisam se anexar a um programa hospedeiro.",
                "Podem causar lentidão extrema na rede devido ao tráfego de replicação.",
                "Exemplos famosos: Slammer, Blaster."
            ],
            tip: "Manter sistemas operacionais atualizados é a melhor forma de evitar infecções por worms."
        }
    },
    {
        question: "O ataque 'Shoulder Surfing' consiste em:",
        options: ["Quebrar senhas usando força bruta", "Interceptar pacotes Wi-Fi no ar", "Enviar e-mails falsos", "Observar fisicamente alguém digitando informações confidenciais (como senhas ou PINs)"],
        correctAnswer: "Observar fisicamente alguém digitando informações confidenciais (como senhas ou PINs)",
        explanation: {
            correct: "É um ataque físico simples de engenharia social.",
            details: [
                "O atacante olha 'por cima do ombro' da vítima.",
                "Muito comum em caixas eletrônicos, transporte público ou escritórios.",
                "Não exige nenhum conhecimento técnico."
            ],
            tip: "Use películas de privacidade em notebooks e cubra o teclado ao digitar senhas em público."
        }
    },
    {
        question: "Qual protocolo é usado para monitoramento e gerenciamento de dispositivos de rede?",
        options: ["HTTP", "SMTP", "POP3", "SNMP"],
        correctAnswer: "SNMP",
        explanation: {
            correct: "O SNMP (Simple Network Management Protocol) coleta dados de roteadores, switches, etc.",
            details: [
                "Permite monitorar uso de CPU, tráfego de rede, temperatura de equipamentos.",
                "A versão 3 (SNMPv3) adiciona criptografia e autenticação forte.",
                "Versões 1 e 2 são consideradas inseguras para redes modernas."
            ],
            tip: "Se usar SNMP, sempre configure strings de comunidade difíceis de adivinhar e prefira a v3."
        }
    },
    {
        question: "O que é um 'Zero-Day Attack' (Ataque de Dia Zero)?",
        options: ["Um ataque que acontece exatamente à meia-noite", "Um ataque que dura menos de um dia", "Um ataque simulado pela equipe de segurança da empresa", "Um ataque que explora uma vulnerabilidade desconhecida pelo fabricante do software"],
        correctAnswer: "Um ataque que explora uma vulnerabilidade desconhecida pelo fabricante do software",
        explanation: {
            correct: "Ataques zero-day são perigosos porque não há correção (patch) disponível ainda.",
            details: [
                "O termo vem do fato de que o desenvolvedor tem 'zero dias' para corrigir o problema depois que ele se torna conhecido.",
                "São altamente valiosos no mercado negro de exploits.",
                "Defesas baseadas em assinaturas (como antivírus tradicionais) geralmente falham contra eles."
            ],
            tip: "Defesa em profundidade e análise comportamental ajudam a mitigar riscos de ataques zero-day."
        }
    },
    {
        question: "Qual porta é comumente usada pelo protocolo SSH?",
        options: ["21", "23", "80", "22"],
        correctAnswer: "22",
        explanation: {
            correct: "O SSH usa a porta 22 por padrão para conexões seguras.",
            details: [
                "A porta 21 é usada pelo FTP.",
                "A porta 23 é usada pelo Telnet (não seguro).",
                "A porta 80 é usada pelo HTTP."
            ],
            tip: "Alterar a porta padrão do SSH (ex: para 2222) reduz ataques automatizados de bots que varrem a internet."
        }
    },
    {
        question: "Qual a principal desvantagem do protocolo Telnet em relação ao SSH?",
        options: ["É mais lento que o SSH", "Não permite transferência de arquivos", "Exige hardware dedicado", "Envia todos os dados, incluindo senhas, em texto claro (sem criptografia)"],
        correctAnswer: "Envia todos os dados, incluindo senhas, em texto claro (sem criptografia)",
        explanation: {
            correct: "O Telnet é considerado totalmente inseguro hoje em dia.",
            details: [
                "Qualquer atacante que consiga capturar o tráfego da rede pode ver as credenciais digitadas.",
                "Foi amplamente substituído pelo SSH.",
                "Ainda é encontrado em equipamentos de rede muito antigos ou mal configurados."
            ],
            tip: "Bloqueie a porta 23 (Telnet) no seu firewall e desabilite o serviço nos servidores."
        }
    }
];

const quizRiscos = [
    // 30 perguntas para Riscos
    {
        question: "Uma empresa recebeu um e-mail oferecendo 'atualização urgente do sistema'. O link direciona para um site falso que coleta credenciais. Qual tipo de ataque está sendo utilizado?",
        options: [
            "DDoS",
            "SQL Injection",
            "Man-in-the-Middle",
            "Phishing por e-mail"
        ],
        correctAnswer: "Phishing por e-mail",
        explanation: {
            correct: "Trata-se de phishing clássico via e-mail.",
            details: [
                "Usa pretexto de urgência para fazer a vítima agir sem pensar.",
                "O site falso imita a identidade visual de um serviço real.",
                "O objetivo é o roubo de identidade ou credenciais."
            ],
            tip: "Sempre passe o mouse sobre o link antes de clicar para ver a URL real de destino."
        }
    },
    {
        question: "Um laboratório de informática teve todos os arquivos criptografados e uma mensagem exige pagamento em criptomoeda para liberar o acesso. Qual malware foi utilizado?",
        options: [
            "Spyware",
            "Worm",
            "Adware",
            "Ransomware"
        ],
        correctAnswer: "Ransomware",
        explanation: {
            correct: "Ransomware é um malware de extorsão.",
            details: [
                "Criptografa os arquivos do usuário com chaves fortes.",
                "Exige resgate (geralmente em Bitcoin) para fornecer a chave de descriptografia.",
                "Pode se espalhar pela rede infectando outros computadores."
            ],
            tip: "Backups offline ou imutáveis são a única garantia contra perda de dados por ransomware."
        }
    },
    {
        question: "Em uma análise de riscos, qual é o cálculo básico para determinar o nível de risco?",
        options: [
            "Risco = Ameaça + Vulnerabilidade",
            "Risco = Custo ÷ Benefício",
            "Risco = Número de incidentes por ano",
            "Risco = Probabilidade × Impacto"
        ],
        correctAnswer: "Risco = Probabilidade × Impacto",
        explanation: {
            correct: "O cálculo clássico de risco envolve probabilidade e severidade.",
            details: [
                "Probabilidade: A chance de a ameaça explorar a vulnerabilidade.",
                "Impacto: O dano causado caso o evento ocorra.",
                "Ajuda a priorizar quais riscos devem ser tratados primeiro."
            ],
            tip: "Foque primeiro nos riscos de Alto Impacto e Alta Probabilidade."
        }
    },
    {
        question: "Uma escola descobriu que alunos usam a mesma senha '123456' para acessar o sistema acadêmico. Qual controle deve ser implementado prioritariamente?",
        options: [
            "Instalar mais câmeras de segurança",
            "Trocar todos os computadores",
            "Bloquear o acesso à internet",
            "Implementar política de senhas fortes e autenticação multifator"
        ],
        correctAnswer: "Implementar política de senhas fortes e autenticação multifator",
        explanation: {
            correct: "Senhas fracas são portas abertas para invasores.",
            details: [
                "O sistema deve exigir tamanho mínimo e complexidade de caracteres.",
                "O MFA impede o acesso mesmo que a senha seja descoberta.",
                "Treinamento dos alunos também é fundamental."
            ],
            tip: "Muitos sistemas forçam a troca da senha no primeiro acesso para garantir a personalização."
        }
    },
    {
        question: "Qual estratégia de tratamento de risco consiste em contratar um seguro contra incidentes cibernéticos?",
        options: [
            "Evitar o risco",
            "Reduzir o risco",
            "Aceitar o risco",
            "Transferir o risco"
        ],
        correctAnswer: "Transferir o risco",
        explanation: {
            correct: "Transferir envolve repassar o impacto financeiro para terceiros.",
            details: [
                "Seguros cibernéticos cobrem custos de resposta a incidentes e multas.",
                "A responsabilidade técnica de proteção ainda é da empresa.",
                "Terceirizar serviços para nuvem também pode ser uma forma de transferência parcial."
            ],
            tip: "O seguro não evita o ataque; ele apenas mitiga a perda financeira decorrente dele."
        }
    },
    {
        question: "Um administrador de rede precisa separar o tráfego do setor financeiro do restante da empresa. Qual tecnologia deve utilizar?",
        options: [
            "NAT",
            "DNS",
            "DHCP",
            "VLAN"
        ],
        correctAnswer: "VLAN",
        explanation: {
            correct: "VLANs (Virtual LANs) segmentam a rede logicamente.",
            details: [
                "Evita que um computador infectado no setor de RH acesse o setor financeiro.",
                "Reduz o domínio de broadcast na rede.",
                "Funciona na camada 2 do modelo OSI."
            ],
            tip: "A segmentação de rede através de VLANs é um requisito básico de segurança corporativa."
        }
    },
    {
        question: "O que é hardening de servidores?",
        options: [
            "Aumentar a capacidade de hardware do servidor",
            "Instalar mais memória RAM",
            "Fazer backup diário automático",
            "Aplicar configurações de segurança para reduzir a superfície de ataque"
        ],
        correctAnswer: "Aplicar configurações de segurança para reduzir a superfície de ataque",
        explanation: {
            correct: "Hardening consiste em deixar o sistema 'mais duro' contra ataques.",
            details: [
                "Desabilitar serviços e portas desnecessários.",
                "Remover usuários padrão e softwares não utilizados.",
                "Manter o sistema e softwares sempre atualizados."
            ],
            tip: "Sistemas recém-instalados geralmente vêm com configurações padrão inseguras. Sempre faça hardening antes de colocá-los em produção."
        }
    },
    {
        question: "Qual protocolo é utilizado para coletar logs de dispositivos de rede de forma centralizada?",
        options: [
            "SNMP",
            "FTP",
            "SMTP",
            "Syslog"
        ],
        correctAnswer: "Syslog",
        explanation: {
            correct: "O Syslog permite que dispositivos enviem mensagens de log pela rede para um servidor central.",
            details: [
                "Facilita a análise de incidentes e auditoria.",
                "Sistemas SIEM frequentemente coletam dados via Syslog.",
                "Permite monitorar eventos de segurança em tempo real."
            ],
            tip: "Garanta que o relógio de todos os dispositivos esteja sincronizado (via NTP) para que os logs façam sentido cronológico."
        }
    },
    {
        question: "Na LGPD, qual é a base legal que permite o tratamento de dados pessoais de alunos para fins pedagógicos em uma instituição de ensino?",
        options: [
            "Consentimento exclusivamente",
            "Interesse legítimo do professor",
            "Não existe base legal para isso",
            "Execução de políticas públicas ou cumprimento de obrigação legal"
        ],
        correctAnswer: "Execução de políticas públicas ou cumprimento de obrigação legal",
        explanation: {
            correct: "A LGPD prevê bases legais além do consentimento.",
            details: [
                "Escolas precisam tratar dados para cumprir leis educacionais.",
                "O consentimento não é a única forma de tratar dados legalmente.",
                "Mesmo sem consentimento explícito, o tratamento pode ser legal se amparado por outra base."
            ],
            tip: "Sempre identifique qual base legal justifica o uso de dados pessoais no seu projeto."
        }
    },
    {
        question: "Um funcionário encontrou um pendrive no estacionamento da empresa e conectou no computador corporativo. Qual risco principal ele introduziu?",
        options: [
            "Risco de superaquecimento do computador",
            "Aumento no consumo de energia",
            "Lentidão na rede Wi-Fi",
            "Execução de malware ou código malicioso presente no dispositivo"
        ],
        correctAnswer: "Execução de malware ou código malicioso presente no dispositivo",
        explanation: {
            correct: "Isso é um ataque clássico de engenharia social chamado 'Baiting'.",
            details: [
                "O atacante deixa o pendrive de propósito para que a curiosidade da vítima faça o resto.",
                "Ao plugar, o malware pode rodar automaticamente ou induzir o usuário a abrir um arquivo infectado.",
                "Pode comprometer toda a rede corporativa."
            ],
            tip: "Nunca conecte dispositivos USB de origem desconhecida em computadores da empresa."
        }
    },
    {
        question: "Qual é a principal vantagem de realizar backups seguindo a regra 3-2-1?",
        options: [
            "Economizar espaço em disco",
            "Fazer backup apenas uma vez por mês",
            "Usar apenas armazenamento em nuvem",
            "Ter 3 cópias em 2 mídias diferentes, sendo 1 offsite, garantindo recuperação"
        ],
        correctAnswer: "Ter 3 cópias em 2 mídias diferentes, sendo 1 offsite, garantindo recuperação",
        explanation: {
            correct: "A regra 3-2-1 garante redundância e proteção contra diferentes tipos de falha.",
            details: [
                "3 cópias dos dados (a original + 2 backups).",
                "2 mídias diferentes (ex: disco rígido e nuvem).",
                "1 cópia fora do local (offsite) para proteger contra incêndios ou roubos no local principal."
            ],
            tip: "Teste seus backups regularmente. Um backup que não pode ser restaurado não tem valor."
        }
    },
    {
        question: "O que significa GRC no contexto de segurança da informação?",
        options: [
            "Grupo de Resposta Cibernética",
            "Gerenciamento de Redes e Configurações",
            "Gateway de Roteamento Central",
            "Governança, Risco e Compliance"
        ],
        correctAnswer: "Governança, Risco e Compliance",
        explanation: {
            correct: "GRC é uma estratégia integrada para alinhar TI aos objetivos de negócios e leis.",
            details: [
                "Governança: Garante que as atividades de segurança suportem os objetivos do negócio.",
                "Risco: Identifica e trata os riscos de segurança.",
                "Compliance: Garante que a empresa cumpra leis e normas (como LGPD ou ISO 27001)."
            ],
            tip: "A segurança da informação moderna vai muito além do firewall; envolve processos e leis."
        }
    },
    {
        question: "Durante o monitoramento da rede, o SNMP detectou uso de CPU acima de 95% em um servidor por 2 horas. Qual deve ser a primeira ação do administrador?",
        options: [
            "Desligar o servidor imediatamente",
            "Ignorar, pois é comportamento normal",
            "Reinstalar o sistema operacional",
            "Investigar os processos em execução e verificar se há atividade anormal"
        ],
        correctAnswer: "Investigar os processos em execução e verificar se há atividade anormal",
        explanation: {
            correct: "O monitoramento indica uma anomalia que precisa ser investigada.",
            details: [
                "Pode ser um processo legítimo travado ou uma tarefa pesada de banco de dados.",
                "Também pode ser um indicativo de infecção por malware (como mineradores de criptomoeda) ou ataque DDoS.",
                "Ações drásticas sem investigação podem causar indisponibilidade desnecessária."
            ],
            tip: "Conheça o 'comportamento normal' de seus servidores para identificar anomalias rapidamente."
        }
    },
    {
        question: "Qual é a primeira ação recomendada ao identificar um possível incidente de segurança em uma estação de trabalho?",
        options: [
            "Formatar o computador imediatamente",
            "Desligar todos os servidores da empresa",
            "Enviar e-mail para todos os funcionários",
            "Isolar o equipamento da rede e documentar o incidente"
        ],
        correctAnswer: "Isolar o equipamento da rede e documentar o incidente",
        explanation: {
            correct: "Isolar o dispositivo evita que o problema se espalhe.",
            details: [
                "Desconecte o cabo de rede ou desligue o Wi-Fi.",
                "Preserve o estado atual da memória para análise forense.",
                "Formatar imediatamente destrói as pistas do ataque."
            ],
            tip: "Tenha um procedimento claro de resposta a incidentes para que todos saibam o que fazer."
        }
    },
    {
        question: "Uma empresa decide não implementar controles contra um risco de probabilidade muito baixa e impacto mínimo. Qual estratégia de tratamento de risco está sendo aplicada?",
        options: [
            "Evitar o risco",
            "Reduzir o risco",
            "Transferir o risco",
            "Aceitar o risco"
        ],
        correctAnswer: "Aceitar o risco",
        explanation: {
            correct: "Aceitar o risco significa que a empresa está ciente dele e tolera a possível perda.",
            details: [
                "Geralmente aplicado quando o custo de mitigar o risco é maior que o dano potencial.",
                "Deve ser uma decisão consciente e documentada pelos gestores.",
                "Os riscos aceitos devem ser monitorados periodicamente."
            ],
            tip: "Nenhum sistema é 100% seguro; aceitar riscos residuais faz parte da gestão."
        }
    },
    // Adicionando mais 15 perguntas para Riscos (Total 30)
    {
        question: "Qual destes documentos é essencial para garantir a continuidade dos negócios em caso de desastre em TI?",
        options: ["Manual do Usuário", "Plano de Recuperação de Desastres (DRP)", "Código de Ética da Empresa", "Organograma do setor de TI"],
        correctAnswer: "Plano de Recuperação de Desastres (DRP)",
        explanation: {
            correct: "O DRP foca especificamente na recuperação da infraestrutura de TI.",
            details: [
                "Define processos para restaurar sistemas críticos após um evento catastrófico.",
                "Inclui procedimentos de restauração de backup.",
                "É um subconjunto do Plano de Continuidade de Negócios (BCP)."
            ],
            tip: "Um DRP só é válido se for testado periodicamente através de simulações."
        }
    },
    {
        question: "O que significa o termo 'RPO' (Recovery Point Objective) em gestão de continuidade?",
        options: ["Tempo máximo para restaurar um serviço", "Custo total de um incidente", "Frequência mínima de treinamento de equipe", "A quantidade máxima tolerável de perda de dados medida em tempo"],
        correctAnswer: "A quantidade máxima tolerável de perda de dados medida em tempo",
        explanation: {
            correct: "RPO define a 'idade' máxima dos dados que você pode perder.",
            details: [
                "Se o seu RPO é de 1 hora, você precisa fazer backups pelo menos a cada hora.",
                "Determina a frequência dos backups.",
                "RTO lida com tempo de recuperação; RPO lida com perda de dados."
            ],
            tip: "Sistemas financeiros costumam ter RPO próximo de zero."
        }
    },
    {
        question: "O que caracteriza uma ameaça persistente avançada (APT)?",
        options: ["Um vírus que se espalha rápido e dura 1 dia", "Um ataque automatizado de botnet", "Um usuário que esquece a senha frequentemente", "Um ataque direcionado, orquestrado por grupos organizados, que permanece oculto por longos períodos"],
        correctAnswer: "Um ataque direcionado, orquestrado por grupos organizados, que permanece oculto por longos períodos",
        explanation: {
            correct: "APTs são focadas no sigilo e na persistência em redes específicas.",
            details: [
                "Geralmente financiadas por estados-nação ou crime organizado.",
                "O objetivo costuma ser espionagem ou roubo de propriedade intelectual, não dano imediato.",
                "São muito difíceis de detectar por métodos tradicionais."
            ],
            tip: "A análise comportamental de rede é fundamental para detectar a presença de APTs."
        }
    },
    {
        question: "Um ataque de negação de serviço distribuído (DDoS) visa comprometer qual pilar da segurança?",
        options: ["Confidencialidade", "Integridade", "Autenticidade", "Disponibilidade"],
        correctAnswer: "Disponibilidade",
        explanation: {
            correct: "DDoS visa derrubar o sistema, impedindo o acesso de usuários legítimos.",
            details: [
                "Inunda o servidor com tráfego falso vindo de milhares de origens diferentes (botnets).",
                "Esgota recursos de rede, CPU ou memória do alvo.",
                "Não visa necessariamente roubar dados, mas causar prejuízo por indisponibilidade."
            ],
            tip: "Serviços de proteção em nuvem (como Cloudflare) ajudam a filtrar tráfego DDoS antes que chegue ao seu servidor."
        }
    },
    {
        question: "Qual técnica de segurança consiste em alterar o código fonte ou configurações para remover vulnerabilidades conhecidas?",
        options: ["Hardening", "Criptografia", "Patch Management (Gestão de Correções)", "Autenticação"],
        correctAnswer: "Patch Management (Gestão de Correções)",
        explanation: {
            correct: "Manter softwares atualizados corrige falhas de segurança conhecidas.",
            details: [
                "Fabricantes lançam patches regularmente para corrigir bugs e vulnerabilidades.",
                "Muitos ataques exploram falhas para as quais já existem correções disponíveis.",
                "Deve ser um processo contínuo e homologado."
            ],
            tip: "Sempre teste os patches em um ambiente de homologação antes de aplicar em produção para evitar quebras de sistema."
        }
    },
    {
        question: "O que é 'Shadow IT'?",
        options: ["O setor de TI que trabalha no turno da noite", "O uso de sistemas e soluções de TI dentro de uma organização sem a aprovação explícita do departamento de TI", "Um tipo de malware que gera sombras nas janelas do Windows", "A equipe reserva de suporte técnico"],
        correctAnswer: "O uso de sistemas e soluções de TI dentro de uma organização sem a aprovação explícita do departamento de TI",
        explanation: {
            correct: "Shadow IT cria riscos de segurança e conformidade desconhecidos pela empresa.",
            details: [
                "Exemplo: Funcionários usando Dropbox pessoal para armazenar arquivos da empresa porque acham o sistema oficial lento.",
                "A TI não pode proteger o que não sabe que existe.",
                "Pode violar leis como a LGPD se dados pessoais forem parar em locais não autorizados."
            ],
            tip: "Em vez de apenas bloquear, a TI deve entender as necessidades dos usuários e oferecer soluções oficiais viáveis."
        }
    },
    {
        question: "O que é 'Tailgating' (ou Piggybacking) na segurança física?",
        options: ["Seguir alguém muito de perto no trânsito", "Instalar rastreadores em carros da empresa", "Invadir redes Wi-Fi a partir do estacionamento", "Seguir uma pessoa autorizada através de uma porta segura sem apresentar credenciais"],
        correctAnswer: "Seguir uma pessoa autorizada através de uma porta segura sem apresentar credenciais",
        explanation: {
            correct: "É uma falha física onde o invasor 'pega carona' no acesso de outra pessoa.",
            details: [
                "Explora a cortesia social (segurar a porta para quem vem atrás).",
                "O invasor pode se disfarçar de entregador ou funcionário com as mãos ocupadas.",
                "Bypass de catracas ou portas com biometria."
            ],
            tip: "Treine os funcionários para nunca segurarem portas de áreas restritas para pessoas sem crachá visível."
        }
    },
    {
        question: "O que significa DLP na segurança da informação?",
        options: ["Data Loss Prevention (Prevenção de Perda/Vazamento de Dados)", "Digital Line Protocol", "Dual Log Processor", "Distributed Login Protection"],
        correctAnswer: "Data Loss Prevention (Prevenção de Perda/Vazamento de Dados)",
        explanation: {
            correct: "DLP são ferramentas e práticas para evitar que dados sensíveis saiam da rede da empresa.",
            details: [
                "Monitora dados em repouso, em uso e em trânsito.",
                "Pode bloquear o envio de e-mails contendo números de CPF ou arquivos marcados como 'Confidencial'.",
                "Ajuda na conformidade com leis de proteção de dados (LGPD)."
            ],
            tip: "DLP exige uma classificação prévia e correta dos dados da empresa para funcionar bem."
        }
    },
    {
        question: "Em uma matriz de risco, um evento de 'Alto Impacto' e 'Baixa Probabilidade' deve ser:",
        options: ["Ignorado completamente", "Tratado com a mesma urgência de um risco de alto impacto e alta probabilidade", "Monitorado e incluído em planos de contingência/continuidade", "Aceito sem qualquer registro"],
        correctAnswer: "Monitorado e incluído em planos de contingência/continuidade",
        explanation: {
            correct: "Riscos de alto impacto (como a queda de um raio no data center) exigem planos de resposta, mesmo sendo raros.",
            details: [
                "Ignorar pode falir a empresa se o evento ocorrer.",
                "Não vale a pena gastar fortunas prevenindo algo improvável, mas deve-se saber o que fazer se acontecer.",
                "Geralmente associado a planos de recuperação de desastres."
            ],
            tip: "Cenários de pandemia eram considerados de baixo risco e alto impacto antes de 2020."
        }
    },
    {
        question: "Qual é o principal objetivo de um plano de conscientização em segurança?",
        options: ["Punir funcionários que cometem erros", "Mudar o comportamento dos usuários para reduzir riscos humanos", "Ensinar os funcionários a programar firewalls", "Substituir softwares antivírus por palestras"],
        correctAnswer: "Mudar o comportamento dos usuários para reduzir riscos humanos",
        explanation: {
            correct: "O elo mais fraco costuma ser o humano; a conscientização visa fortalecê-lo.",
            details: [
                "Ensina a reconhecer phishing, criar senhas fortes e reportar incidentes.",
                "Deve ser contínuo e não um evento único anual.",
                "Usa exemplos práticos e linguagem não técnica."
            ],
            tip: "Simulações de phishing controladas são ótimas ferramentas de medição de eficácia do treinamento."
        }
    },
    {
        question: "Qual protocolo é usado para sincronizar os relógios dos dispositivos na rede?",
        options: ["NTP", "DNS", "DHCP", "FTP"],
        correctAnswer: "NTP",
        explanation: {
            correct: "O NTP (Network Time Protocol) garante que todos os logs tenham a mesma referência temporal.",
            details: [
                "Essencial para correlacionar eventos em diferentes servidores durante uma investigação de incidente.",
                "Funciona na porta UDP 123.",
                "Sem horários sincronizados, reconstruir a linha do tempo de um ataque é quase impossível."
            ],
            tip: "Sempre aponte seus servidores para servidores NTP confiáveis (como os do projeto ntp.br)."
        }
    },
    {
        question: "O que caracteriza o ataque 'Man-in-the-Middle' (MitM)?",
        options: ["Um invasor que desliga fisicamente o cabo de rede", "Um invasor que se posiciona entre duas partes que se comunicam para interceptar ou alterar as mensagens", "Um ataque que visa apenas celulares", "Um tipo de vírus que infecta mídias físicas"],
        correctAnswer: "Um invasor que se posiciona entre duas partes que se comunicam para interceptar ou alterar as mensagens",
        explanation: {
            correct: "O atacante consegue ler, inserir ou modificar mensagens entre as vítimas sem que elas saibam.",
            details: [
                "Comum em redes Wi-Fi públicas sem criptografia.",
                "A criptografia ponta-a-ponta (como HTTPS ou VPN) é a principal defesa contra MitM.",
                "O atacante pode personificar uma das partes."
            ],
            tip: "Evite acessar bancos ou digitar senhas em redes Wi-Fi abertas de locais públicos."
        }
    },
    {
        question: "Em segurança física, o uso de 'Crachás de Identificação' visa principalmente combater qual ameaça?",
        options: ["Ataques de força bruta", "Engenharia social do tipo 'Tailgating' e personificação", "Invasão por Wi-Fi", "Ataques de negação de serviço"],
        correctAnswer: "Engenharia social do tipo 'Tailgating' e personificação",
        explanation: {
            correct: "Crachás ajudam a identificar visualmente quem está autorizado a estar no local.",
            details: [
                "Dificulta a entrada de estranhos que tentam se passar por funcionários.",
                "Permite que funcionários questionem pessoas sem crachá em áreas restritas.",
                "Devem ser recolhidos imediatamente no desligamento do funcionário."
            ],
            tip: "Combine crachás com sistemas de controle de acesso eletrônico (portas com leitoras)."
        }
    },
    {
        question: "Qual das seguintes ações NÃO é recomendada para mitigar o risco de infecção por ransomware?",
        options: ["Manter backups regulares e desconectados da rede (offline)", "Treinar usuários para reconhecer e-mails de phishing", "Pagar o resgate imediatamente para recuperar os arquivos o mais rápido possível", "Manter sistemas operacionais e softwares atualizados"],
        correctAnswer: "Pagar o resgate imediatamente para recuperar os arquivos o mais rápido possível",
        explanation: {
            correct: "Pagar o resgate incentiva o crime e não garante a recuperação dos dados.",
            details: [
                "Estatísticas mostram que muitas empresas que pagam não recebem a chave ou recebem chaves defeituosas.",
                "Financia novas campanhas de ataques dos cibercriminosos.",
                "Torna a empresa um alvo preferencial para futuros ataques (pois sabem que ela paga)."
            ],
            tip: "Autoridades policiais em todo o mundo recomendam fortemente NÃO pagar resgates de ransomware."
        }
    },
    {
        question: "Um ataque de SQL Injection (Injeção de SQL) explora vulnerabilidades em:",
        options: ["Protocolos de roteamento de rede", "Sistemas operacionais de servidores", "Aplicações web que não validam corretamente os dados de entrada do usuário antes de enviá-los ao banco de dados", "Criptografia de arquivos de backup"],
        correctAnswer: "Aplicações web que não validam corretamente os dados de entrada do usuário antes de enviá-los ao banco de dados",
        explanation: {
            correct: "O atacante insere comandos SQL maliciosos em campos de entrada da aplicação.",
            details: [
                "Pode permitir ler dados confidenciais do banco de dados (como senhas).",
                "Pode permitir modificar ou apagar dados do banco.",
                "Ocorre devido à falta de sanitização de inputs ou não uso de queries parametrizadas."
            ],
            tip: "Sempre use 'Prepared Statements' ou consultas parametrizadas no desenvolvimento de sistemas para evitar SQL Injection."
        }
    }
];

const quizCyberAvancado = [
    // 30 perguntas para Cyber Avançado
    {
        question: "A norma ISO 27001 exige a implementação de um SGSI. O que significa SGSI?",
        options: [
            "Sistema Geral de Serviços de Internet",
            "Serviço de Gerenciamento de Sistemas Integrados",
            "Software de Garantia de Segurança Industrial",
            "Sistema de Gestão de Segurança da Informação"
        ],
        correctAnswer: "Sistema de Gestão de Segurança da Informação",
        explanation: {
            correct: "SGSI é a sigla para Sistema de Gestão de Segurança da Informação.",
            details: [
                "É uma abordagem sistemática para gerenciar informações sensíveis da empresa.",
                "Envolve pessoas, processos e sistemas de TI.",
                "A ISO 27001 fornece os requisitos para estabelecer, implementar, manter e melhorar continuamente um SGSI."
            ],
            tip: "A certificação ISO 27001 demonstra internacionalmente o compromisso da empresa com a segurança dos dados."
        }
    },
    {
        question: "Um SIEM detectou múltiplas tentativas de login falhadas seguidas de um acesso bem-sucedido às 3h da manhã com uma conta de administrador. Qual deve ser a resposta imediata?",
        options: [
            "Aguardar o relatório mensal de segurança",
            "Reiniciar o servidor SIEM",
            "Enviar e-mail ao usuário perguntando se foi ele",
            "Isolar a conta, verificar a origem do acesso e ativar o plano de resposta a incidentes"
        ],
        correctAnswer: "Isolar a conta, verificar a origem do acesso e ativar o plano de resposta a incidentes",
        explanation: {
            correct: "Esse padrão de log indica um ataque de força bruta ou estouro de credenciais bem-sucedido.",
            details: [
                "Múltiplas falhas seguidas de sucesso é o indicador clássico de que o atacante acertou a senha.",
                "O horário atípico (3h) aumenta a suspeita de atividade maliciosa.",
                "Ações imediatas de contenção são necessárias antes que o atacante cause mais danos."
            ],
            tip: "Configure alertas de SIEM específicos para esse tipo de padrão para resposta rápida."
        }
    },
    {
        question: "Qual é a função principal de um IDS (Intrusion Detection System)?",
        options: [
            "Bloquear automaticamente todo tráfego suspeito",
            "Criptografar todo o tráfego de rede",
            "Gerenciar as senhas dos usuários",
            "Detectar e alertar sobre atividades suspeitas na rede"
        ],
        correctAnswer: "Detectar e alertar sobre atividades suspeitas na rede",
        explanation: {
            correct: "O IDS monitora passivamente o tráfego em busca de padrões de ataques conhecidos ou anomalias.",
            details: [
                "Ele gera alertas para os administradores, mas geralmente não impede o tráfego (isso é papel do IPS).",
                "Pode ser baseado em rede (NIDS) ou em host (HIDS).",
                "Ajuda na visibilidade do que está acontecendo na rede."
            ],
            tip: "Combine IDS com ferramentas de análise de logs para reduzir falsos positivos."
        }
    },
    {
        question: "Em um SOC (Security Operations Center), qual é a diferença principal entre um analista de Nível 1 (L1) e Nível 3 (L3)?",
        options: [
            "L1 configura firewalls e L3 faz backups",
            "L1 gerencia servidores e L3 instala antivírus",
            "Não há diferença, ambos fazem as mesmas tarefas",
            "L1 faz triagem de alertas e L3 realiza análise avançada e resposta a incidentes complexos"
        ],
        correctAnswer: "L1 faz triagem de alertas e L3 realiza análise avançada e resposta a incidentes complexos",
        explanation: {
            correct: "A estrutura de um SOC é hierárquica baseada na complexidade das tarefas.",
            details: [
                "Analistas L1 monitoram telas e filtram falsos positivos de alertas reais.",
                "Incidentes reais são passados para L2 para investigação mais profunda.",
                "Analistas L3 lidam com perícia forense, engenharia reversa de malware e caça a ameaças (threat hunting)."
            ],
            tip: "A automação de triagem L1 (SOAR) ajuda analistas humanos a focarem em ameaças mais complexas."
        }
    },
    {
        question: "O que é pentest ético e por que deve ser autorizado formalmente?",
        options: [
            "É um ataque real para causar danos controlados à empresa",
            "É a instalação de antivírus em todos os computadores",
            "É o monitoramento passivo da rede sem qualquer teste",
            "É um teste autorizado que simula ataques para identificar vulnerabilidades antes que atacantes reais as explorem"
        ],
        correctAnswer: "É um teste autorizado que simula ataques para identificar vulnerabilidades antes que atacantes reais as explorem",
        explanation: {
            correct: "Pentests éticos ajudam organizações a entenderem sua postura de segurança real.",
            details: [
                "Simulam as táticas, técnicas e procedimentos (TTPs) de atacantes reais.",
                "A autorização formal ('get out of jail free card') protege legalmente o testador contra acusações de invasão criminosa.",
                "O escopo deve ser bem definido para evitar derrubar sistemas em produção acidentalmente."
            ],
            tip: "Sempre exija um contrato de regras de engajamento (RoE) detalhado antes de iniciar qualquer teste de intrusão."
        }
    },
    {
        question: "Durante uma análise forense, qual é o primeiro princípio que deve ser respeitado ao coletar evidências digitais?",
        options: [
            "Formatar o disco para eliminar malware",
            "Reinstalar o sistema operacional",
            "Compartilhar as evidências por e-mail com a equipe",
            "Preservar a integridade das evidências e manter a cadeia de custódia"
        ],
        correctAnswer: "Preservar a integridade das evidências e manter a cadeia de custódia",
        explanation: {
            correct: "A validade legal de uma evidência depende de sua não alteração desde a coleta.",
            details: [
                "Sempre trabalhe em cópias bit-a-bit (imagens forenses) e nunca no disco original.",
                "Calcule e registre o hash (MD5/SHA) da evidência no momento da coleta para provar que não mudou.",
                "A cadeia de custódia documenta quem teve acesso à evidência física ou digital a cada momento."
            ],
            tip: "Se você alterar um único arquivo no sistema investigado, a evidência pode ser invalidada no tribunal."
        }
    },
    {
        question: "O que é movimentação lateral em um ataque cibernético?",
        options: [
            "Mover fisicamente os servidores para outro local",
            "Transferir dados entre filiais da empresa",
            "Atualizar lateralmente os patches de segurança",
            "Técnica em que o atacante se move entre sistemas internos após comprometer um ponto de entrada"
        ],
        correctAnswer: "Técnica em que o atacante se move entre sistemas internos após comprometer um ponto de entrada",
        explanation: {
            correct: "A movimentação lateral ocorre após a invasão inicial (ponto de apoio).",
            details: [
                "O atacante busca sistemas com dados mais valiosos ou maior privilégio.",
                "Usa técnicas como 'Pass-the-Hash' ou exploração de compartilhamentos de rede.",
                "A segmentação de rede dificulta muito essa movimentação."
            ],
            tip: "Monitore tráfego interno incomum (leste-oeste), pois firewalls de borda costumam focar apenas no tráfego norte-sul."
        }
    },
    {
        question: "O que é o princípio do menor privilégio e como ele se aplica à segurança de redes?",
        options: [
            "Dar acesso total para facilitar o trabalho dos funcionários",
            "Usar o menor número possível de senhas",
            "Instalar o menor número de softwares possível",
            "Conceder apenas as permissões mínimas necessárias para cada usuário executar suas funções"
        ],
        correctAnswer: "Conceder apenas as permissões mínimas necessárias para cada usuário executar suas funções",
        explanation: {
            correct: "Princípio fundamental de segurança para limitar danos.",
            details: [
                "Se a conta de um estagiário for invadida, o atacante não deve conseguir acessar o banco de dados principal de clientes.",
                "Aplica-se a usuários humanos e também a contas de serviço de softwares.",
                "Facilita a identificação de comportamentos anômalos."
            ],
            tip: "Revise periodicamente as permissões dos usuários; é comum pessoas mudarem de cargo e acumularem acessos antigos."
        }
    },
    {
        question: "Uma empresa sofreu um ataque de ransomware que afetou o servidor principal. O plano de continuidade de negócios (PCN) prevê RTO de 4 horas. O que significa RTO?",
        options: [
            "Relatório Técnico Operacional",
            "Registro Total de Ocorrências",
            "Resposta Técnica Obrigatória",
            "Recovery Time Objective — tempo máximo aceitável para restaurar o serviço"
        ],
        correctAnswer: "Recovery Time Objective — tempo máximo aceitável para restaurar o serviço",
        explanation: {
            correct: "O RTO define a meta de tempo para voltar à operação normal.",
            details: [
                "Se o RTO é de 4 horas, a equipe tem esse prazo para restaurar o backup e colocar o sistema no ar de novo.",
                "Ajuda a definir que tipo de solução de backup ou redundância é necessária.",
                "RTOs muito baixos (segundos) exigem soluções caras de espelhamento em tempo real."
            ],
            tip: "RTO lida com o tempo que leva para voltar; RPO lida com a quantidade de dados perdidos."
        }
    },
    {
        question: "Qual abordagem de segurança implementa múltiplas camadas de proteção para que, se uma falhar, as demais continuem protegendo?",
        options: [
            "Segurança por obscuridade",
            "Single Sign-On",
            "Zero Trust isolado",
            "Defesa em profundidade"
        ],
        correctAnswer: "Defesa em profundidade",
        explanation: {
            correct: "Defesa em profundidade (ou segurança em camadas) assume que qualquer controle pode falhar.",
            details: [
                "Combina controles físicos, técnicos e administrativos.",
                "Exemplo: Firewall (perímetro) + Antivírus (endpoint) + Autenticação Forte (acesso) + Criptografia (dados).",
                "Cria barreiras sucessivas para o atacante."
            ],
            tip: "Não confie apenas em um único 'muro alto'. Se o invasor passar por ele, seu sistema estará totalmente exposto."
        }
    },
    {
        question: "A LGPD define o 'Encarregado de Dados' (DPO). Qual é a principal responsabilidade desse profissional?",
        options: [
            "Desenvolver softwares para a empresa",
            "Gerenciar os backups diários",
            "Configurar os firewalls da rede",
            "Atuar como canal de comunicação entre o controlador, os titulares e a ANPD"
        ],
        correctAnswer: "Atuar como canal de comunicação entre o controlador, os titulares e a ANPD",
        explanation: {
            correct: "O DPO (Data Protection Officer) é a ponte de comunicação da empresa para assuntos de privacidade.",
            details: [
                "Orienta os funcionários sobre boas práticas de proteção de dados.",
                "Recebe reclamações e comunicações dos titulares dos dados.",
                "Representa a empresa perante a Autoridade Nacional de Proteção de Dados (ANPD)."
            ],
            tip: "O DPO deve ter autonomia e não pode ser penalizado por reportar desconformidades na empresa."
        }
    },
    {
        question: "Um analista do SOC identificou que um atacante está exfiltrando dados usando consultas DNS codificadas. Qual técnica está sendo utilizada?",
        options: [
            "DNS Spoofing",
            "DNS Amplification",
            "DNS Cache Poisoning",
            "DNS Tunneling"
        ],
        correctAnswer: "DNS Tunneling",
        explanation: {
            correct: "DNS Tunneling encapsula dados de outros protocolos dentro de requisições DNS.",
            details: [
                "Como portas de DNS (53) quase sempre estão abertas em firewalls para permitir navegação, o atacante as usa para passar dados roubados disfarçados.",
                "O tráfego de saída parece requisições normais de nomes de domínio.",
                "Exige firewalls de inspeção profunda ou análises baseadas em IA para detectar."
            ],
            tip: "Monitore requisições DNS com nomes de domínios estranhamente longos ou aleatórios."
        }
    },
    {
        question: "Em uma auditoria de segurança, o auditor identificou que contas de ex-funcionários ainda estão ativas no Active Directory. Qual controle falhou?",
        options: [
            "Controle de backup",
            "Firewall de borda",
            "Política de senhas",
            "Gestão de identidades e ciclo de vida de contas"
        ],
        correctAnswer: "Gestão de identidades e ciclo de vida de contas",
        explanation: {
            correct: "O processo de desligamento (offboarding) deve incluir a revogação imediata de todos os acessos.",
            details: [
                "Contas ativas de ex-funcionários são grandes vulnerabilidades (podem ser usadas por eles ou por invasores que descubram as credenciais).",
                "Deve haver integração entre o setor de RH e o setor de TI.",
                "A auditoria regular de contas inativas ajuda a identificar essas falhas."
            ],
            tip: "Automatize a desativação de contas através de sistemas integrados de gestão de RH e AD."
        }
    },
    {
        question: "O que é uma análise de impacto nos negócios (BIA) no contexto de continuidade?",
        options: [
            "Relatório financeiro trimestral da empresa",
            "Teste de velocidade da rede interna",
            "Inventário de equipamentos de TI",
            "Processo que identifica funções críticas e avalia o impacto de sua interrupção"
        ],
        correctAnswer: "Processo que identifica funções críticas e avalia o impacto de sua interrupção",
        explanation: {
            correct: "A BIA determina o que é realmente crítico para a sobrevivência da empresa.",
            details: [
                "Quantifica o custo financeiro ou operacional se um sistema ficar fora do ar.",
                "Define prioridades de recuperação (o que restaurar primeiro).",
                "Fornece os dados para calcular o RTO e o RPO ideais."
            ],
            tip: "A BIA deve envolver os gestores das áreas de negócio, não apenas a equipe técnica de TI."
        }
    },
    {
        question: "Um atacante comprometeu uma conta de usuário comum e conseguiu obter privilégios de administrador explorando uma falha no sistema. Qual tipo de ataque ocorreu?",
        options: [
            "Phishing",
            "Denial of Service",
            "Spoofing de IP",
            "Escalação de privilégios"
        ],
        correctAnswer: "Escalação de privilégios",
        explanation: {
            correct: "A escalação de privilégios visa obter maior controle sobre o sistema invadido.",
            details: [
                "Escalação Vertical: Passar de usuário comum para root/administrador.",
                "Escalação Horizontal: Acessar dados de outro usuário de mesmo nível de privilégio.",
                "Geralmente envolve explorar falhas de kernel, softwares desatualizados ou configurações incorretas."
            ],
            tip: "A aplicação rigorosa de patches de segurança ajuda a mitigar falhas exploradas para escalação de privilégios."
        }
    },
    // Adicionando mais 15 perguntas para Cyber Avançado (Total 30)
    {
        question: "O conceito de 'Zero Trust' baseia-se em qual princípio fundamental?",
        options: ["Confiar apenas em dispositivos da rede interna", "Confiar apenas em usuários com senhas fortes", "Nunca confiar, sempre verificar", "Confiar em todos após a primeira autenticação"],
        correctAnswer: "Nunca confiar, sempre verificar",
        explanation: {
            correct: "Zero Trust assume que ameaças podem vir tanto de fora quanto de dentro da rede.",
            details: [
                "Não existe mais o conceito de 'perímetro confiável' (rede interna).",
                "Cada requisição de acesso deve ser autenticada e autorizada, independentemente da origem.",
                "Usa microsegmentação e privilégio mínimo estrito."
            ],
            tip: "Mover-se para uma arquitetura Zero Trust é a tendência atual para proteção contra ameaças modernas."
        }
    },
    {
        question: "O que significa 'Indicators of Compromise' (IoC) em inteligência de ameaças?",
        options: ["Sinais de que o servidor está funcionando bem", "Evidências forenses (como IPs de C2, hashes de arquivos maliciosos ou domínios) de que um sistema foi invadido", "O tempo médio de resposta a incidentes", "O nível de satisfação da equipe de segurança"],
        correctAnswer: "Evidências forenses (como IPs de C2, hashes de arquivos maliciosos ou domínios) de que um sistema foi invadido",
        explanation: {
            correct: "IoCs são pistas digitais deixadas por atacantes.",
            details: [
                "Compartilhados entre empresas para bloquear ameaças conhecidas rapidamente.",
                "Exemplos: Um hash específico de um executável de ransomware, um IP conhecido de um servidor de comando e controle (C2).",
                "Ferramentas de SIEM usam IoCs para buscar ameaças nos logs."
            ],
            tip: "Plataformas de compartilhamento de ameaças (como MISP) ajudam empresas a trocarem IoCs de forma rápida."
        }
    },
    {
        question: "Qual técnica consiste em criar um sistema falso (como um servidor vulnerável) de propósito para atrair e estudar os atacantes?",
        options: ["Sandbox", "IDS", "Firewall de Aplicação", "Honeypot"],
        correctAnswer: "Honeypot",
        explanation: {
            correct: "Um Honeypot ('pote de mel') serve como armadilha e ferramenta de estudo.",
            details: [
                "Não contém dados reais de produção.",
                "Qualquer tráfego direcionado a ele é considerado suspeito por definição.",
                "Ajuda a entender as técnicas e ferramentas usadas pelos atacantes."
            ],
            tip: "Honeypots podem atuar como sistemas de alerta antecipado na rede corporativa."
        }
    },
    {
        question: "Uma falha de 'Buffer Overflow' (Estouro de Buffer) ocorre principalmente devido a:",
        options: ["Falta de espaço em disco rígido", "Uso excessivo de memória swap", "Cabos de rede de baixa qualidade", "Falta de verificação do tamanho dos dados de entrada por parte do programador antes de gravá-los na memória"],
        correctAnswer: "Falta de verificação do tamanho dos dados de entrada por parte do programador antes de gravá-los na memória",
        explanation: {
            correct: "Os dados excedem a capacidade do buffer alocado e sobrescrevem áreas adjacentes da memória.",
            details: [
                "Pode causar falhas no programa ou, pior, execução de código arbitrário pelo atacante.",
                "Comum em linguagens como C e C++ que não possuem gerenciamento automático de memória.",
                "É uma das vulnerabilidades de software mais antigas e perigosas."
            ],
            tip: "Use linguagens de programação seguras em relação à memória (como Rust ou Java) ou funções de cópia seguras."
        }
    },
    {
        question: "O ataque 'Cross-Site Scripting' (XSS) visa:",
        options: ["Derrubar o servidor web por excesso de tráfego", "Roubar a senha do banco de dados do servidor", "Executar scripts maliciosos no navegador de outros usuários que acessam a página vulnerável", "Alterar as tabelas do banco de dados diretamente"],
        correctAnswer: "Executar scripts maliciosos no navegador de outros usuários que acessam a página vulnerável",
        explanation: {
            correct: "O código malicioso (geralmente JavaScript) roda no contexto do navegador da vítima.",
            details: [
                "Pode ser usado para roubar cookies de sessão, redirecionar o usuário ou capturar o que ele digita.",
                "XSS Refletido: O script vem na própria requisição URL.",
                "XSS Armazenado: O script fica gravado no banco de dados do site (ex: em um comentário) e roda para quem visualizar."
            ],
            tip: "A sanitização de inputs e a correta codificação de outputs no desenvolvimento web evitam ataques XSS."
        }
    },
    {
        question: "Qual o principal objetivo do 'Threat Hunting' (Caça a Ameaças)?",
        options: ["Esperar passivamente que o antivírus pegue um arquivo", "Instalar novos firewalls em todos os computadores", "Escrever relatórios de conformidade", "Buscar proativamente por ameaças ocultas na rede que já passaram pelas defesas automáticas"],
        correctAnswer: "Buscar proativamente por ameaças ocultas na rede que já passaram pelas defesas automáticas",
        explanation: {
            correct: "Threat Hunting parte do princípio de que os invasores já podem estar dentro da rede.",
            details: [
                "É um processo ativo e analítico, guiado por hipóteses.",
                "O analista busca por comportamentos sutis que não geraram alertas automáticos.",
                "Reduz o 'dwell time' (tempo que o atacante passa na rede antes de ser descoberto)."
            ],
            tip: "O Threat Hunting exige analistas altamente qualificados e boa visibilidade de logs da rede."
        }
    },
    {
        question: "Qual protocolo criptográfico substituiu o SSL e é usado hoje para proteger conexões HTTPS?",
        options: ["SSH", "WPA2", "PGP", "TLS"],
        correctAnswer: "TLS",
        explanation: {
            correct: "O TLS (Transport Layer Security) é o sucessor mais seguro do SSL.",
            details: [
                "Embora muitas pessoas ainda falem 'SSL', hoje quase tudo usa TLS (idealmente versão 1.2 ou 1.3).",
                "O SSL possui vulnerabilidades conhecidas e é considerado inseguro.",
                "Garante confidencialidade e integridade da comunicação."
            ],
            tip: "Desabilite suporte a versões antigas de SSL e TLS (como TLS 1.0 e 1.1) em seus servidores web."
        }
    },
    {
        question: "Em criptografia assimétrica, o que garante o 'Não-Repúdio' em uma assinatura digital?",
        options: ["O uso da chave pública do receptor", "O fato de que apenas o proprietário possui a chave privada correspondente e a usou para assinar", "O uso de uma senha forte no arquivo", "O uso de criptografia simétrica para fechar o pacote"],
        correctAnswer: "O fato de que apenas o proprietário possui a chave privada correspondente e a usou para assinar",
        explanation: {
            correct: "O não-repúdio impede que o emissor negue ter assinado a mensagem.",
            details: [
                "Como a chave privada é secreta e de posse exclusiva do dono, se ela foi usada para cifrar o hash do documento, deduz-se que foi o dono quem assinou.",
                "A chave pública correspondente é usada por qualquer um para verificar a assinatura.",
                "Combina funções de hash com criptografia assimétrica."
            ],
            tip: "Proteja sua chave privada de assinatura digital com senhas fortes e, se possível, em hardware dedicado (token HSM)."
        }
    },
    {
        question: "A prática de 'DevSecOps' prega que a segurança deve ser introduzida em qual momento do desenvolvimento de software?",
        options: ["Apenas no final do projeto, antes de ir para produção", "Somente se o cliente solicitar explicitamente", "Focada apenas nos servidores onde o sistema vai rodar", "Desde o início e integrada continuamente em todas as fases do ciclo de desenvolvimento"],
        correctAnswer: "Desde o início e integrada continuamente em todas as fases do ciclo de desenvolvimento",
        explanation: {
            correct: "A segurança deve ser tratada como parte integrante do processo (Shift Left).",
            details: [
                "Integra segurança na cultura ágil de DevOps.",
                "Usa testes automatizados de segurança (SAST/DAST) na esteira de CI/CD.",
                "Corrigir falhas durante o desenvolvimento é muito mais barato do que após o sistema estar no ar."
            ],
            tip: "Automatize testes de vulnerabilidade em bibliotecas de terceiros no início da esteira de build."
        }
    },
    {
        question: "No modelo de responsabilidade compartilhada da computação em nuvem, quem é responsável pela segurança DOS DADOS do cliente?",
        options: ["O provedor de nuvem (ex: AWS, Azure, Google) em todos os casos", "O fabricante do roteador do cliente", "O governo federal", "O próprio cliente"],
        correctAnswer: "O próprio cliente",
        explanation: {
            correct: "O provedor protege a infraestrutura ('da nuvem'); o cliente protege o que coloca lá ('na nuvem').",
            details: [
                "O provedor garante a segurança física dos data centers e da rede base.",
                "O cliente deve configurar corretamente firewalls virtuais, permissões de acesso e criptografar seus próprios dados.",
                "Muitas invasões em nuvem ocorrem por má configuração por parte do cliente (ex: buckets S3 abertos publicamente)."
            ],
            tip: "Nunca assuma que seus dados estão automaticamente seguros só porque estão em um provedor de nuvem famoso."
        }
    },
    {
        question: "Qual técnica é usada para analisar o tráfego de rede e identificar anomalias sem ler o conteúdo criptografado dos pacotes?",
        options: ["Quebra de criptografia por força bruta", "Inspeção SSL transparente", "Engenharia reversa de pacotes", "Análise de fluxo de rede (NetFlow)"],
        correctAnswer: "Análise de fluxo de rede (NetFlow)",
        explanation: {
            correct: "NetFlow analisa metadados das conexões (quem fala com quem, quando e quanto).",
            details: [
                "Não precisa abrir a carga útil (payload) criptografada.",
                "Muito eficiente para detectar exfiltração de dados volumosos ou varreduras de rede.",
                "Exige menos poder de processamento do que a inspeção profunda de pacotes (DPI)."
            ],
            tip: "Use análise de fluxo para criar uma linha de base do tráfego normal da sua rede e detectar desvios."
        }
    },
    {
        question: "Em resposta a incidentes, a fase de 'Erradicação' consiste em:",
        options: ["Descobrir quem foi o hacker para processá-lo", "Remover completamente os vestígios do ataque (malwares, contas criadas, portas abertas) do ambiente antes de restaurar os serviços", "Ligar os servidores de volta o mais rápido possível", "Formatar a rede inteira da empresa preventivamente"],
        correctAnswer: "Remover completamente os vestígios do ataque (malwares, contas criadas, portas abertas) do ambiente antes de restaurar os serviços",
        explanation: {
            correct: "Erradicação garante que o invasor não deixou portas dos fundos (backdoors) abertas.",
            details: [
                "Ocorre após a fase de contenção (onde o ataque foi parado).",
                "Envolve limpar sistemas infectados, deletar contas maliciosas criadas e aplicar correções.",
                "Só depois disso passa-se para a fase de recuperação."
            ],
            tip: "Não pule a fase de erradicação na pressa de voltar a operar; o atacante pode voltar imediatamente se você deixar pontas soltas."
        }
    },
    {
        question: "O que é 'Sandbox' no contexto de análise de malware?",
        options: ["Uma área de lazer para a equipe de TI", "Um tipo de firewall para redes Wi-Fi", "Um ambiente isolado e controlado usado para executar e analisar comportamentos de arquivos suspeitos com segurança", "Um protocolo de backup em fita"],
        correctAnswer: "Um ambiente isolado e controlado usado para executar e analisar comportamentos de arquivos suspeitos com segurança",
        explanation: {
            correct: "A Sandbox permite ver o que o arquivo faz sem colocar a rede real em risco.",
            details: [
                "O arquivo roda em uma máquina virtual isolada.",
                "A ferramenta monitora quais arquivos ele altera, quais chaves de registro edita e com quais IPs na internet ele tenta falar.",
                "Muitos malwares modernos tentam detectar se estão rodando em uma Sandbox e mudam seu comportamento para não serem pegos."
            ],
            tip: "Soluções avançadas de e-mail usam Sandboxing para testar anexos suspeitos antes que eles cheguem à caixa do usuário."
        }
    },
    {
        question: "Qual técnica de segurança física impede que uma pessoa seja forçada a abrir uma porta sob ameaça sem gerar um alarme silencioso?",
        options: ["Uso de câmeras falsas", "Porta com fechadura comum de chave física", "Senhas de pânico (Duress Code) em sistemas de controle de acesso", "Trancar todas as portas com cadeados"],
        correctAnswer: "Senhas de pânico (Duress Code) em sistemas de controle de acesso",
        explanation: {
            correct: "A pessoa digita um código especial que abre a porta mas avisa a segurança discretamente.",
            details: [
                "O sistema finge aceitar o código normalmente para não alertar o agressor.",
                "Gera um alerta de emergência na central de monitoramento.",
                "Protege a integridade física do funcionário."
            ],
            tip: "Sistemas de alarme residenciais e corporativos modernos frequentemente possuem essa funcionalidade."
        }
    },
    {
        question: "Um ataque de 'Buffer Overflow' bem-sucedido pode resultar em qual consequência MAIS perigosa?",
        options: ["O computador consumir mais energia", "Lentidão temporária no acesso à internet", "A queima física do processador por superaquecimento", "A execução de código arbitrário escolhido pelo atacante com os privilégios do programa vulnerável"],
        correctAnswer: "A execução de código arbitrário escolhido pelo atacante com os privilégios do programa vulnerável",
        explanation: {
            correct: "Permite ao atacante rodar comandos no sistema vulnerável.",
            details: [
                "Se o programa rodava como administrador (root), o atacante obtém controle total da máquina.",
                "É a base para muitos exploits que visam obter acesso remoto (shells).",
                "Pode levar à instalação de malwares persistentes."
            ],
            tip: "A randomização do layout do espaço de endereço (ASLR) em sistemas operacionais modernos dificulta o sucesso desse tipo de exploit."
        }
    }
];

export { quizFundamentos, quizRiscos, quizCyberAvancado };
