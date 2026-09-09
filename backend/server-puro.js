const http = require('http');

const server = http.createServer((req, res) => {
  // CORS para qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Resposta para preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Apenas aceita POST /api/analyze
  if (req.method === 'POST' && req.url === '/api/analyze') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { text } = JSON.parse(body);
        // Validação simples
        if (!text || text.trim().length < 50) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Texto muito curto (mínimo 50 caracteres).' }));
          return;
        }
        // Simula uma resposta de análise (sempre a mesma)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          tipo: 'ENEM',
          estilo: 'dissertativo-argumentativo',
          nota: 750,
          competencias: [
            { nome: 'Domínio da norma padrão', nota: 160, feedback: 'Bom domínio, com pequenos desvios.' },
            { nome: 'Compreensão do tema', nota: 140, feedback: 'Abordagem adequada, mas poderia aprofundar.' },
            { nome: 'Argumentação', nota: 180, feedback: 'Argumentos consistentes e bem articulados.' },
            { nome: 'Coesão', nota: 120, feedback: 'Use mais conectivos entre os parágrafos.' },
            { nome: 'Proposta de intervenção', nota: 120, feedback: 'Detalhe mais os agentes e ações.' }
          ],
          sugestoes: [
            'Utilize conectivos como "além disso", "por outro lado", "dessa forma".',
            'Especifique melhor os agentes, ações, meios e efeitos na proposta.',
            'Inclua referências externas (citações, dados históricos) para enriquecer.'
          ],
          reescrita: 'Aqui será exibida a versão reescrita da sua redação, aplicando as sugestões acima.',
          feedback_detalhado: '## Análise detalhada\n\nSua redação apresenta uma estrutura adequada, com introdução, desenvolvimento e conclusão. Os argumentos são pertinentes, mas a coesão entre parágrafos pode ser melhorada. A proposta de intervenção está presente, porém carece de detalhamento.\n\n### Pontos fortes\n- Argumentação bem fundamentada\n- Domínio razoável da norma culta\n\n### Pontos a melhorar\n- Conectivos entre parágrafos\n- Proposta de intervenção mais específica\n- Ampliar repertório sociocultural'
        }));
      } catch (err) {
        res.writeHead(400);
        res.end('JSON inválido');
      }
    });
  } else {
    // Qualquer outra rota retorna 404
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor puro rodando na porta ${PORT}`);
});