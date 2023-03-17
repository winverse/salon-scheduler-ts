# DayTimeTable

# Install And Database migration
required node version 18.15.0 (lts)
```
yarn

yarn prisma:init
```

# database 
All commands include in `yarn prisma:init`
```
# Create sqlite file
yarn prisma:push

# Generate type
yarn prisma:generate

# Create seed
yarn prisma:seed
```

# sqlite test
```
sqlite3 salon.sqlite

# show tables;
.tables

>> Event      Workhours
```