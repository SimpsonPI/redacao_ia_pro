const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/analyze', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 50) {
    return res.status(400).json({ error: 'Texto muito curto (mínimo 50 caracteres).' });
  }

  // Resposta simulada para teste
  res.json({
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
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});