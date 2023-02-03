import csv2sql as cs
import pandas as pd
from sqlalchemy import create_engine

disk_engine = create_engine('sqlite:///awesome.db')
cs.makeFileIntoSQL('uscities.csv', 'data', disk_engine)

data = pd.read_sql_query('SELECT city,city_ascii,state_id,state_name,population FROM data', disk_engine)
print(data)

cs.makeFileIntoSQL('file2.csv', 'data2', disk_engine)
data2 = pd.read_sql_query('SELECT * FROM data2', disk_engine)
print(data2)                