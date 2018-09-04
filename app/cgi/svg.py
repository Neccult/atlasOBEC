from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
from reportlab.pdfgen import canvas
import sys
from reportlab.lib.units import inch
import re

f1 = sys.argv[1]
f2 = sys.argv[2]
f3 = sys.argv[3]
w_f1 = sys.argv[4]
w_f2 = sys.argv[5]
w_f3 = sys.argv[6]
url = sys.argv[7]

var = re.search('var=[0-9]+', url).group(0).split('=')[1]
cad = re.search('cad=[0-9]+', url).group(0).split('=')[1]
uf  = re.search('uf=[0-9]+', url).group(0).split('=')[1]

svg1 = svg2rlg(f1)
svg2 = svg2rlg(f2)
svg3 = svg2rlg(f3)

scale2 = float(w_f1)/float(w_f2)
scale3 = float(w_f1)/float(w_f3)

svg2.scale(scale2, scale2)
svg3.scale(scale3, scale3)

# Create the PDF object, using the buffer as its "file."
p = canvas.Canvas('/tmp/teste.pdf')

p.drawString(20, 702, 'Variavel: '+var)
p.drawString(20, 701, 'Setor: '+cad)
p.drawString(20, 700, 'Estado: '+uf)

renderPDF.draw(svg1, p, 0, 200)
p.showPage()
renderPDF.draw(svg2, p, 0, 200)
p.showPage()
renderPDF.draw(svg3, p, 0, 200)
p.showPage()

p.save()


