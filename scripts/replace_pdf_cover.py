import pikepdf
import subprocess
import os

def fix_pdf_cover(pdf_path, cover_img_path):
    temp_cover_pdf = 'tmp/capa_temp.pdf'
    output_pdf = pdf_path.replace('.pdf', '_fixed.pdf')
    
    try:
        print(f"Processando: {pdf_path}")
        # 1. Converte imagem para PDF (tamanho original da imagem)
        subprocess.run(['img2pdf', cover_img_path, '-o', temp_cover_pdf], check=True)

        # 2. Abre os PDFs
        with pikepdf.Pdf.open(temp_cover_pdf) as cover_pdf, \
             pikepdf.Pdf.open(pdf_path) as original_pdf:
            
            # Pega o tamanho da página 1 (segunda página) para usar como referência
            # Se o PDF tiver apenas 1 página, usa A4 padrão
            if len(original_pdf.pages) > 1:
                ref_page = original_pdf.pages[1]
                target_box = ref_page.mediabox
            else:
                target_box = pikepdf.Array([0, 0, 595.27, 841.89]) # A4 padrão

            # 3. Cria o PDF final
            new_pdf = pikepdf.Pdf.new()
            
            # Adiciona a capa redimensionada
            # O pikepdf não redimensiona conteúdo facilmente, mas podemos ajustar o mediabox
            # No entanto, o melhor é usar o img2pdf para já gerar no tamanho certo
            
            width = float(target_box[2] - target_box[0])
            height = float(target_box[3] - target_box[1])
            
            print(f"Redimensionando capa para: {width}x{height} pts")
            
            # Gera a capa de novo, agora com tamanho fixo
            subprocess.run([
                'img2pdf', 
                cover_img_path, 
                '--pagesize', f'{width}ptx{height}pt', 
                '--auto-orient',
                '-o', temp_cover_pdf
            ], check=True)
            
            # Reabre a capa agora no tamanho certo
            with pikepdf.Pdf.open(temp_cover_pdf) as fixed_cover:
                new_pdf.pages.append(fixed_cover.pages[0])
                
                # Adiciona o restante das páginas do original (ignorando a antiga capa)
                for i in range(1, len(original_pdf.pages)):
                    new_pdf.pages.append(original_pdf.pages[i])
                
                new_pdf.save(output_pdf)

        # 4. Substitui o original
        os.replace(output_pdf, pdf_path)
        print(f"Sucesso! {pdf_path} atualizado com escala correta.\n")

    except Exception as e:
        print(f"Erro ao processar {pdf_path}: {e}")
    finally:
        if os.path.exists(temp_cover_pdf):
            os.remove(temp_cover_pdf)

# Executa para os dois bônus
fix_pdf_cover(
    'client/public/bonus/tonico-capilar/novo-tonico-capilar-receitas.pdf', 
    'client/public/bonus/tonico-capilar/capa-tonico-capilar.webp'
)

# Verifica se o tônico coreano também precisa
coreano_pdf = 'client/public/bonus/tonico-milenar-coreano/novo-Tonico-Milenar-Coreano.pdf'
coreano_img = 'client/public/bonus/tonico-milenar-coreano/novo-tonico-milenar-coreano.webp'

if os.path.exists(coreano_pdf):
    fix_pdf_cover(coreano_pdf, coreano_img)
