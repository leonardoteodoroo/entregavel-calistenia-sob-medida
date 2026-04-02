import fs from 'fs/promises';
import path from 'path';

/**
 * Script utilitário para semi-automatizar o parsing dos TXT de receitas de ovo
 * Uso: node scripts/parseOvoRecipes.mjs docs/ovo-bonus3/arquivo.txt
 */
async function parseFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    // A estrutura dos arquivos TXT divide cada receita com paginadores como `Rende X porções\n\x0C N O NOME DA RECEITA`
    // Este é um parser rudimentar baseado em regex e quebras de linha.
    
    // Divide pelo marcador de rendimento / nova página
    const blocks = content.split(/Rende\s+\d+\s+porç[õo]es\s*\n*\u000C/gm);
    
    const recipes = [];
    
    for (const block of blocks) {
      if (block.trim().length === 0) continue;
      
      const lines = block.split('\n').filter(l => l.trim().length > 0 && l.trim() !== 'os' && l.trim() !== 'el' && l.trim() !== 'nc' && l.trim() !== 'co');
      if (lines.length < 5) continue;

      // O título geralmente é as primeiras linhas úteis
      const titleLines = [];
      let i = 0;
      while (i < lines.length && !lines[i].toLowerCase().includes('ingredientes')) {
        titleLines.push(lines[i].trim());
        i++;
      }
      
      const title = titleLines.join(' ');
      
      // Coleta ingredientes
      const ingredients = [];
      if (lines[i] && lines[i].toLowerCase().includes('ingredientes')) {
        i++;
        while (i < lines.length && !lines[i].toLowerCase().includes('modo de preparo')) {
          if (lines[i].trim().length > 2 && !lines[i].match(/^[@a-z\.\s]$/i)) { // Filtra sujeira como '@', 's', 'v.'
             ingredients.push(lines[i].trim());
          }
          i++;
        }
      }

      // Coleta o modo de preparo
      const steps = [];
      if (lines[i] && lines[i].toLowerCase().includes('modo de preparo')) {
        i++;
        while (i < lines.length) {
          if (lines[i].trim().length > 2 && !lines[i].match(/^[@a-z\.\s]$/i)) {
             steps.push(lines[i].trim());
          }
          i++;
        }
      }

      recipes.push({
        title,
        ingredients,
        steps: steps.join(' ')
      });
    }

    console.log(`Encontradas ${recipes.length} receitas no arquivo.`);
    
    // Gera o output JSON base
    const outputFileName = path.basename(filePath, '.txt') + '_parsed.json';
    await fs.writeFile(outputFileName, JSON.stringify(recipes, null, 2));
    
    console.log(`✅ Salvo resultados brutos em ${outputFileName}.`);
    console.log(`Lembre-se de refinar com LLM para os campos de 'premise', 'objection', 'masterTip' e 'visual'!`);

  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
  }
}

const inputFilePath = process.argv[2];
if (!inputFilePath) {
  console.log("Uso: node parseOvoRecipes.mjs <caminho_para_o_txt>");
  process.exit(1);
}

parseFile(inputFilePath);
