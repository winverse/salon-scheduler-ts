# salon-time-slot

# Install And Database migration
required node version 18.15.0 (lts)
```
yarn

yarn prisma:init

yarn start:dev

# In terminal
> Server is Running, address: {{your host}}
> Swagger: {{your host}}/api/documentation
```

# Database 
All commands were included in `yarn prisma:init`
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

# See the database with prisma
yarn prisma:studio
```

# Test
```
# 10 test case exists
yarn test
```

# Documentation
```
# Swagger
{{your host}}/api/documentation

# Postman
https://documenter.getpostman.com/view/4627621/2s93JzM1LQ
```