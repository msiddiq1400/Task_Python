import pandas as pd
from sqlalchemy import create_engine

def makeFileIntoSQL(filename, sqlName, sqlEngine):
    chunksize = 20000
    j = 0
    index_start = 1
    for df in pd.read_csv(filename, chunksize=chunksize, iterator=True, encoding='utf-8'):
        df = df.rename(columns={c: c.replace(' ', '') for c in df.columns}) # Remove spaces from columns
        df.index += index_start
        df.to_sql(sqlName, sqlEngine, if_exists='append') ##change to if_exists='replace' if you don't want to replace the database file
        index_start = df.index[-1] + 1

disk_engine = create_engine('sqlite:///awesome.db')
makeFileIntoSQL('uscities.csv', 'data', disk_engine)

data = pd.read_sql_query('SELECT city,city_ascii,state_id,state_name,population FROM data', disk_engine)
print(data)             