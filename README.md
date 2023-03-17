# DayTimeTable

# Install And Database migration
required node version 18.15.0 (lts)
```
pnpm install

pnpm prisma:push
```

# database 
```
# Create sqlite file
pnpm prisma:push

# Generate type
pnpm prisma:generate
```

# sqlite test
```
sqlite3 salon.sqlite

# show tables;
.tables

>> Event      Workhours
```