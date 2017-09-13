import xlrd

workbook = xlrd.open_workbook('NECCULT- 2017 - ATLAS - V04 - Receita Bruta (06 SET).xlsx', on_demand = True)

worksheet = workbook.sheet_by_index(6)
worksheet2 = workbook.sheet_by_index(7)

var = 4
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
final = 30 #30 #230

while(begin < final):
	print "ano",ano
	end = begin + 27
	while(col < lmtcol):
		print "coluna",col
		for j in [0, col]:
			print "j",j
			for i in xrange(begin,end+1):
				print "i",i
				if (j == 0):
					if (i == end):
						uf = 0
					else:
					 	# uf = worksheet.cell(i, j)
						uf = str(worksheet.cell(i, j).value.encode('utf-8'))[:2]
					
		 			#cad = col

					row = [var, uf, atc, cad, prt]
					tupla.append(row)
					row = []

				else:
					tupla[i-begin].append(ano)
					
					# valor = worksheet.cell(i, j).value
					valor = format(worksheet.cell(i, j).value, '.10f')
					tupla[i-begin].append(valor)
					
					percentual = worksheet.cell(i, j+desvio).value
					# print(worksheet.cell(23, 15).value)
					percentual = format(worksheet.cell(i, j+desvio).value, '.10f')
					tupla[i-begin].append(percentual)
					if (ano == 2007):
						taxa = 0
					else:
						taxa = format(float(worksheet2.cell(i, j-1).value), '.10f')
					if worksheet2.cell(i, j-1).ctype == xlrd.XL_CELL_ERROR:
						taxa = 0	
					tupla[i-begin].append(taxa)

		col += 1
		ano += 1
		bloco.append(tupla)
		tupla = []

	col = 1
	#ano += 1
	begin += 32

# print(bloco)

file = open('tuplas2.txt', 'w')
for t in bloco:
     for r in t:
     	r = str(r).replace("[", "(")
     	r = str(r).replace("]", "),")
     	r = str(r).replace("'", "")
     	print >> file, r
     	# print(r)
     	count+=1

print(count)
