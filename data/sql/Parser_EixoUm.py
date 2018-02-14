import xlrd

workbook = xlrd.open_workbook('NECCULT- 2017 - ATLAS - V13 - C4 do Valor Adicionado (10 MAI).xlsx', on_demand = True)

worksheet = workbook.sheet_by_index(0)
worksheet2 = workbook.sheet_by_index(1)

var = 13
atc = 0 #1 #2
cad = 0
prt = 0
ano = 2007

row = []
tupla =  []
bloco = []

col = 1 #4
lmtcol = 9 #10 #11
count = 0

begin = 2 #2 #4 #29
desvio = 12 #12 #31 
final = 230 #30 #230

while(begin < final):
	end = begin #+ 27
	while(col < lmtcol):
		for j in [0, col]:
			for i in xrange(begin,end+1):
				if (j == 0):
					if (i == end):
						uf = 0
					else:
					 	# uf = worksheet.cell(i, j)
						uf = str(worksheet.cell(i, j).value.encode('utf-8'))[:2]
					
		 			# cad = col

					row = [var, uf, atc, cad, prt]
					tupla.append(row)
					row = []

				else:
					tupla[i-begin].append(ano)
					
					# valor = worksheet.cell(i, j).value
					valor = format(worksheet.cell(i, j).value, '.10f')
					tupla[i-begin].append(valor)
					
					# percentual = worksheet.cell(i, j+desvio).value
					# print(worksheet.cell(23, 15).value)
					# percentual = format(worksheet.cell(i, j+desvio).value, '.10f')
					# tupla[i-begin].append(percentual)

					if (ano == 2007):
						taxa = 0
					else:
						taxa = format(worksheet2.cell(i, j-1).value, '.10f')	
					tupla[i-begin].append(taxa)

		col += 1
		ano += 1
		bloco.append(tupla)
		tupla = []

	col = 1
	# ano += 1
	begin += 32

# print(bloco)

file = open('tuplas.txt', 'w')
for t in bloco:
     for r in t:
     	r = str(r).replace("[", "(")
     	r = str(r).replace("]", "),")
     	r = str(r).replace("'", "")
     	print >> file, r
     	# print(r)
     	count+=1

print(count)