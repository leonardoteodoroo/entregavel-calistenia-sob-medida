import pikepdf
import subprocess
import os

# Caminhos
cover_img = 'client/public/bonus/tonico-capilar/capa-tonico-capilar.webp'
original_pdf = 'client/public/bonus/tonico-capilar/novo-tonico-capilar-receitas.pdf'
temp_cover_pdf = 'tmp/capa_temp.pdf'
output_pdf = 'client/public/bonus/tonico-capilar/novo-tonico-capilar-receitas-v2.pdf'

try:
    # 1. Converte imagem para PDF (preservando qualidade)
    print("Convertendo imagem para PDF...")
    subprocess.run(['img2pdf', cover_img, '-o', temp_cover_pdf], check=True)

    # 2. Abre os PDFs e substitui a primeira página
    print("Mesclando PDFs...")
    with pikepdf.Pdf.open(temp_cover_pdf) as cover, \
         pikepdf.Pdf.open(original_pdf) as original:
        
        # Substitui a página 0 (primeira)
        original.pages[0] = cover.pages[0]
        original.save(output_pdf)

    # 3. Substitui o original pelo novo
    os.replace(output_pdf, original_pdf)
    print("Sucesso! PDF atualizado.")

finally:
    # Limpeza
    if os.path.exists(temp_cover_pdf):
        os.remove(temp_cover_pdf)
