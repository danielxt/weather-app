import json
import pandas as pd


df = pd.read_csv('top1000cities.csv')
with open('citiesList.txt', 'w+') as file:
    for city in df['Name of City']:
        file.write(city + "\n")