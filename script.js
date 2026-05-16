// script.js — Quiz Segurança de Redes
// Correções: Banco grande, sorteio aleatório, embaralhamento de respostas, explicações pedagógicas, e ranking completo.

import { db, collection, addDoc, onSnapshot, query, orderBy, limit, where, serverTimestamp } from './firebase-config.js';
import { quizFundamentos, quizRiscos, quizCyberAvancado } from './perguntas.js';

const PRIVACY_VERSION = "1.0";
const TOTAL_PERGUNTAS = 15;
const MAX_NICK_LENGTH = 30;
const ANTI_SPAM_MS = 3000;

const QUIZ_CONFIG = {
    'fundamentos': {
        quizId: 'fundamentos',
        quizTitle: 'Fundamentos de Segurança de Redes',
        subject: 'Segurança de Redes',
        nome: 'Fundamentos de Segurança de Redes',
        perguntas: quizFundamentos,
        tempo: 45, alertaTempo: 10,
        pontosPorAcerto: 10, bonusMax: 5,
        category: 'fundamentos', level: 'Fácil',
        cor: 'fundamentos', icon: '🟢',
        difficulty: 'Fácil'
    },
    'riscos': {
        quizId: 'riscos',
        quizTitle: 'Análise de Riscos e Cenários',
        subject: 'Segurança de Redes',
        nome: 'Análise de Riscos e Cenários',
        perguntas: quizRiscos,
        tempo: 120, alertaTempo: 20,
        pontosPorAcerto: 20, bonusMax: 10,
        category: 'riscos', level: 'Médio',
        cor: 'riscos', icon: '🟡',
        difficulty: 'Médio'
    },
    'cyber': {
        quizId: 'cyber',
        quizTitle: 'Desafio Cyber Avançado',
        subject: 'Segurança de Redes',
        nome: 'Desafio Cyber Avançado',
        perguntas: quizCyberAvancado,
        tempo: 150, alertaTempo: 30,
        pontosPorAcerto: 30, bonusMax: 15,
        category: 'cyber', level: 'Difícil',
        cor: 'cyber', icon: '🔴',
        difficulty: 'Difícil'
    }
};

const AVATARS = ['🛡️','🔐','🕵️','🚀','💻','🖥️','🔒','⚡','🌐','👾','🤖','🎯','🧠','🦊','🐉','👨‍💻','👩‍💻','🏴‍☠️'];
const MSG_ACERTO = ["Boa, técnico! 🎯","Firewall mental ativado! 🔥","Resposta segura! 🔐","Defesa perfeita! 🛡️","Rede protegida! ✅","Nível de acesso: aprovado! 🚀"];
const MSG_ERRO = ["Atenção ao risco! ⚠️","Incidente detectado! 🚨","Brecha na defesa! 🔓","Alerta de segurança! 🛑","Vulnerabilidade encontrada! 🔍","Revise o conceito! 📚"];
const MSG_TEMPO = ["Tempo esgotado! ⏰","Timeout na conexão! ⌛","Sessão expirada! 🕐"];

let state = {
    nickname: '', className: '', avatar: '🛡️', quizSelecionado: null,
    perguntaAtual: 0, perguntas: [], respostas: [],
    pontuacao: 0, bonusTotal: 0,
    timerInterval: null, tempoRestante: 0, tempoInicioPergunta: 0,
    tempoTotalUsado: 0, respondida: false, lastSubmitTime: 0
};

const $ = id => document.getElementById(id);
function sanitize(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML.trim(); }
function shuffle(a) { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; }
function formatTime(s) { const m=Math.floor(s/60),sec=Math.floor(s%60); return m>0?`${m}:${String(sec).padStart(2,'0')}`:`${sec}s`; }
function rndMsg(a) { return a[Math.floor(Math.random()*a.length)]; }
function showScreen(id) { document.querySelectorAll('.tela').forEach(t=>t.classList.remove('ativa')); $(id).classList.add('ativa'); window.scrollTo({top:0,behavior:'smooth'}); }

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => { initAvatars(); loadPrefs(); initEvents(); checkCookieBanner(); });

function initAvatars() {
    const grid=$('avatar-grid');
    AVATARS.forEach(e => {
        const b=document.createElement('button'); b.type='button'; b.className='avatar-option'; b.textContent=e;
        b.setAttribute('aria-label',`Avatar ${e}`);
        if(e===state.avatar) b.classList.add('selecionado');
        b.addEventListener('click',()=>{ grid.querySelectorAll('.avatar-option').forEach(x=>x.classList.remove('selecionado')); b.classList.add('selecionado'); state.avatar=e; savePrefs(); });
        grid.appendChild(b);
    });
}

function loadPrefs() {
    try {
        const s=localStorage.getItem('quizRedesCyber_prefs');
        if(s){ const p=JSON.parse(s);
            if(p.nickname){$('nickname').value=p.nickname.substring(0,MAX_NICK_LENGTH);$('nick-count').textContent=p.nickname.length;state.nickname=p.nickname;}
            if(p.className){$('className').value=p.className;state.className=p.className;}
            if(p.avatar&&AVATARS.includes(p.avatar)){state.avatar=p.avatar;$('avatar-grid').querySelectorAll('.avatar-option').forEach(b=>b.classList.toggle('selecionado',b.textContent===p.avatar));}
            if(p.privacyAccepted)$('aceite-privacidade').checked=true;
        }
    } catch(e){}
}
function savePrefs() { try{localStorage.setItem('quizRedesCyber_prefs',JSON.stringify({nickname:$('nickname').value.substring(0,MAX_NICK_LENGTH),className:$('className').value.trim(),avatar:state.avatar,privacyAccepted:$('aceite-privacidade').checked}));}catch(e){} }
function clearPrefs() {
    try{localStorage.removeItem('quizRedesCyber_prefs');localStorage.removeItem('quizRedesCyber_cookieAccepted');
    $('nickname').value='';$('nick-count').textContent='0';$('className').value='';$('aceite-privacidade').checked=false;state.avatar='🛡️';
    $('avatar-grid').querySelectorAll('.avatar-option').forEach(b=>b.classList.toggle('selecionado',b.textContent==='🛡️'));
    document.querySelectorAll('.quiz-card').forEach(c=>c.classList.remove('selecionado'));state.quizSelecionado=null;
    $('cookie-banner').classList.add('visivel');}catch(e){}
}
function checkCookieBanner() { try{if(!localStorage.getItem('quizRedesCyber_cookieAccepted'))$('cookie-banner').classList.add('visivel');}catch(e){$('cookie-banner').classList.add('visivel');} }

// ========== EVENTS ==========
function initEvents() {
    $('nickname').addEventListener('input',()=>{const v=$('nickname').value.substring(0,MAX_NICK_LENGTH);$('nickname').value=v;$('nick-count').textContent=v.length;state.nickname=v;savePrefs();});
    $('className').addEventListener('input',()=>{state.className=$('className').value.trim();savePrefs();});
    document.querySelectorAll('.quiz-card').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.quiz-card').forEach(x=>x.classList.remove('selecionado'));c.classList.add('selecionado');state.quizSelecionado=c.dataset.quiz;}));
    $('aceite-privacidade').addEventListener('change',savePrefs);
    $('btn-iniciar').addEventListener('click',startQuiz);
    $('btn-ver-ranking').addEventListener('click',()=>{showScreen('tela-ranking');loadRanking();});
    $('btn-ranking-resultado').addEventListener('click',()=>{showScreen('tela-ranking');loadRanking();});
    $('btn-voltar-ranking').addEventListener('click',()=>showScreen('tela-inicio'));
    $('btn-voltar-inicio').addEventListener('click',()=>showScreen('tela-inicio'));
    $('btn-jogar-novamente').addEventListener('click',()=>showScreen('tela-inicio'));
    $('btn-proxima').addEventListener('click',nextQuestion);
    $('btn-anterior').addEventListener('click',prevQuestion);
    $('link-privacidade').addEventListener('click',e=>{e.preventDefault();$('modal-privacidade').classList.add('visivel');});
    $('footer-privacidade').addEventListener('click',e=>{e.preventDefault();$('modal-privacidade').classList.add('visivel');});
    $('modal-fechar').addEventListener('click',()=>$('modal-privacidade').classList.remove('visivel'));
    $('modal-privacidade').addEventListener('click',e=>{if(e.target===$('modal-privacidade'))$('modal-privacidade').classList.remove('visivel');});
    $('cookie-aceitar').addEventListener('click',()=>{try{localStorage.setItem('quizRedesCyber_cookieAccepted','true');}catch(e){}$('cookie-banner').classList.remove('visivel');});
    $('cookie-politica').addEventListener('click',()=>$('modal-privacidade').classList.add('visivel'));
    $('btn-limpar-prefs').addEventListener('click',clearPrefs);
    $('ranking-filtros').addEventListener('click',e=>{if(e.target.classList.contains('filtro-btn')){$('ranking-filtros').querySelectorAll('.filtro-btn').forEach(b=>b.classList.remove('ativo'));e.target.classList.add('ativo');loadRanking(e.target.dataset.filtro);}});
}

// ========== START QUIZ ==========
function startQuiz() {
    const nick=sanitize($('nickname').value.trim()), turma=sanitize($('className').value.trim()), msgEl=$('msg-validacao');
    if(!nick||nick.length<2){showError(msgEl,'👤 Digite um apelido com pelo menos 2 caracteres.');return;}
    if(!turma){showError(msgEl,'🏫 Digite sua turma para continuar.');return;}
    if(nick.length>MAX_NICK_LENGTH){showError(msgEl,'👤 O apelido deve ter no máximo 30 caracteres.');return;}
    if(!$('aceite-privacidade').checked){showError(msgEl,'🔒 Você precisa aceitar a Política de Privacidade para continuar.');return;}
    if(!state.quizSelecionado||!QUIZ_CONFIG[state.quizSelecionado]){showError(msgEl,'🎯 Selecione um dos 3 quizzes para iniciar.');return;}
    msgEl.classList.remove('visivel');
    state.nickname=nick;
    state.className=turma;
    const cfg=QUIZ_CONFIG[state.quizSelecionado];
    
    // Seleciona 15 perguntas aleatórias e embaralha as opções de cada uma
    state.perguntas = shuffle(cfg.perguntas).slice(0, TOTAL_PERGUNTAS).map(q => {
        return {
            ...q,
            shuffledOptions: shuffle(q.options)
        };
    });
    
    state.perguntaAtual=0; state.respostas=new Array(TOTAL_PERGUNTAS).fill(null);
    state.pontuacao=0; state.bonusTotal=0; state.tempoTotalUsado=0; state.respondida=false;
    const fill=$('progress-fill'); fill.className='progress-bar-fill';
    if(cfg.cor==='riscos')fill.classList.add('riscos');
    if(cfg.cor==='cyber')fill.classList.add('cyber');
    $('quiz-titulo-header').textContent=`${cfg.icon} ${cfg.nome}`;
    showScreen('tela-quiz');
    loadQuestion();
}
function showError(el,msg){el.textContent=msg;el.classList.add('visivel');setTimeout(()=>el.classList.remove('visivel'),5000);}

// ========== QUESTIONS ==========
function loadQuestion() {
    const cfg=QUIZ_CONFIG[state.quizSelecionado], q=state.perguntas[state.perguntaAtual], num=state.perguntaAtual+1;
    const prev=state.respostas[state.perguntaAtual]; // previous answer for this question

    $('quiz-progresso').textContent=`${num}/${TOTAL_PERGUNTAS}`;
    $('progress-fill').style.width=`${(num/TOTAL_PERGUNTAS)*100}%`;
    $('pergunta-texto').textContent=q.question;

    const lista=$('opcoes-lista'); lista.innerHTML='';
    const letras=['A','B','C','D'];
    
    // Usa as opções embaralhadas
    q.shuffledOptions.forEach((op,i)=>{
        const btn=document.createElement('button'); btn.className='opcao-btn'; btn.type='button';
        const letra=document.createElement('span'); letra.className='opcao-letra'; letra.textContent=letras[i];
        const txt=document.createElement('span'); txt.textContent=op;
        btn.appendChild(letra); btn.appendChild(txt);
        btn.addEventListener('click',()=>handleAnswer(i));
        lista.appendChild(btn);
    });

    $('feedback-box').classList.remove('visivel','acerto','erro','tempo');
    $('timer-alert').classList.remove('visivel');

    // If already answered (going back), show previous state
    if(prev!==null) {
        state.respondida=true;
        clearInterval(state.timerInterval);
        const btns=$('opcoes-lista').querySelectorAll('.opcao-btn');
        btns.forEach((btn,i)=>{
            btn.disabled=true;
            const opText = q.shuffledOptions[i];
            if(opText === q.correctAnswer) btn.classList.add('correta');
            if(i===prev.selected&&!prev.correct) btn.classList.add('errada');
        });
        showFeedbackDisplay(prev.correct, q, prev.selected===-1, prev.bonus);
        updateTimerDisplay(0, cfg.tempo);
        $('timer-fill').style.width='0%';
    } else {
        state.respondida=false;
        startTimer(cfg.tempo, cfg.alertaTempo);
    }
    updateNavButtons();
}

function updateNavButtons() {
    const nav=$('nav-perguntas');
    const btnAnt=$('btn-anterior');
    const btnProx=$('btn-proxima');
    const prev=state.respostas[state.perguntaAtual];
    const isAnswered=prev!==null;

    // Show nav when answered OR when revisiting
    if(isAnswered) {
        nav.style.display='flex';
        btnProx.textContent = state.perguntaAtual < TOTAL_PERGUNTAS - 1 ? 'Continuar ➡️' : 'Ver Resultado 🏁';
    } else {
        nav.style.display='none';
    }
    btnAnt.disabled=state.perguntaAtual===0;
}

// ========== TIMER ==========
function startTimer(total, alertAt) {
    clearInterval(state.timerInterval);
    state.tempoRestante=total; state.tempoInicioPergunta=Date.now();
    updateTimerDisplay(total,total);
    $('timer-fill').classList.remove('warning','danger');
    $('timer-text').classList.remove('danger');

    state.timerInterval=setInterval(()=>{
        const elapsed=(Date.now()-state.tempoInicioPergunta)/1000;
        state.tempoRestante=Math.max(0,total-elapsed);
        updateTimerDisplay(state.tempoRestante,total);
        if(state.tempoRestante<=alertAt&&state.tempoRestante>0){
            $('timer-alert').classList.add('visivel');$('timer-fill').classList.add('danger');$('timer-text').classList.add('danger');
        } else if(state.tempoRestante>alertAt){
            $('timer-alert').classList.remove('visivel');$('timer-text').classList.remove('danger');
            if(state.tempoRestante/total<0.5){$('timer-fill').classList.add('warning');$('timer-fill').classList.remove('danger');}
            else{$('timer-fill').classList.remove('warning','danger');}
        }
        if(state.tempoRestante<=0){clearInterval(state.timerInterval);handleTimeout();}
    },250);
}
function updateTimerDisplay(r,t){$('timer-fill').style.width=`${(r/t)*100}%`;const m=Math.floor(r/60),s=Math.ceil(r%60);$('timer-text').textContent=m>0?`${m}:${String(s).padStart(2,'0')}`:`${s}s`;}
function stopTimer(){clearInterval(state.timerInterval);return (Date.now()-state.tempoInicioPergunta)/1000;}

// ========== ANSWER ==========
function handleAnswer(selected) {
    if(state.respondida) return;
    state.respondida=true;
    const elapsed=stopTimer(); // Pausa o temporizador
    const cfg=QUIZ_CONFIG[state.quizSelecionado], q=state.perguntas[state.perguntaAtual];
    
    // Compara o valor da opção selecionada com a resposta correta
    const selectedOptionText = q.shuffledOptions[selected];
    const correct = selectedOptionText === q.correctAnswer;
    
    const btns=$('opcoes-lista').querySelectorAll('.opcao-btn');
    btns.forEach((btn,i)=>{
        btn.disabled=true;
        const opText = q.shuffledOptions[i];
        if(opText === q.correctAnswer) btn.classList.add('correta');
        if(i===selected&&!correct) btn.classList.add('errada');
    });
    
    let bonus=0;
    if(correct){const ratio=Math.max(0,state.tempoRestante/cfg.tempo);bonus=Math.round(cfg.bonusMax*ratio);}

    // If re-answering (went back and changed), undo old answer first
    const oldAnswer=state.respostas[state.perguntaAtual];
    if(oldAnswer!==null){
        if(oldAnswer.correct){state.pontuacao-=cfg.pontosPorAcerto+oldAnswer.bonus;state.bonusTotal-=oldAnswer.bonus;}
        state.tempoTotalUsado-=oldAnswer.elapsed;
    }

    state.respostas[state.perguntaAtual]={question:state.perguntaAtual,selected,correct,elapsed,bonus};
    if(correct){state.pontuacao+=cfg.pontosPorAcerto+bonus;state.bonusTotal+=bonus;}
    state.tempoTotalUsado+=elapsed;
    
    showFeedbackDisplay(correct, q, false, bonus);
    updateNavButtons();
}

function handleTimeout() {
    if(state.respondida) return;
    state.respondida=true;
    const cfg=QUIZ_CONFIG[state.quizSelecionado], q=state.perguntas[state.perguntaAtual];
    const elapsed=cfg.tempo;
    const btns=$('opcoes-lista').querySelectorAll('.opcao-btn');
    btns.forEach((btn,i)=>{
        const opText = q.shuffledOptions[i];
        btn.disabled=true;
        if(opText === q.correctAnswer) btn.classList.add('correta');
    });
    state.respostas[state.perguntaAtual]={question:state.perguntaAtual,selected:-1,correct:false,elapsed,bonus:0};
    state.tempoTotalUsado+=elapsed;
    showFeedbackDisplay(false, q, true, 0);
    updateNavButtons();
}

function showFeedbackDisplay(correct, q, timeout, bonus) {
    const fb=$('feedback-box'); fb.classList.remove('acerto','erro','tempo');
    const titulo=$('feedback-titulo');
    const explicacao=$('feedback-explicacao');
    const incentivo=$('feedback-incentivo');
    
    let htmlContent = '';
    
    if(timeout){
        fb.classList.add('tempo','visivel');
        titulo.innerHTML = `⏰ ${rndMsg(MSG_TEMPO)}`;
        htmlContent = `A resposta correta era: <strong>${q.correctAnswer}</strong><br><br>${q.explanation.correct}`;
    }
    else if(correct){
        fb.classList.add('acerto','visivel');
        titulo.innerHTML = `✅ Resposta Correta! ${bonus>0?`(+${bonus} bônus)`:''}`;
        htmlContent = `${q.explanation.correct}`;
    }
    else{
        fb.classList.add('erro','visivel');
        titulo.innerHTML = `❌ Resposta Incorreta!`;
        htmlContent = `A alternativa correta era: <strong>${q.correctAnswer}</strong><br><br>${q.explanation.correct}`;
    }
    
    // Adiciona detalhes e dica se existirem
    if (q.explanation.details && q.explanation.details.length > 0) {
        htmlContent += `<br><br><strong>Detalhes:</strong><ul>`;
        q.explanation.details.forEach(det => {
            htmlContent += `<li>${det}</li>`;
        });
        htmlContent += `</ul>`;
    }
    
    if (q.explanation.tip) {
        htmlContent += `<br><strong>💡 Dica:</strong> ${q.explanation.tip}`;
    }
    
    explicacao.innerHTML = htmlContent;
    incentivo.textContent = correct ? rndMsg(MSG_ACERTO) : rndMsg(MSG_ERRO);
}

// ========== NAVIGATION ==========
function nextQuestion() {
    const prev=state.respostas[state.perguntaAtual];
    if (prev === null) return; // Só avança se respondida
    
    state.perguntaAtual++;
    if(state.perguntaAtual<TOTAL_PERGUNTAS){loadQuestion();}
    else{showResults();}
}
function prevQuestion() {
    if(state.perguntaAtual>0){state.perguntaAtual--;loadQuestion();}
}

// ========== RESULTS ==========
function showResults() {
    clearInterval(state.timerInterval);
    const cfg=QUIZ_CONFIG[state.quizSelecionado];
    // Recalculate from respostas array to be safe
    let totalScore=0, totalBonus=0, totalTime=0;
    state.respostas.forEach(r=>{
        if(r&&r.correct){totalScore+=cfg.pontosPorAcerto+r.bonus;totalBonus+=r.bonus;}
        if(r)totalTime+=r.elapsed;
    });
    state.pontuacao=totalScore; state.bonusTotal=totalBonus; state.tempoTotalUsado=totalTime;
    const acertos=state.respostas.filter(r=>r&&r.correct).length;
    const erros=TOTAL_PERGUNTAS-acertos;
    const tempoMedio=totalTime/TOTAL_PERGUNTAS;

    $('resultado-avatar').textContent=state.avatar;
    $('resultado-nickname').textContent=state.nickname;
    $('resultado-quiz-nome').textContent=`${cfg.icon} ${cfg.nome}`;
    $('stat-pontos').textContent=state.pontuacao;
    $('stat-acertos').textContent=`${acertos}/${TOTAL_PERGUNTAS}`;
    $('stat-erros').textContent=erros;
    $('stat-tempo').textContent=formatTime(totalTime);
    $('stat-medio').textContent=formatTime(tempoMedio);
    $('stat-bonus').textContent=`+${totalBonus}`;

    let medalha,medalhaTxt;
    if(acertos>=13){medalha='🚀';medalhaTxt='Mestre Cyber';}
    else if(acertos>=10){medalha='🕵️';medalhaTxt='Caçador de Incidentes';}
    else if(acertos>=6){medalha='🔐';medalhaTxt='Analista em Treinamento';}
    else{medalha='🛡️';medalhaTxt='Aprendiz de Defesa';}
    $('medalha-icon').textContent=medalha;$('medalha-texto').textContent=medalhaTxt;
    showScreen('tela-resultado');
    saveToFirestore(acertos,erros,tempoMedio);
}

// ========== FIREBASE SAVE ==========
async function saveToFirestore(acertos,erros,tempoMedio) {
    const now=Date.now();
    if(now-state.lastSubmitTime<ANTI_SPAM_MS){$('resultado-status').textContent='Aguarde antes de enviar novamente.';return;}
    state.lastSubmitTime=now;
    const cfg=QUIZ_CONFIG[state.quizSelecionado];
    const statusEl=$('resultado-status');
    statusEl.textContent='Enviando resultados para o ranking...';
    const maxPossible=TOTAL_PERGUNTAS*(cfg.pontosPorAcerto+cfg.bonusMax);
    if(state.pontuacao<0||state.pontuacao>maxPossible){statusEl.textContent='Erro na validação da pontuação.';return;}

    const percentage=Math.round((acertos/TOTAL_PERGUNTAS)*100);

    const data={
        // New structure (multiquiz)
        studentName: state.nickname.substring(0,MAX_NICK_LENGTH),
        className: state.className || 'Não informada',
        avatar: state.avatar,
        quizId: cfg.quizId,
        difficulty: cfg.difficulty,
        quizTitle: cfg.quizTitle,
        subject: cfg.subject,
        score: state.pontuacao,
        totalQuestions: TOTAL_PERGUNTAS,
        percentage: percentage,

        // Legacy compatibility
        nickname: state.nickname.substring(0,MAX_NICK_LENGTH),
        category: cfg.category,
        level: cfg.level,
        correctAnswers: acertos,
        wrongAnswers: erros,
        timeUsed: Math.round(state.tempoTotalUsado*100)/100,
        averageTime: Math.round(tempoMedio*100)/100,
        
        acceptedPrivacyPolicy: true,
        privacyPolicyVersion: PRIVACY_VERSION,
        createdAt: serverTimestamp()
    };
    if(!db){statusEl.textContent='Modo offline — resultado salvo apenas localmente.';return;}
    try{await addDoc(collection(db,'quizResults'),data);statusEl.textContent='✅ Resultado enviado com sucesso!';}
    catch(error){console.error('Erro ao salvar resultado:',error);statusEl.textContent='⚠️ Não foi possível enviar o resultado.';}
}

// ========== RANKING ==========
let unsubscribeRanking = null;

// -----------------------------------------------------------------------
// NOTA SOBRE ÍNDICE COMPOSTO NO FIRESTORE:
// Se no futuro você quiser orderBy no servidor com where+timeUsed, será
// necessário criar este índice no Firebase Console:
//   Firestore → Indexes → Add Index
//   Collection ID : quizResults
//   Fields        : category Ascending | score Descending | timeUsed Ascending | __name__ Ascending
//
// Por enquanto, usamos query simples (orderBy score apenas) e ordenamos
// timeUsed e createdAt no cliente como critérios de desempate.
// Isso elimina completamente a necessidade de índice composto.
// -----------------------------------------------------------------------

function loadRanking(filter = 'todos') {
    const lista = $('ranking-lista');
    lista.innerHTML = '<div class="ranking-loading">Carregando ranking...</div>';
    if (!db) { lista.innerHTML = '<div class="ranking-vazio">Firebase não configurado. Ranking indisponível.</div>'; return; }
    if (unsubscribeRanking) { unsubscribeRanking(); unsubscribeRanking = null; }

    try {
        let q;

        if (filter && filter !== 'todos') {
            // Filtro por categoria específica.
            // Usa where('category') + orderBy('score') apenas — sem índice composto.
            // Desempate por timeUsed e createdAt é feito no cliente.
            q = query(
                collection(db, 'quizResults'),
                where('category', '==', filter),
                orderBy('score', 'desc'),
                limit(50)
            );
        } else {
            // "Todos": busca TODOS os documentos, sem filtro de categoria.
            // Exibe participantes de todos os níveis (fundamentos, riscos, cyber).
            q = query(
                collection(db, 'quizResults'),
                orderBy('score', 'desc'),
                limit(50)
            );
        }

        unsubscribeRanking = onSnapshot(q, snapshot => {
            if (snapshot.empty) {
                lista.innerHTML = '<div class="ranking-vazio">Nenhum resultado encontrado para esta categoria. Seja o primeiro! 🚀</div>';
                return;
            }

            // Coleta documentos e ordena no cliente:
            // 1º) score desc  2º) timeUsed asc  3º) createdAt asc
            let docs = [];
            snapshot.forEach(doc => docs.push(doc.data()));
            docs.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                const tA = a.timeUsed ?? Infinity;
                const tB = b.timeUsed ?? Infinity;
                if (tA !== tB) return tA - tB;
                const dA = a.createdAt?.toDate?.()?.getTime() ?? 0;
                const dB = b.createdAt?.toDate?.()?.getTime() ?? 0;
                return dA - dB;
            });

            lista.innerHTML = '';
            docs.forEach((d, idx) => {
                const pos = idx + 1;
                const item = document.createElement('div'); item.className = 'ranking-item';

                const posEl = document.createElement('div'); posEl.className = 'ranking-pos';
                if (pos === 1)      { posEl.classList.add('ouro');   posEl.textContent = '🥇'; }
                else if (pos === 2) { posEl.classList.add('prata');  posEl.textContent = '🥈'; }
                else if (pos === 3) { posEl.classList.add('bronze'); posEl.textContent = '🥉'; }
                else                { posEl.textContent = `${pos}º`; }

                const avatarEl = document.createElement('div'); avatarEl.className = 'ranking-avatar'; avatarEl.textContent = d.avatar || '🛡️';
                const infoEl   = document.createElement('div'); infoEl.className   = 'ranking-info';

                const nickEl = document.createElement('div'); nickEl.className = 'ranking-nick';
                const displayName  = d.studentName || d.nickname || 'Anônimo';
                const displayClass = d.className ? ` [${d.className}]` : '';
                nickEl.textContent = displayName + displayClass;

                // Badge de categoria/nível — visível em todos os filtros,
                // facilitando identificar de qual quiz cada participante é.
                const tagEl    = document.createElement('div'); tagEl.className = 'ranking-quiz-tag';
                const quizConf = QUIZ_CONFIG[d.quizId || d.category];
                const displayCorrect = d.correctAnswers !== undefined
                    ? d.correctAnswers
                    : (d.score / (quizConf ? quizConf.pontosPorAcerto : 10));
                tagEl.textContent = quizConf
                    ? `${quizConf.icon} ${Math.floor(displayCorrect)}/${d.totalQuestions || 15} • ${d.difficulty || d.level || ''}`
                    : (d.quizId || d.category || '');

                infoEl.appendChild(nickEl); infoEl.appendChild(tagEl);

                const scoreEl = document.createElement('div'); scoreEl.className = 'ranking-score'; scoreEl.textContent = d.score;
                const metaEl  = document.createElement('div'); metaEl.className  = 'ranking-meta';
                if (d.createdAt && d.createdAt.toDate) { metaEl.textContent = d.createdAt.toDate().toLocaleDateString('pt-BR'); }

                item.appendChild(posEl); item.appendChild(avatarEl); item.appendChild(infoEl); item.appendChild(scoreEl); item.appendChild(metaEl);
                lista.appendChild(item);
            });

        }, error => {
            console.error('Erro ao carregar ranking:', error);

            // Distingue erro de índice de erro de conexão
            if (error.code === 'failed-precondition' || (error.message && error.message.toLowerCase().includes('index'))) {
                console.warn(
                    '⚠️ AÇÃO NECESSÁRIA: O ranking requer um índice composto no Firestore.\n' +
                    'Acesse Firebase Console → Firestore → Indexes → Add Index:\n' +
                    '  Collection: quizResults\n' +
                    '  Fields: category ASC | score DESC | timeUsed ASC | __name__ ASC\n' +
                    'Ou clique no link do erro acima para criar automaticamente.'
                );
                lista.innerHTML = '<div class="ranking-erro">⏳ O ranking está sendo configurado. Tente novamente em alguns minutos.</div>';
            } else {
                lista.innerHTML = '<div class="ranking-erro">⚠️ Não foi possível carregar o ranking. Verifique sua conexão.</div>';
            }
        });

    } catch (error) {
        console.error('Erro na query do ranking:', error);
        lista.innerHTML = '<div class="ranking-erro">⚠️ Erro ao acessar o ranking.</div>';
    }
}
