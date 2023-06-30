#import csv
import pandas as pd
#with open("roman_cities.csv", newline='', encoding='ISO-8859-1') as roman:
 #   reader = csv.reader(roman)
   # for row in reader:
    #    print(row)

#with open("today_cities.csv", newline='', encoding='ISO-8859-1') as today:
 #   reader = csv.reader(today)
 #   for row in reader:
 #       print(row.Population)

roman = pd.read_csv("roman_cities.csv",sep=';', encoding='ISO-8859-1')
today = pd.read_csv("today_cities.csv",sep=';')


roman["ModernPopulation"] = -1

for i,row in roman.iterrows():
    print(row['Modern Toponym'])
    for i2,row2 in today.iterrows():
        if(row['Modern Toponym'] == row2['Name']):
            pop = row2["Population"]
            print("true")
            roman["ModernPopulation"][i] = pop
            break
        if(str(row['Modern Toponym']) in str(row2['Alternate Names'])):
            pop = row2["Population"]
            print("true")
            roman["ModernPopulation"][i] = pop
            break
    
    
print(roman)
roman.to_csv("roman_with_modern_pop.csv",index=False,sep=";")
#column = my_csv.Population
##print(column)