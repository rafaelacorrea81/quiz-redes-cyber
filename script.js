// script.js — Lógica principal do Quiz Segurança de Redes
// Segurança: sanitização de inputs, textContent, anti-spam, validações

import { db, collection, addDoc, onSnapshot, query, orderBy, limit, where, serverTimestamp } from './firebase-config.js';
import { quizFundamentos, quizRiscos, quizCyberAvancado } from './perguntas.js';

// ========== CONSTANTES ==========
const PRIVACY_VERSION = "1.0";
const TOTAL_PERGUNTAS = 15;
const MAX_NICK_LENGTH = 30;
const ANTI_SPAM_MS = 3000;

const QUIZ_CONFIG = {
    'fundamentos': {
        nome: 'Fundamentos de Segurança de Redes',
        perguntas: quizFundamentos,
        tempo: 45,
        alertaTempo: 10,
        pontosPorAcerto: 10,
        bonusMax: 5,
        difficulty: 'facil',
        cor: 'fundamentos',
        icon: '🟢'
    },
    'riscos': {
        nome: 'Análise de Riscos e Cenários',
        perguntas: quizRiscos,
        tempo: 120,
        alertaTempo: 20,
        pontosPorAcerto: 20,
        bonusMax: 10,
        difficulty: 'medio',
        cor: 'riscos',
        icon: '🟡'
    },
    'cyber-avancado': {
        nome: 'Desafio Cyber Avançado',
        perguntas: quizCyberAvancado,
        tempo: 150,
        alertaTempo: 30,
        pontosPorAcerto: 30,
        bonusMax: 15,
        difficulty: 'dificil',
        cor: 'cyber',
        icon: '🔴'
    }
};

const AVATARS = ['🛡️','🔐','🕵️','🚀','💻','🖥️','🔒','⚡','🌐','👾','🤖','🎯','🧠','🦊','🐉','👨‍💻','👩‍💻','🏴‍☠️'];

const MENSAGENS_ACERTO = [
    "Boa, técnico! 🎯", "Firewall mental ativado! 🔥",
    "Resposta segura! 🔐", "Defesa perfeita! 🛡️",
    "Rede protegida! ✅", "Nível de acesso: aprovado! 🚀"
];
const MENSAGENS_ERRO = [
    "Atenção ao risco! ⚠️", "Incidente detectado! 🚨",
    "Brecha na defesa! 🔓", "Alerta de segurança! 🛑",
    "Vulnerabilidade encontrada! 🔍", "Revise o conceito! 📚"
];
const MENSAGENS_TEMPO = [
    "Tempo esgotado! ⏰", "Timeout na conexão! ⌛",
    "Sessão expirada! 🕐"
];

// ========== ESTADO ==========
let state = {
    nickname: '',
    avatar: '🛡️',
    quizSelecionado: null,
    perguntaAtual: 0,
    perguntas: [],
    respostas: [],
    pontuacao: 0,
    bonusTotal: 0,
    timerInterval: null,
    tempoRestante: 0,
    tempoInicioPergunta: 0,
    tempoTotalUsado: 0,
    respondida: false,
    lastSubmitTime: 0
};

// ========== ELEMENTOS DOM ==========
const $ = id => document.getElementById(id);

// ========== FUNÇÕES UTILITÁRIAS ==========

// Sanitizar texto — remove HTML/scripts
function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.trim();
}

// Embaralhar array (Fisher-Yates)
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Formatar segundos em mm:ss
function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m > 0 ? `${m}:${String(sec).padStart(2, '0')}` : `${sec}s`;
}

// Mensagem aleatória
function randomMsg(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Trocar tela ativa
function showScreen(id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    $(id).classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    initAvatars();
    loadPrefs();
    initEventListeners();
    checkCookieBanner();
});

function initAvatars() {
    const grid = $('avatar-grid');
    AVATARS.forEach(emoji => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'avatar-option';
        btn.textContent = emoji;
        btn.setAttribute('aria-label', `Avatar ${emoji}`);
        if (emoji === state.avatar) btn.classList.add('selecionado');
        btn.addEventListener('click', () => {
            grid.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selecionado'));
            btn.classList.add('selecionado');
            state.avatar = emoji;
            savePrefs();
        });
        grid.appendChild(btn);
    });
}

function loadPrefs() {
    try {
        const saved = localStorage.getItem('quizRedesCyber_prefs');
        if (saved) {
            const p = JSON.parse(saved);
            if (p.nickname) {
                $('nickname').value = p.nickname.substring(0, MAX_NICK_LENGTH);
                $('nick-count').textContent = p.nickname.length;
            }
            if (p.avatar && AVATARS.includes(p.avatar)) {
                state.avatar = p.avatar;
                $('avatar-grid').querySelectorAll('.avatar-option').forEach(b => {
                    b.classList.toggle('selecionado', b.textContent === p.avatar);
                });
            }
            if (p.privacyAccepted) $('aceite-privacidade').checked = true;
        }
    } catch (e) { /* localStorage indisponível */ }
}

function savePrefs() {
    try {
        localStorage.setItem('quizRedesCyber_prefs', JSON.stringify({
            nickname: $('nickname').value.substring(0, MAX_NICK_LENGTH),
            avatar: state.avatar,
            privacyAccepted: $('aceite-privacidade').checked
        }));
    } catch (e) { /* localStorage indisponível */ }
}

function clearPrefs() {
    try {
        localStorage.removeItem('quizRedesCyber_prefs');
        localStorage.removeItem('quizRedesCyber_cookieAccepted');
        $('nickname').value = '';
        $('nick-count').textContent = '0';
        $('aceite-privacidade').checked = false;
        state.avatar = '🛡️';
        $('avatar-grid').querySelectorAll('.avatar-option').forEach(b => {
            b.classList.toggle('selecionado', b.textContent === '🛡️');
        });
        document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('selecionado'));
        state.quizSelecionado = null;
        $('cookie-banner').classList.add('visivel');
    } catch (e) { /* */ }
}

function checkCookieBanner() {
    try {
        if (!localStorage.getItem('quizRedesCyber_cookieAccepted')) {
            $('cookie-banner').classList.add('visivel');
        }
    } catch (e) {
        $('cookie-banner').classList.add('visivel');
    }
}

// ========== EVENT LISTENERS ==========
function initEventListeners() {
    // Nickname counter
    $('nickname').addEventListener('input', () => {
        const val = $('nickname').value.substring(0, MAX_NICK_LENGTH);
        $('nickname').value = val;
        $('nick-count').textContent = val.length;
        savePrefs();
    });

    // Quiz card selection
    document.querySelectorAll('.quiz-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('selecionado'));
            card.classList.add('selecionado');
            state.quizSelecionado = card.dataset.quiz;
        });
    });

    // Privacy checkbox save
    $('aceite-privacidade').addEventListener('change', savePrefs);

    // Start quiz
    $('btn-iniciar').addEventListener('click', startQuiz);

    // View ranking
    $('btn-ver-ranking').addEventListener('click', () => { showScreen('tela-ranking'); loadRanking(); });
    $('btn-ranking-resultado').addEventListener('click', () => { showScreen('tela-ranking'); loadRanking(); });
    $('btn-voltar-ranking').addEventListener('click', () => showScreen('tela-inicio'));
    $('btn-voltar-inicio').addEventListener('click', () => showScreen('tela-inicio'));
    $('btn-jogar-novamente').addEventListener('click', () => showScreen('tela-inicio'));

    // Next question
    $('btn-proxima').addEventListener('click', nextQuestion);

    // Privacy modal
    $('link-privacidade').addEventListener('click', e => { e.preventDefault(); $('modal-privacidade').classList.add('visivel'); });
    $('footer-privacidade').addEventListener('click', e => { e.preventDefault(); $('modal-privacidade').classList.add('visivel'); });
    $('modal-fechar').addEventListener('click', () => $('modal-privacidade').classList.remove('visivel'));
    $('modal-privacidade').addEventListener('click', e => { if (e.target === $('modal-privacidade')) $('modal-privacidade').classList.remove('visivel'); });

    // Cookie banner
    $('cookie-aceitar').addEventListener('click', () => {
        try { localStorage.setItem('quizRedesCyber_cookieAccepted', 'true'); } catch(e){}
        $('cookie-banner').classList.remove('visivel');
    });
    $('cookie-politica').addEventListener('click', () => $('modal-privacidade').classList.add('visivel'));

    // Clear prefs
    $('btn-limpar-prefs').addEventListener('click', clearPrefs);

    // Ranking filters
    $('ranking-filtros').addEventListener('click', e => {
        if (e.target.classList.contains('filtro-btn')) {
            $('ranking-filtros').querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
            e.target.classList.add('ativo');
            loadRanking(e.target.dataset.filtro);
        }
    });
}

// ========== VALIDAÇÃO E INÍCIO ==========
function startQuiz() {
    const nick = sanitize($('nickname').value.trim());
    const msgEl = $('msg-validacao');

    if (!nick || nick.length < 2) {
        showError(msgEl, '👤 Digite um apelido com pelo menos 2 caracteres.');
        return;
    }
    if (nick.length > MAX_NICK_LENGTH) {
        showError(msgEl, '👤 O apelido deve ter no máximo 30 caracteres.');
        return;
    }
    if (!$('aceite-privacidade').checked) {
        showError(msgEl, '🔒 Você precisa aceitar a Política de Privacidade para continuar.');
        return;
    }
    if (!state.quizSelecionado || !QUIZ_CONFIG[state.quizSelecionado]) {
        showError(msgEl, '🎯 Selecione um dos 3 quizzes para iniciar.');
        return;
    }

    msgEl.classList.remove('visivel');
    state.nickname = nick;

    const config = QUIZ_CONFIG[state.quizSelecionado];
    state.perguntas = shuffle(config.perguntas).slice(0, TOTAL_PERGUNTAS);
    state.perguntaAtual = 0;
    state.respostas = [];
    state.pontuacao = 0;
    state.bonusTotal = 0;
    state.tempoTotalUsado = 0;
    state.respondida = false;

    // Set quiz visual theme
    const fill = $('progress-fill');
    fill.className = 'progress-bar-fill';
    if (config.cor === 'riscos') fill.classList.add('riscos');
    if (config.cor === 'cyber') fill.classList.add('cyber');

    $('quiz-titulo-header').textContent = `${config.icon} ${config.nome}`;

    showScreen('tela-quiz');
    loadQuestion();
}

function showError(el, msg) {
    el.textContent = msg;
    el.classList.add('visivel');
    setTimeout(() => el.classList.remove('visivel'), 5000);
}

// ========== PERGUNTAS ==========
function loadQuestion() {
    const config = QUIZ_CONFIG[state.quizSelecionado];
    const q = state.perguntas[state.perguntaAtual];
    const num = state.perguntaAtual + 1;

    // Update progress
    $('quiz-progresso').textContent = `${num}/${TOTAL_PERGUNTAS}`;
    $('progress-fill').style.width = `${(num / TOTAL_PERGUNTAS) * 100}%`;

    // Set question text using textContent for security
    $('pergunta-texto').textContent = q.pergunta;

    // Build options
    const lista = $('opcoes-lista');
    lista.innerHTML = '';
    const letras = ['A', 'B', 'C', 'D'];
    q.opcoes.forEach((opcao, i) => {
        const btn = document.createElement('button');
        btn.className = 'opcao-btn';
        btn.type = 'button';

        const letra = document.createElement('span');
        letra.className = 'opcao-letra';
        letra.textContent = letras[i];

        const texto = document.createElement('span');
        texto.textContent = opcao;

        btn.appendChild(letra);
        btn.appendChild(texto);
        btn.addEventListener('click', () => handleAnswer(i));
        lista.appendChild(btn);
    });

    // Reset feedback
    $('feedback-box').classList.remove('visivel', 'acerto', 'erro', 'tempo');
    $('btn-proxima').style.display = 'none';
    $('timer-alert').classList.remove('visivel');

    state.respondida = false;
    startTimer(config.tempo, config.alertaTempo);
}

// ========== TIMER ==========
function startTimer(totalSeconds, alertAt) {
    clearInterval(state.timerInterval);
    state.tempoRestante = totalSeconds;
    state.tempoInicioPergunta = Date.now();

    updateTimerDisplay(totalSeconds, totalSeconds);

    state.timerInterval = setInterval(() => {
        const elapsed = (Date.now() - state.tempoInicioPergunta) / 1000;
        state.tempoRestante = Math.max(0, totalSeconds - elapsed);

        updateTimerDisplay(state.tempoRestante, totalSeconds);

        // Alert when time is running out
        if (state.tempoRestante <= alertAt && state.tempoRestante > 0) {
            $('timer-alert').classList.add('visivel');
            $('timer-fill').classList.add('danger');
            $('timer-text').classList.add('danger');
        } else if (state.tempoRestante > alertAt) {
            $('timer-alert').classList.remove('visivel');
            $('timer-text').classList.remove('danger');
            if (state.tempoRestante / totalSeconds < 0.5) {
                $('timer-fill').classList.add('warning');
                $('timer-fill').classList.remove('danger');
            } else {
                $('timer-fill').classList.remove('warning', 'danger');
            }
        }

        // Time's up
        if (state.tempoRestante <= 0) {
            clearInterval(state.timerInterval);
            handleTimeout();
        }
    }, 250);
}

function updateTimerDisplay(remaining, total) {
    const pct = (remaining / total) * 100;
    $('timer-fill').style.width = `${pct}%`;
    const m = Math.floor(remaining / 60);
    const s = Math.ceil(remaining % 60);
    $('timer-text').textContent = m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`;
}

function stopTimer() {
    clearInterval(state.timerInterval);
    const elapsed = (Date.now() - state.tempoInicioPergunta) / 1000;
    return elapsed;
}

// ========== RESPOSTA ==========
function handleAnswer(selected) {
    if (state.respondida) return;
    state.respondida = true;

    const elapsed = stopTimer();
    state.tempoTotalUsado += elapsed;

    const config = QUIZ_CONFIG[state.quizSelecionado];
    const q = state.perguntas[state.perguntaAtual];
    const correct = q.resposta === selected;

    // Disable all options
    const btns = $('opcoes-lista').querySelectorAll('.opcao-btn');
    btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.resposta) btn.classList.add('correta');
        if (i === selected && !correct) btn.classList.add('errada');
    });

    // Calculate bonus
    let bonus = 0;
    if (correct) {
        const ratio = Math.max(0, state.tempoRestante / config.tempo);
        bonus = Math.round(config.bonusMax * ratio);
        state.pontuacao += config.pontosPorAcerto + bonus;
        state.bonusTotal += bonus;
    }

    // Save answer
    state.respostas.push({ question: state.perguntaAtual, selected, correct, elapsed, bonus });

    // Show feedback
    showFeedback(correct, q.explicacao, false, bonus);
}

function handleTimeout() {
    if (state.respondida) return;
    state.respondida = true;

    const config = QUIZ_CONFIG[state.quizSelecionado];
    const q = state.perguntas[state.perguntaAtual];
    const elapsed = config.tempo;
    state.tempoTotalUsado += elapsed;

    const btns = $('opcoes-lista').querySelectorAll('.opcao-btn');
    btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.resposta) btn.classList.add('correta');
    });

    state.respostas.push({ question: state.perguntaAtual, selected: -1, correct: false, elapsed, bonus: 0 });

    showFeedback(false, q.explicacao, true, 0);
}

function showFeedback(correct, explicacao, timeout, bonus) {
    const fb = $('feedback-box');
    fb.classList.remove('acerto', 'erro', 'tempo');

    if (timeout) {
        fb.classList.add('tempo', 'visivel');
        $('feedback-titulo').textContent = randomMsg(MENSAGENS_TEMPO);
    } else if (correct) {
        fb.classList.add('acerto', 'visivel');
        $('feedback-titulo').textContent = `✅ Correto! ${bonus > 0 ? `(+${bonus} bônus)` : ''}`;
        $('feedback-incentivo').textContent = randomMsg(MENSAGENS_ACERTO);
    } else {
        fb.classList.add('erro', 'visivel');
        $('feedback-titulo').textContent = '❌ Incorreto!';
        $('feedback-incentivo').textContent = randomMsg(MENSAGENS_ERRO);
    }

    $('feedback-explicacao').textContent = explicacao;
    $('btn-proxima').style.display = 'inline-flex';
    $('btn-proxima').textContent = state.perguntaAtual < TOTAL_PERGUNTAS - 1 ? 'Próxima Pergunta ➡️' : 'Ver Resultado 🏁';
}

function nextQuestion() {
    state.perguntaAtual++;
    if (state.perguntaAtual < TOTAL_PERGUNTAS) {
        loadQuestion();
    } else {
        showResults();
    }
}

// ========== RESULTADOS ==========
function showResults() {
    clearInterval(state.timerInterval);

    const config = QUIZ_CONFIG[state.quizSelecionado];
    const acertos = state.respostas.filter(r => r.correct).length;
    const erros = TOTAL_PERGUNTAS - acertos;
    const tempoMedio = state.tempoTotalUsado / TOTAL_PERGUNTAS;

    $('resultado-avatar').textContent = state.avatar;
    $('resultado-nickname').textContent = state.nickname;
    $('resultado-quiz-nome').textContent = `${config.icon} ${config.nome}`;
    $('stat-pontos').textContent = state.pontuacao;
    $('stat-acertos').textContent = `${acertos}/${TOTAL_PERGUNTAS}`;
    $('stat-erros').textContent = erros;
    $('stat-tempo').textContent = formatTime(state.tempoTotalUsado);
    $('stat-medio').textContent = formatTime(tempoMedio);
    $('stat-bonus').textContent = `+${state.bonusTotal}`;

    // Medal
    let medalha, medalhaTxt;
    if (acertos >= 13) { medalha = '🚀'; medalhaTxt = 'Mestre Cyber'; }
    else if (acertos >= 10) { medalha = '🕵️'; medalhaTxt = 'Caçador de Incidentes'; }
    else if (acertos >= 6) { medalha = '🔐'; medalhaTxt = 'Analista em Treinamento'; }
    else { medalha = '🛡️'; medalhaTxt = 'Aprendiz de Defesa'; }

    $('medalha-icon').textContent = medalha;
    $('medalha-texto').textContent = medalhaTxt;

    showScreen('tela-resultado');
    saveToFirestore(acertos, erros, tempoMedio);
}

// ========== FIREBASE SAVE ==========
async function saveToFirestore(acertos, erros, tempoMedio) {
    // Anti-spam
    const now = Date.now();
    if (now - state.lastSubmitTime < ANTI_SPAM_MS) {
        $('resultado-status').textContent = 'Aguarde antes de enviar novamente.';
        return;
    }
    state.lastSubmitTime = now;

    const config = QUIZ_CONFIG[state.quizSelecionado];
    const statusEl = $('resultado-status');
    statusEl.textContent = 'Enviando resultados para o ranking...';

    // Validate score before saving
    const maxPossible = TOTAL_PERGUNTAS * (config.pontosPorAcerto + config.bonusMax);
    if (state.pontuacao < 0 || state.pontuacao > maxPossible) {
        statusEl.textContent = 'Erro na validação da pontuação.';
        return;
    }

    const data = {
        nickname: state.nickname.substring(0, MAX_NICK_LENGTH),
        avatar: state.avatar,
        quizId: state.quizSelecionado,
        quizName: config.nome,
        difficulty: config.difficulty,
        score: state.pontuacao,
        correctAnswers: acertos,
        wrongAnswers: erros,
        totalQuestions: TOTAL_PERGUNTAS,
        timeUsed: Math.round(state.tempoTotalUsado * 100) / 100,
        averageTime: Math.round(tempoMedio * 100) / 100,
        acceptedPrivacyPolicy: true,
        privacyPolicyVersion: PRIVACY_VERSION,
        createdAt: serverTimestamp()
    };

    if (!db) {
        statusEl.textContent = 'Modo offline — resultado salvo apenas localmente.';
        return;
    }

    try {
        await addDoc(collection(db, 'quizResults'), data);
        statusEl.textContent = '✅ Resultado enviado com sucesso!';
    } catch (error) {
        console.error('Erro ao salvar resultado:', error);
        statusEl.textContent = '⚠️ Não foi possível enviar o resultado. Tente ver o ranking mais tarde.';
    }
}

// ========== RANKING ==========
let unsubscribeRanking = null;

function loadRanking(filter = 'todos') {
    const lista = $('ranking-lista');
    lista.innerHTML = '<div class="ranking-loading">Carregando ranking...</div>';

    if (!db) {
        lista.innerHTML = '<div class="ranking-vazio">Firebase não configurado. Ranking indisponível.</div>';
        return;
    }

    // Unsubscribe previous listener
    if (unsubscribeRanking) {
        unsubscribeRanking();
        unsubscribeRanking = null;
    }

    try {
        let q;
        if (filter && filter !== 'todos') {
            q = query(
                collection(db, 'quizResults'),
                where('quizId', '==', filter),
                orderBy('score', 'desc'),
                orderBy('timeUsed', 'asc'),
                limit(10)
            );
        } else {
            q = query(
                collection(db, 'quizResults'),
                orderBy('score', 'desc'),
                orderBy('timeUsed', 'asc'),
                limit(10)
            );
        }

        unsubscribeRanking = onSnapshot(q, snapshot => {
            if (snapshot.empty) {
                lista.innerHTML = '<div class="ranking-vazio">Nenhum resultado encontrado ainda. Seja o primeiro! 🚀</div>';
                return;
            }

            lista.innerHTML = '';
            let pos = 1;
            snapshot.forEach(doc => {
                const d = doc.data();
                const item = document.createElement('div');
                item.className = 'ranking-item';

                // Position with medal
                const posEl = document.createElement('div');
                posEl.className = 'ranking-pos';
                if (pos === 1) { posEl.classList.add('ouro'); posEl.textContent = '🥇'; }
                else if (pos === 2) { posEl.classList.add('prata'); posEl.textContent = '🥈'; }
                else if (pos === 3) { posEl.classList.add('bronze'); posEl.textContent = '🥉'; }
                else { posEl.textContent = `${pos}º`; }

                const avatarEl = document.createElement('div');
                avatarEl.className = 'ranking-avatar';
                avatarEl.textContent = d.avatar || '🛡️';

                const infoEl = document.createElement('div');
                infoEl.className = 'ranking-info';
                const nickEl = document.createElement('div');
                nickEl.className = 'ranking-nick';
                nickEl.textContent = d.nickname || 'Anônimo'; // textContent for security
                const tagEl = document.createElement('div');
                tagEl.className = 'ranking-quiz-tag';
                const quizConf = QUIZ_CONFIG[d.quizId];
                tagEl.textContent = quizConf ? `${quizConf.icon} ${d.correctAnswers}/${d.totalQuestions}` : d.quizName;
                infoEl.appendChild(nickEl);
                infoEl.appendChild(tagEl);

                const scoreEl = document.createElement('div');
                scoreEl.className = 'ranking-score';
                scoreEl.textContent = d.score;

                const metaEl = document.createElement('div');
                metaEl.className = 'ranking-meta';
                if (d.createdAt && d.createdAt.toDate) {
                    const date = d.createdAt.toDate();
                    metaEl.textContent = `${date.toLocaleDateString('pt-BR')}`;
                }

                item.appendChild(posEl);
                item.appendChild(avatarEl);
                item.appendChild(infoEl);
                item.appendChild(scoreEl);
                item.appendChild(metaEl);
                lista.appendChild(item);
                pos++;
            });
        }, error => {
            console.error('Erro ao carregar ranking:', error);
            lista.innerHTML = '<div class="ranking-erro">⚠️ Não foi possível carregar o ranking. Verifique sua conexão.</div>';
        });
    } catch (error) {
        console.error('Erro na query do ranking:', error);
        lista.innerHTML = '<div class="ranking-erro">⚠️ Erro ao acessar o ranking.</div>';
    }
}
