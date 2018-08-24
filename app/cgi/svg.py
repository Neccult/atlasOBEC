from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
from reportlab.pdfgen import canvas
import sys
from reportlab.lib.units import inch

f1 = sys.argv[1]
f2 = sys.argv[2]
f3 = sys.argv[3]

svg1 = svg2rlg(f1)
svg2 = svg2rlg(f2)
svg3 = svg2rlg(f3)
svg3.scale(0.6, 0.6)


# Create the PDF object, using the buffer as its "file."
p = canvas.Canvas('/tmp/visualizacoes.pdf')

#p.drawString(20, 30, 'leoeoeleoeleoeleoeoeloekieoeiejepjpjdspojdsa')

renderPDF.draw(svg1, p, 0, 200)
p.showPage()
renderPDF.draw(svg2, p, 0, 200)
p.showPage()
renderPDF.draw(svg3, p, 0, 200)
p.showPage()

p.save()


